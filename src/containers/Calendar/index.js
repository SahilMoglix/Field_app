import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Calendars from '../../component/Calendars';
import EventList from '../../component/EventList';
import styles from './style';
import CustomeIcon from '../../component/CustomeIcon';
import Colors from '../../Theme/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCalendar,
  fetchCustomCalendar,
  fetchMonthCalendar,
} from '../../redux/actions/calendar';
import {STATE_STATUS} from '../../redux/constants';
import {useNavigation} from '@react-navigation/native';
import FilterModal from '../Filter';
import {
  fetchDepartments,
  fetchDesignations,
  fetchPlantCompanies,
} from '../../redux/actions/homepage';
import NoDataFound from '../../component/NoDataFound';

const CalendarScreen = () => {
  const meetingsData = useSelector(state =>
    state.calendarReducer.getIn(['day', 'data']),
  );
  const meetingsStatus = useSelector(state =>
    state.calendarReducer.getIn(['day', 'status']),
  );

  const meetingsCustomData = useSelector(state =>
    state.calendarReducer.getIn(['custom', 'data']),
  );
  const meetingsCustomParams = useSelector(
    state => state.calendarReducer.getIn(['custom', 'params']) || {},
  );
  const meetingsCustomStatus = useSelector(state =>
    state.calendarReducer.getIn(['custom', 'status']),
  );

  const meetingsMonthData = useSelector(state =>
    state.calendarReducer.getIn(['month', 'data']),
  );

  const dispatch = useDispatch();

  const [type, setType] = useState('cal');
  const [filtersModal, setFiltersModal] = useState(false);
  const [monthYearData, setMonthYearData] = useState({});
  const [currentDate, setCurrentDate] = useState('');

  const gotoFilter = () => {
    setFiltersModal(true);
  };

  const applyFilters = params => {
    setFiltersModal(false);
    dispatch(fetchCustomCalendar(params));
  };

  useEffect(() => {
    let curr = new Date();
    let first = curr.getDate() - curr.getDay();
    let last = first + 6;
    dispatch(
      fetchCustomCalendar({
        designation: undefined,
        company: undefined,
        plant: undefined,
        startDate: new Date(
          new Date(curr.setDate(first)).toDateString() + ' 00:00:00',
        ).getTime(),
        endDate: new Date(
          new Date(curr.setDate(last)).toDateString() + ' 23:59:59',
        ).getTime(),
      }),
    );
    dispatch(fetchDesignations());
    dispatch(fetchPlantCompanies());
    dispatch(fetchDepartments());
  }, []);

  const updateDate = (date, onDemand) => {
    setCurrentDate(date);
    dispatch(
      fetchCalendar(
        new Date(date + ' 00:00:00').getTime(),
        new Date(date + ' 23:59:59').getTime(),
        onDemand,
      ),
    );
  };

  const updateMonthData = (monthYear, onDemand) => {
    setMonthYearData(monthYear);
    dispatch(
      fetchMonthCalendar({
        startDate: new Date(
          `${monthYear.year}-${monthYear.month}-01` + ' 00:00:00',
        ).getTime(),
        endDate: new Date(
          `${monthYear.year}-${monthYear.month}-${new Date(
            monthYear.year,
            monthYear.month,
            0,
          ).getDate()}` + ' 23:59:59',
        ).getTime(),
        pullFromAzure: onDemand,
      }),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {/* <StatusBar translucent backgroundColor="#fff" barStyle={'dark-content'} /> */}
      <View style={styles.headerWrap}>
        <View style={styles.TopHeader}>
          <Text style={styles.headingTxt}>Calendar</Text>
        </View>
        <View style={styles.rightWrap}>
          <TouchableOpacity
            onPress={() => setType('cal')}
            style={
              type == 'cal' ? styles.activRightBtn : styles.InactivRightBtn
            }>
            <CustomeIcon
              name={'Calendar-black'}
              size={18}
              color={type == 'cal' ? '#1568E5' : '#3c3c3c'}></CustomeIcon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setType('list')}
            style={
              type == 'cal' ? styles.InactivRightBtn : styles.activRightBtn
            }>
            <CustomeIcon
              name={'List-black'}
              size={18}
              color={type != 'cal' ? '#1568E5' : '#3c3c3c'}></CustomeIcon>
          </TouchableOpacity>
        </View>
      </View>
      {type == 'cal' ? (
        <>
          <FlatList
            data={meetingsData.toArray()}
            ListHeaderComponent={
              <Calendars
                meetingsMonthData={meetingsMonthData}
                updateDate={updateDate}
                updateMonthData={updateMonthData}
              />
            }
            keyExtractor={(item, index) => `item-${index}`}
            refreshing={[
              STATE_STATUS.FETCHING,
              STATE_STATUS.UNFETCHED,
            ].includes(meetingsStatus)}
            onRefresh={() => {
              updateDate(currentDate, true);
              updateMonthData(monthYearData, true);
            }}
            renderItem={({item, index}) => (
              <EventList data={item} key={index} />
            )}
            ListEmptyComponent={
              [STATE_STATUS.FETCHING, STATE_STATUS.UNFETCHED].includes(
                meetingsStatus,
              ) ? null : (
                <NoDataFound text={'No event found for the day'}></NoDataFound>
              )
            }
          />
        </>
      ) : (
        <>
          <View style={styles.row}>
            <Text style={styles.dateText}>
              {new Date(meetingsCustomParams?.startDate || '').toDateString()} -{' '}
              {new Date(meetingsCustomParams?.endDate || '').toDateString()}
            </Text>
            <TouchableOpacity style={styles.filterbtn} onPress={gotoFilter}>
              <CustomeIcon
                name={'Filter-blue'}
                color={Colors.CtaColor}
                size={20}></CustomeIcon>
              <Text style={styles.filtertxt}>Filter</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={meetingsCustomData.toArray()}
            keyExtractor={(item, index) => `item-${index}`}
            refreshing={[
              STATE_STATUS.FETCHING,
              STATE_STATUS.UNFETCHED,
            ].includes(meetingsCustomStatus)}
            onRefresh={() => {
              dispatch(
                fetchCustomCalendar({
                  ...meetingsCustomParams,
                  pullFromAzure: true,
                }),
              );
            }}
            renderItem={({item, index}) => (
              <EventList data={item} key={index} />
            )}
            ListEmptyComponent={
              [STATE_STATUS.FETCHING, STATE_STATUS.UNFETCHED].includes(
                meetingsCustomStatus,
              ) ? null : (
                <NoDataFound text={'No event found for the day'}></NoDataFound>
              )
            }
          />
        </>
      )}
      {filtersModal && (
        <FilterModal
          setFiltersModal={setFiltersModal}
          filtersModal={filtersModal}
          onApplyFilter={applyFilters}
          {...meetingsCustomParams}
        />
      )}
    </View>
  );
};

export default CalendarScreen;
