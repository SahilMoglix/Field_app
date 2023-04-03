import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Calendars from '../../component/Calendars';
import EventList from '../../component/EventList';
import styles from './style';
import Dimension from '../../Theme/Dimension';
import CustomeIcon from '../../component/CustomeIcon';
import {ScrollView} from 'react-native-gesture-handler';
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
  const meetingsCustomParams = useSelector(state =>
    state.calendarReducer.getIn(['custom', 'params']),
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
  const navigation = useNavigation();

  const gotoFilter = () => {
    setFiltersModal(true);
  };

  const applyFilters = params => {
    setFiltersModal(false);
    dispatch(fetchCustomCalendar(params));
  };

  useEffect(() => {
    dispatch(
      fetchCustomCalendar({
        designation: null,
        company: null,
        plant: null,
        startDate: new Date(new Date().toDateString() + ' 00:00:00').getTime(),
        endDate: new Date(new Date().toDateString() + ' 23:59:59').getTime(),
      }),
    );
    dispatch(fetchDesignations());
    dispatch(fetchPlantCompanies());
    dispatch(fetchDepartments());
  }, []);

  const updateDate = date => {
    dispatch(
      fetchCalendar(
        new Date(date + ' 00:00:00').getTime(),
        new Date(date + ' 23:59:59').getTime(),
      ),
    );
  };

  const updateMonthData = monthYear => {
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
      }),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Dimension.padding30,
        backgroundColor: '#fff',
      }}>
      <StatusBar translucent backgroundColor="#fff" barStyle={'dark-content'} />
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
      <ScrollView>
        {type == 'cal' ? (
          <Calendars
            meetingsMonthData={meetingsMonthData}
            updateDate={updateDate}
            updateMonthData={updateMonthData}
          />
        ) : (
          <View>
            <TouchableOpacity style={styles.filterbtn} onPress={gotoFilter}>
              <CustomeIcon
                name={'Filter-blue'}
                color={Colors.CtaColor}
                size={20}></CustomeIcon>
              <Text style={styles.filtertxt}>Filter</Text>
            </TouchableOpacity>
          </View>
        )}
        {console.log(meetingsData, 'dwedw')}
        {type == 'cal' ? (
          [STATE_STATUS.FETCHING, STATE_STATUS.UNFETCHED].includes(
            meetingsStatus,
          ) ? (
            <ActivityIndicator size={'small'} />
          ) : meetingsData.size == 0 ? (
            <Text
              style={{
                alignSelf: 'center',
                marginTop: Dimension.margin10,
                color: '#000',
              }}>
              No Events Found
            </Text>
          ) : (
            meetingsData.map((data, dataKey) => (
              <EventList data={data} key={dataKey} />
            ))
          )
        ) : [STATE_STATUS.FETCHING, STATE_STATUS.UNFETCHED].includes(
            meetingsCustomStatus,
          ) ? (
          <ActivityIndicator size={'small'} />
        ) : meetingsData.size == 0 ? (
          <Text
            style={{
              alignSelf: 'center',
              marginTop: Dimension.margin10,
              color: '#000',
            }}>
            No Events Found
          </Text>
        ) : (
          meetingsCustomData.map((data, dataKey) => (
            <EventList data={data} key={dataKey} />
          ))
        )}
      </ScrollView>
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
