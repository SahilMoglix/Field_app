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
  Linking,
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logAnalytics from '../../services/analytics';
import Colors from '../../Theme/Colors';
import {PERMISSIONS, request} from 'react-native-permissions';
import CallDetectorManager from 'react-native-call-detection';
import FilterModal from '../Filter';

const ActivityScreen = () => {
  const total = useSelector(state => state.communicationReducer.get('total'));
  const logsData = useSelector(state => state.communicationReducer.get('data'));
  const pageNo = useSelector(state => state.communicationReducer.get('pageNo'));
  const logsStatus = useSelector(state =>
    state.communicationReducer.get('status'),
  );

  const [searchValue, setSearchValue] = useState('');
  const [filtersModal, setFiltersModal] = useState(false);

  const dispatch = useDispatch();

  let callDetector = null;

  useEffect(() => {
    onRefreshLogs(0);
  }, []);

  useEffect(() => {
    if (logsStatus == STATE_STATUS.FETCHED && pageNo == 0) {
      checkPermission();
    }
    if (logsStatus == STATE_STATUS.FETCHING && callDetector) {
      callDetector && callDetector.dispose();
    }
  }, [logsStatus]);

  const onRefreshLogs = (pageNo = 0) => {
    dispatch(fetchLogs(pageNo));
  };

  const showFilter = () => {
    setFiltersModal(true);
  };

  const applyFilters = async params => {
    // await logAnalytics('Calendar_ApplyFilter', {
    //   Selected_Fields: JSON.stringify(params),
    // });
    setFiltersModal(false);
    // dispatch(fetchCustomCalendar(params));
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

  const getLogs = async () => {
    if (Platform.OS == 'android') {
      CallLogs.load(99).then(c => {
        let recentCallCreatedAt = logsData?.get(0)?.timestamp;
        if (recentCallCreatedAt) {
          let filteredCallLogs = ([...c] || [])
            .filter(__ => Number(__?.timestamp) > recentCallCreatedAt)
            .map(_ => ({
              ..._,
              phoneNumber: (_.phoneNumber || '').replace(/\D/g, '').slice(-10),
            }));
          if (filteredCallLogs?.length) {
            createRecentContacts(filteredCallLogs || []);
          }
        } else {
          if (c?.length) {
            createRecentContacts(
              c.map(_ => ({
                ..._,
                phoneNumber: (_.phoneNumber || '')
                  .replace(/\D/g, '')
                  .slice(-10),
              })) || [],
            );
          }
        }
      });
    }
  };

  const checkPermission = async () => {
    try {
      if (Platform.OS == 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          {
            title: 'KAM App',
            message: 'Access your call logs',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLogs();
        } else {
          console.log('Call Log permission denied');
        }
      } else {
        getLogs();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createRecentContacts = async recentCallLogs => {
    try {
      let limitCallLogs = [...recentCallLogs].slice(0, 100);
      const {data} = await createAllContacts(limitCallLogs);
      if (data?.result && data?.result?.length) {
        dispatch(updateLogs(0, data?.result, data.total));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };

  const phoneCallDetector = async userData => {
    if (Platform.OS == 'ios') {
      callDetector = new CallDetectorManager(
        async (event, phoneNumber) => {
          if (event == 'Disconnected') {
            let date = new Date();
            let callData = [
              {
                rawType: 2,
                type: 'OUTGOING',
                dateTime: date.toGMTString(),
                phoneNumber: userData.phoneNumber,
                duration: 0,
                timestamp: date.getTime(),
                name: userData.name,
                userPhoneNumber: userData.phoneNumber,
                createdAt: date.getTime(),
              },
            ];
            const {data} = await createAllContacts(callData);
            if (data?.result && data?.result?.length) {
              dispatch(updateLogs(0, data?.result, data.total));
            }
          }
        },
        false, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
        () => {}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
        {
          title: 'Phone State Permission',
          message:
            'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
        },
      );
    }
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
        <TouchableOpacity
          style={styles.arrowBtn}
          onPress={async () => {
            await logAnalytics('Open_Dialer', {
              Contact: contact?.phoneNumber,
              Screen_Name: 'Communication',
            });
            phoneCallDetector(contact);
            Linking.openURL(
              `${Platform.OS == 'android' ? 'tel' : 'telprompt'}:${
                contact?.phoneNumber
              }`,
            );
          }}>
          <CustomeIcon
            name={'Call-blue'}
            color={Colors.CtaColor}
            size={22}></CustomeIcon>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return <Contact contact={item} />;
  };

  let searchedData = logsData.filter(
    _ =>
      _.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      _.phoneNumber?.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    if (searchValue && searchValue.length && searchValue.length > 4) {
      logEvents();
    }
  }, [searchValue]);

  const logEvents = async () => {
    await logAnalytics('Search', {
      Search_Field: searchValue,
      Screen_Name: 'Communication',
    });
  };

  const onEndReached = () => {
    if (
      [STATE_STATUS.FETCHED, STATE_STATUS.UPDATED].includes(logsStatus) &&
      total / 20 > pageNo + 1
    ) {
      onRefreshLogs(pageNo + 1);
    }
  };

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
        <View style={styles.searchWraper}>
          <CustomeIcon name={'search-grey'} size={22} color={'#8E8E93'} />
          <TextInput
            placeholder={'Search '}
            returnKeyType={'search'}
            onChangeText={e => setSearchValue(e)}
            value={searchValue}
            ellipsizeMode="tail"
            placeholderTextColor={'#8E8E93'}
            numberOfLines={1}
            //clearButtonMode="always"
            style={styles.SearchInputCss}></TextInput>
          {searchValue.length > 0 ? (
            <TouchableOpacity
              onPress={() => setSearchValue('')}
              activeOpacity={0.5}>
              <Icon name={'close-circle'} size={20} color={'#1568E5'} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <FlatList
        data={searchedData.toArray()}
        refreshing={[STATE_STATUS.FETCHING, STATE_STATUS.UNFETCHED].includes(
          logsStatus,
        )}
        onRefresh={onRefreshLogs}
        renderItem={renderItem}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
        style={styles.list}
        ListEmptyComponent={
          STATE_STATUS.FETCHED && searchedData.size == 0 ? (
            <NoDataFound text={'No Records Found'}></NoDataFound>
          ) : null
        }
        keyExtractor={keyExtractor}
      />

      <TouchableOpacity style={styles.filterbtn} onPress={showFilter}>
        <CustomeIcon
          name={'Filter-blue'}
          color={Colors.CtaColor}
          size={20}
          style={{marginVertical: 2}}></CustomeIcon>
        <Text style={styles.filtertxt}>Filter</Text>
      </TouchableOpacity>

      {filtersModal && (
        <FilterModal
          setFiltersModal={setFiltersModal}
          filtersModal={filtersModal}
          onApplyFilter={applyFilters}
          fromCommunicationFilter
        />
      )}
    </View>
  );
};

export default ActivityScreen;
