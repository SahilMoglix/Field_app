import React, {useState, useEffect} from 'react';
import {
  Text,
  PermissionsAndroid,
  View,
  Platform,
  Alert,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CallLogs from 'react-native-call-log';
import CustomeIcon from '../../component/CustomeIcon';
import Dimension from '../../Theme/Dimension';
import styles from './style';
import DateConvert from '../../component/DateConvert';
import {useDispatch, useSelector} from 'react-redux';
import {STATE_STATUS} from '../../redux/constants';
import {fetchLogs, updateLogs} from '../../redux/actions/communication';
import {createAllContacts} from '../../services/communication';
import NoDataFound from '../../component/NoDataFound';
const ActivityScreen = () => {
  const logsData = useSelector(state => state.communicationReducer.get('data'));
  const logsStatus = useSelector(state =>
    state.communicationReducer.get('status'),
  );

  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    onRefreshLogs();
  }, []);

  useEffect(() => {
    if (logsStatus == STATE_STATUS.FETCHED) {
      if (Platform.OS === 'android') {
        checkPermission();
      } else {
      }
    }
  }, [logsStatus]);

  const onRefreshLogs = () => {
    dispatch(fetchLogs());
  };

  const setCallType = type => {
    let IconName;
    if (type == 'INCOMING') {
      IconName = 'phone-incoming-black';
    } else if (type == 'MISSED') {
      IconName = 'phone-missed-red';
    } else if (type == 'OUTGOING') {
      IconName = 'phone-outgoing-black';
    } else {
      IconName = 'phone-disconnected-black';
    }
    return (
      <CustomeIcon
        name={IconName}
        size={14}
        color={type == 'MISSED' ? '#D9232D' : '#272727'}
        style={{marginTop: 4}}></CustomeIcon>
    );
  };

  const checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Example',
          message: 'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        CallLogs.load(99).then(c => {
          let recentCallCreatedAt = logsData?.get(0)?.timestamp;
          if (recentCallCreatedAt) {
            let filteredCallLogs = ([...c] || []).filter(
              __ => Number(__?.timestamp) > recentCallCreatedAt,
            );
            if (filteredCallLogs?.length) {
              createRecentContacts(filteredCallLogs || []);
            }
          } else {
            if (c?.length) {
              createRecentContacts(c || []);
            }
          }
        });
      } else {
        console.log('Call Log permission denied');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createRecentContacts = async recentCallLogs => {
    try {
      let limitCallLogs = [...recentCallLogs].slice(0, 100);
      const {data} = await createAllContacts(limitCallLogs);
      if (data?.result) {
        dispatch(updateLogs([...data?.result, ...logsData.toArray()]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };

  const Contact = ({contact}) => {
    return (
      <View style={styles.contactCon}>
        <View style={styles.placeholder}>
          <Text style={styles.txt}>
            {contact?.name ? contact?.name[0] : 'U'}
          </Text>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {contact?.name ? contact?.name : contact?.phoneNumber}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.phoneNumber}>{setCallType(contact?.type)}</Text>
            <View style={styles.datetxt}>
              <DateConvert
                date={contact?.timestamp}
                contactType={contact?.type}
              />
              {/* {contact?.type} */}
            </View>
          </View>
          {/* <Text style={styles.phoneNumber}>
            {contact?.dateTime}
          </Text> */}
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return <Contact contact={item} />;
  };

  console.log(logsData, 'dwedwefew');

  let searchedData = logsData.filter(
    _ =>
      _.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      _.phoneNumber?.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View style={styles.headerWrap}>
        <View style={styles.TopHeader}>
          <Text style={styles.headingTxt}>Communication</Text>
        </View>

        <View></View>
        <View style={styles.searchWraper}>
          <CustomeIcon
            name={'search-grey'}
            size={20}
            color={'#8E8E93'}
            style={styles.searchIcon}></CustomeIcon>
          <View style={{flex: 4}}>
            <TextInput
              placeholder={'Search by name, company'}
              returnKeyType={'search'}
              onChangeText={e => setSearchValue(e)}
              value={searchValue}
              ellipsizeMode="tail"
              placeholderTextColor={'#8E8E93'}
              numberOfLines={1}
              clearButtonMode="always"
              style={styles.SearchInputCss}></TextInput>
          </View>
          {/* {searchValue.length > 0 && <>
          <TouchableOpacity onPress={()=>setSearch("")} activeOpacity={0.5} style={styles.crossIcon}>
            <CustomeIcon name={'Cancel'} size={20} color={'#1568E5'}></CustomeIcon>
           </TouchableOpacity>
          </>} */}
        </View>
      </View>
      <FlatList
        data={searchedData.toArray()}
        refreshing={[STATE_STATUS.FETCHING, STATE_STATUS.UNFETCHED].includes(
          logsStatus,
        )}
        onRefresh={onRefreshLogs}
        renderItem={renderItem}
        style={styles.list}
        ListEmptyComponent={
          STATE_STATUS.FETCHED && searchedData.size == 0 ? (
            <NoDataFound text={'No Records Found'}></NoDataFound>
          ) : null
        }
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default ActivityScreen;
