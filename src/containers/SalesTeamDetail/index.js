import React, {useState, useEffect} from 'react';
import {
  Text,
  PermissionsAndroid,
  View,
  Platform,
  TouchableOpacity,
  TextInput,
  Linking,
  Image,
  Dimensions,
  ScrollView,
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logAnalytics from '../../services/analytics';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Theme/Colors';
import {PERMISSIONS, request} from 'react-native-permissions';
import CallDetectorManager from 'react-native-call-detection';
import FilterModal from '../Filter';
import Modal from 'react-native-modal';
import CustomeDatePicker from '../../component/Datepicker';

const SalesTeamScreen = props => {
  const total = useSelector(state => state.communicationReducer.get('total'));
  const logsData = useSelector(state => state.communicationReducer.get('data'));
  const pageNo = useSelector(state =>
    state.communicationReducer.getIn(['params', 'pageNo']),
  );
  const paramsData = useSelector(state =>
    state.communicationReducer.get('params'),
  );
  const logsStatus = useSelector(state =>
    state.communicationReducer.get('status'),
  );

  const [searchValue, setSearchValue] = useState('');
  const [filtersModal, setFiltersModal] = useState(false);
  const [showCallLog, setShowCallLog] = useState(false);
  const [dateFilterVisible, setDateFilterVisible] = useState(false);
  const [dateFilterValue, setDateFilterValue] = useState('Last 7 Days');
  const [isCustomFilter, setCustomFilter] = useState(false);
  const [startDate, setStartDate] = useState(new Date(props.startDate));
  const [endDate, setEndDate] = useState(new Date(props.endDate));
  const [selectedRange, setSelectedRange] = useState({
    startDate: '',
    endDate: '',
  });

  const dispatch = useDispatch();

  let callDetector = null;

  useEffect(() => {
    onRefreshLogs({
      pageNo: 0,
      pageSize: 20,
      userList: [],
      regionList: [],
      branchList: [],
    });
  }, []);

  useEffect(() => {
    if (logsStatus == STATE_STATUS.FETCHED && pageNo == 0) {
      checkPermission();
    }
    if (logsStatus == STATE_STATUS.FETCHING && callDetector) {
      callDetector && callDetector.dispose();
    }
  }, [logsStatus]);

  const onRefreshLogs = objData => {
    let obj = {
      pageNo: objData?.pageNo || 0,
      pageSize: objData?.pageSize || 20,
      userList: objData?.userList || [],
      regionList: objData?.regionList || [],
      branchList: objData?.branchList || [],
    };
    dispatch(fetchLogs(obj));
  };

  const showFilter = () => {
    setFiltersModal(true);
  };

  const applyFilters = async params => {
    obj = {
      pageNo: 0,
      pageSize: 20,
      userList: params.salesPerson,
      regionList: params.region,
      branchList: params.branch,
    };
    dispatch(fetchLogs(obj));

    setFiltersModal(false);
  };

  const convertDateFilter = period => {
    const today = new Date();
    switch (period) {
      case 'today':
        return format(today, 'yyyy-MM-dd');

      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return format(yesterday, 'yyyy-MM-dd');

      case 'last 7 days':
        const end7Days = format(today, 'yyyy-MM-dd');
        const start7Days = new Date(today);
        start7Days.setDate(today.getDate() - 6); // 6 days before today
        return {
          start: format(start7Days, 'yyyy-MM-dd'),
          end: end7Days,
        };

      case 'last 30 days':
        const end30Days = format(today, 'yyyy-MM-dd');
        const start30Days = new Date(today);
        start30Days.setDate(today.getDate() - 29); // 29 days before today
        return {
          start: format(start30Days, 'yyyy-MM-dd'),
          end: end30Days,
        };

      default:
        throw new Error('Invalid period');
    }
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

  const handleFilterPress = filterType => {
    if (filterType === 'Custom') {
      setCustomFilter(true);
      setDateFilterVisible(false);
    } else {
      setDateFilterValue(filterType);
      setDateFilterVisible(false);
    }
  };

  const handleCustomFilterConfirm = () => {
    console.log(
      `Custom Range Selected: ${selectedRange.startDate} to ${selectedRange.endDate}`,
    );
    setCustomFilter(false);
    setDateFilterValue('Custom Date');
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

  // Call log for modal
  const contactDetail = () => {
    return (
      <View style={styles.contactParentView}>
        <View style={styles.placeholderCopy}>
          <Text style={styles.txtCopy}>
            {/* {contact?.name ? contact?.name[0] : 'U'} */}H
          </Text>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {/* {contact?.name ? contact?.name : contact?.phoneNumber} */}
            Hemant Bambulkar
          </Text>

          <View style={{flexDirection: 'row', marginTop: Dimension.margin10}}>
            <Image
              source={require('../../assets/images/phone-call.png')}
              style={{
                width: 15,
                height: 15,
                marginRight: Dimension.margin8,
              }}
              resizeMode={'contain'}
            />
            {/* <Text style={styles.phoneNumber}>{setCallType(contact?.type)}</Text> */}
            <Text style={styles.timeDg}>Yesterday, 7:05 pm</Text>
          </View>
        </View>
      </View>
    );
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

  const Contact = () => {
    return (
      <TouchableOpacity
        onPress={() => setShowCallLog(true)}
        style={styles.contactCon}>
        <View style={styles.placeholder}>
          <Text style={styles.txt}>
            {/* {contact?.name ? contact?.name[0] : 'U'} */}H
          </Text>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {/* {contact?.name ? contact?.name : contact?.phoneNumber} */}
            Hemant Bambulkar
          </Text>
          <Text>Pune - West</Text>
          <View style={{flexDirection: 'row', marginTop: Dimension.margin10}}>
            <Image
              source={require('../../assets/images/phone-call.png')}
              style={{
                width: 15,
                height: 15,
                marginRight: Dimension.margin8,
              }}
              resizeMode={'contain'}
            />
            {/* <Text style={styles.phoneNumber}>{setCallType(contact?.type)}</Text> */}
            <Text style={styles.timeDg}>5 calls across 2 customers</Text>
          </View>
        </View>
        <View style={[styles.arrowBtn, {backgroundColor: '#272727'}]}>
          {/* if call count is 0 then background colour: #D9232D , have to handle this after api integration*/}
          <Text style={styles.arrwTxt}>10</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => {
    return <Contact contact={item} />;
  };

  let searchedData = logsData?.filter(
    _ =>
      _.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      _.phoneNumber?.toLowerCase().includes(searchValue.toLowerCase()),
    // _?.company?.toLowerCase().includes(searchValue?.toLowerCase()),
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
      onRefreshLogs({...paramsData, pageNo: pageNo + 1});
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
          <Text style={styles.headingTxt}>Sales Team</Text>
          <View style={styles.topFilter}>
            <TouchableOpacity
              onPress={() => setDateFilterVisible(true)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: Dimension.padding10,
                paddingVertical: Dimension.padding8,
              }}>
              <Text style={styles.fltrtxt}>{dateFilterValue}</Text>
              <Icon
                name={'calendar-range-outline'}
                size={20}
                color={'#1568E5'}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {Contact()}

      {/* <FlatList
        data={searchedData.toArray()}
        refreshing={[STATE_STATUS.FETCHING, STATE_STATUS.UNFETCHED].includes(
          logsStatus,
        )}
        onRefresh={() =>
          onRefreshLogs({
            ...paramsData,
            pageNo: 0,
          })
        }
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
      /> */}

      {dateFilterVisible && (
        <Modal
          isVisible={dateFilterVisible}
          onBackButtonPress={() => setDateFilterVisible(false)}
          onBackdropPress={() => setDateFilterVisible(false)}
          //   coverScreen={false}
          //   hasBackdrop={true}
          style={styles.modalbgView}>
          <View style={styles.modalbg}>
            {/* <View>
              <TouchableOpacity
                //   style={styles.cancelBtn}
                onPress={() => {
                  setDateFilterVisible(false);
                }}>
                <MatIcon name={'cancel'} size={22} color={'#272727'} />
              </TouchableOpacity>
            </View> */}

            <TouchableOpacity onPress={() => handleFilterPress('Today')}>
              <Text style={styles.optionText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterPress('Yesterday')}>
              <Text style={styles.optionText}>Yesterday</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterPress('Last 7 Days')}>
              <Text style={styles.optionText}>Last 7 Days</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterPress('Last 30 Days')}>
              <Text style={styles.optionText}>Last 30 Days</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterPress('Custom')}>
              <Text style={styles.optionText}>Custom</Text>
              {/* <CustomeDatePicker
                value={
                  typeof startDate == 'string'
                    ? startDate
                    : startDate.getDate() +
                      '-' +
                      (startDate.getMonth() + 1) +
                      '-' +
                      startDate.getFullYear()
                }
              /> */}
            </TouchableOpacity>
          </View>
        </Modal>
      )}

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
          paramsData={{
            salesPerson: paramsData?.userList,
            region: paramsData?.regionList,
            branch: paramsData?.branchList,
          }}
          onApplyFilter={applyFilters}
          fromCommunicationFilter
        />
      )}

      {showCallLog && (
        <Modal
          isVisible={showCallLog}
          animationType="slide"
          overlayPointerEvents={'auto'}
          coverScreen={false}
          onBackButtonPress={() => setShowCallLog(false)}
          onBackdropPress={() => setShowCallLog(false)}
          style={styles.modalbgg}>
          <View style={styles.modalContainer}>
            {/* Top view of caller detail */}
            <View style={styles.topView}>
              <View style={styles.contactDataDg}>
                <Text
                  style={[
                    styles.name,
                    {paddingHorizontal: Dimension.padding15},
                  ]}>
                  {/* {contact?.name ? contact?.name : contact?.phoneNumber} */}
                  Hemant Bambulkar
                </Text>
                <Text
                  style={{
                    paddingHorizontal: Dimension.padding15,
                    fontSize: 12,
                  }}>
                  Pune - West
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: Dimension.margin10,
                    paddingHorizontal: Dimension.padding15,
                  }}>
                  <Image
                    source={require('../../assets/images/phone-call.png')}
                    style={{
                      width: 15,
                      height: 15,
                      marginRight: Dimension.margin8,
                    }}
                    resizeMode={'contain'}
                  />
                  {/* <Text style={styles.phoneNumber}>{setCallType(contact?.type)}</Text> */}
                  <Text style={styles.timeDg}>5 calls across 2 customers</Text>
                </View>
              </View>
            </View>

            {/* call detail view to be implemented using scroll view or flatlist*/}
            <View style={styles.contactParentView}>
              <View style={styles.placeholderCopy}>
                <Text style={styles.txtCopy}>
                  {/* {contact?.name ? contact?.name[0] : 'U'} */}H
                </Text>
              </View>
              <View style={styles.contactDat}>
                <Text style={styles.name}>
                  {/* {contact?.name ? contact?.name : contact?.phoneNumber} */}
                  Hemant Bambulkar
                </Text>

                <View
                  style={{flexDirection: 'row', marginTop: Dimension.margin10}}>
                  <Image
                    source={require('../../assets/images/phone-call.png')}
                    style={{
                      width: 15,
                      height: 15,
                      marginRight: Dimension.margin8,
                    }}
                    resizeMode={'contain'}
                  />
                  {/* <Text style={styles.phoneNumber}>{setCallType(contact?.type)}</Text> */}
                  <Text style={styles.timeDg}>Yesterday, 7:05 pm</Text>
                </View>
              </View>
            </View>
            <View style={styles.contactParentView}>
              <View style={styles.placeholderCopy}>
                <Text style={styles.txtCopy}>
                  {/* {contact?.name ? contact?.name[0] : 'U'} */}H
                </Text>
              </View>
              <View style={styles.contactDat}>
                <Text style={styles.name}>
                  {/* {contact?.name ? contact?.name : contact?.phoneNumber} */}
                  Hemant Bambulkar
                </Text>

                <View
                  style={{flexDirection: 'row', marginTop: Dimension.margin10}}>
                  <Image
                    source={require('../../assets/images/phone-call.png')}
                    style={{
                      width: 15,
                      height: 15,
                      marginRight: Dimension.margin8,
                    }}
                    resizeMode={'contain'}
                  />
                  {/* <Text style={styles.phoneNumber}>{setCallType(contact?.type)}</Text> */}
                  <Text style={styles.timeDg}>Yesterday, 7:05 pm</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                setShowCallLog(false);
              }}>
              <MatIcon name={'cancel'} size={40} color={'#1568E5'} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default SalesTeamScreen;
