import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import CallLogs from 'react-native-call-log';
import CustomeIcon from '../../component/CustomeIcon';
import Dimension from '../../Theme/Dimension';
import styles from './style';
import DateConvert from '../../component/DateConvert';
import {useDispatch, useSelector} from 'react-redux';
import {STATE_STATUS} from '../../redux/constants';
import {createAllContacts} from '../../services/communication';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import logAnalytics from '../../services/analytics';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Theme/Colors';
import FilterModal from '../Filter';
import Modal from 'react-native-modal';
import CustomeDatePicker from '../../component/Datepicker';
import NoDataFound from '../../component/NoDataFound';
import {fetchSalesLogs, updateSalesLogs} from '../../redux/actions/salesTab';

const SalesTeamScreen = props => {
  const total = useSelector(state => state.salesTabReducer.get('total'));
  const logsData = useSelector(state => state.salesTabReducer.get('data'));
  const pageNo = useSelector(state =>
    state.salesTabReducer.getIn(['params', 'pageNo']),
  );
  const paramsData = useSelector(state => state.salesTabReducer.get('params'));
  const logsStatus = useSelector(state => state.salesTabReducer.get('status'));

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  const [searchValue, setSearchValue] = useState('');
  const [filtersModal, setFiltersModal] = useState(false);
  const [showCallLog, setShowCallLog] = useState(false);
  const [dateFilterVisible, setDateFilterVisible] = useState(false);
  const [dateFilterValue, setDateFilterValue] = useState('Last 7 Days');
  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState('');
  const [salesPerson, setSalesPerson] = useState('');
  const [timestamps, setTimestamps] = React.useState({start: 0, end: 0});

  const dispatch = useDispatch();

  let callDetector = null;

  useEffect(() => {
    onRefreshLogs({
      pageNo: 0,
      pageSize: 20,
      userList: [],
      regionList: [],
      branchList: [],
      startDate: '',
      endDate: '',
    });
  }, []);

  const onRefreshLogs = objData => {
    let obj = {
      pageNo: objData?.pageNo || 0,
      pageSize: objData?.pageSize || 20,
      userList: objData?.userList || [],
      regionList: objData?.regionList || [],
      branchList: objData?.branchList || [],
      startDate: '1682068000000',
      endDate: '1724437799999',
    };
    dispatch(fetchSalesLogs(obj));
  };

  const showFilter = () => {
    setFiltersModal(true);
  };

  const applyFilters = async params => {
    let obj = {
      pageNo: 0,
      pageSize: 20,
      userList: params.salesPerson,
      regionList: params.region,
      branchList: params.branch,
      startDate: params.startDate || '',
      endDate: params.endDate || '',
    };
    dispatch(fetchSalesLogs(obj));
    setFiltersModal(false);
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

  const parseDate = dateStr => {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const calculateDaysBetweenDates = (startDate, endDate) => {
    const startDt = parseDate(startDate);
    const endDt = parseDate(endDate);
    const start = new Date(startDt);
    const end = new Date(endDt);
    const differenceInTime = Math.abs(end - start);
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  };

  const totalNoOfDays = () => {
    if (startDate && endDate) {
      const days = calculateDaysBetweenDates(startDate, endDate);
      setNumberOfDays(days);
    }
    setDateFilterVisible(false);
  };

  const computeTimeStamp = range => {
    const now = new Date();
    const startOfDay = date => {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      ).getTime();
    };
    const endOfDay = date => {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999,
      ).getTime();
    };

    switch (range) {
      case 'Today':
        return {
          start: startOfDay(now),
          end: endOfDay(now),
        };

      case 'Yesterday':
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        return {
          start: startOfDay(yesterday),
          end: endOfDay(yesterday),
        };

      case 'Last 7 Days':
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return {
          start: startOfDay(sevenDaysAgo),
          end: endOfDay(now),
        };

      case 'Last 30 Days':
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return {
          start: startOfDay(thirtyDaysAgo),
          end: endOfDay(now),
        };

      default:
        return {
          start: startOfDay(now),
          end: endOfDay(now),
        };
    }
  };

  const getSalesTeamContacts = (startTimeStamp, endTimeStamp) => {
    let obj = {
      pageNo: 0,
      pageSize: 20,
      userList: [],
      regionList: [],
      branchList: [],
      startDate: startTimeStamp,
      endDate: endTimeStamp,
    };
    dispatch(fetchSalesLogs(obj));
  };

  useEffect(() => {
    const {start, end} = computeTimeStamp(dateFilterValue || 'Last 7 days');
    setTimestamps({start, end});
    setDateFilterVisible(false);
    getSalesTeamContacts(start, end);
  }, [dateFilterValue]);

  const handleFilterPress = filterType => {
    if (filterType === 'Custom') {
      setDateFilterValue(filterType);
      totalNoOfDays();
      setShowDatePicker(false);
    } else {
      setDateFilterValue(filterType);
    }
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

  const createRecentContacts = async recentCallLogs => {
    try {
      let limitCallLogs = [...recentCallLogs].slice(0, 100);
      const {data} = await createAllContacts(limitCallLogs);
      if (data?.result && data?.result?.length) {
        dispatch(updateSalesLogs(0, data?.result, data.total));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };

  // Call log for modal
  const rendercontactDetail = contact => {
    return (
      <View style={styles.contactParentView}>
        <View style={styles.placeholderCopy}>
          <Text style={styles.txtCopy}>{contact?.item?.name[0]}</Text>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>{contact?.item?.name}</Text>

          <View style={{flexDirection: 'row', marginTop: Dimension.margin10}}>
            <Text
              style={[styles.phoneNumber, {marginRight: Dimension.margin8}]}>
              {setCallType(contact?.item?.type)}
            </Text>
            <View style={styles.datetxt}>
              <DateConvert
                date={contact?.item?.timestamp}
                contactType={contact?.item?.type}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const toggleCallLogModal = item => {
    setSalesPerson(item);
    setShowCallLog(true);
  };

  const Contact = ({contact}) => {
    return (
      <TouchableOpacity
        onPress={() => toggleCallLogModal(contact)}
        style={styles.contactCon}>
        <View style={styles.placeholder}>
          <Text style={styles.txt}>
            {contact?.appUser?.name ? contact?.appUser?.name[0] : 'U'}
          </Text>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>{contact?.appUser?.name}</Text>
          <Text>
            {contact?.appUser?.region} - {contact?.appUser?.branch}
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
            <Text style={styles.timeDg}>
              {contact?.communicationCount} calls across{' '}
              {contact?.uniqueContactsCount} customers
            </Text>
          </View>
        </View>
        <View style={[styles.arrowBtn, {backgroundColor: '#272727'}]}>
          <Text style={styles.arrwTxt}>{contact?.communicationCount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => {
    return <Contact contact={item} />;
  };

  let searchedData = logsData?.filter(
    _ =>
      _?.appUser?.name?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
      _?.appUser?.phoneNumber
        ?.toLowerCase()
        ?.includes(searchValue?.toLowerCase()),
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
              <Text style={styles.fltrtxt}>
                {dateFilterValue !== 'Custom'
                  ? dateFilterValue
                  : `${numberOfDays} Days`}
              </Text>
              <Icon
                name={'calendar-range-outline'}
                size={20}
                color={'#1568E5'}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
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
      />

      {dateFilterVisible && (
        <Modal
          isVisible={dateFilterVisible}
          onBackButtonPress={() => setDateFilterVisible(false)}
          onBackdropPress={() => setDateFilterVisible(false)}
          style={styles.modalbgView}>
          <View style={styles.modalbg}>
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
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => setShowDatePicker(!showDatePicker)}>
              <Text style={styles.optionText}>Custom</Text>
              {!showDatePicker ? (
                <Icon
                  name={'arrow-down-drop-circle'}
                  size={20}
                  style={{marginTop: 12, marginLeft: 10}}
                />
              ) : (
                <Icon
                  name={'arrow-up-drop-circle'}
                  size={20}
                  style={{marginTop: 12, marginLeft: 10}}
                />
              )}
            </TouchableOpacity>

            {showDatePicker && (
              <>
                <CustomeDatePicker
                  value={startDate}
                  onChange={startDate => setStartDate(startDate)}
                  label={'From Date'}
                  fromSalesTab
                  mode={'date'}
                  display={'default'}
                />
                <CustomeDatePicker
                  value={endDate}
                  onChange={endDate => setEndDate(endDate)}
                  label={'To Date'}
                  fromSalesTab
                  mode={'date'}
                  display={'default'}
                />
                <TouchableOpacity
                  onPress={() => {
                    handleFilterPress('Custom');
                  }}
                  style={{paddingVertical: 5}}>
                  <Icon name={'check-circle'} size={28} color={'#1568E5'} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </Modal>
      )}

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.filterbtn}
        onPress={showFilter}>
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
                  {salesPerson?.appUser?.name}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: Dimension.padding15,
                    fontSize: 12,
                  }}>
                  {salesPerson?.appUser?.region} -{' '}
                  {salesPerson?.appUser?.branch}
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
                  <Text style={styles.timeDg}>
                    {salesPerson?.communicationCount} calls across{' '}
                    {salesPerson?.uniqueContactsCount} customers
                  </Text>
                </View>
              </View>
            </View>

            {/* call detail view to be implemented using scroll view or flatlist*/}
            <View style={{marginBottom: 30}}>
              <FlatList
                data={salesPerson?.communications}
                keyExtractor={item => item.id}
                renderItem={rendercontactDetail}
              />
            </View>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                setShowCallLog(false);
              }}>
              <AntIcon name={'closecircleo'} size={30} color={'#1568E5'} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default SalesTeamScreen;
