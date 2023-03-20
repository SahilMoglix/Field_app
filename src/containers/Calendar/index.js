import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import Calendars from '../../component/Calendars';
import EventList from '../../component/EventList';
import styles from './style';
import Dimension from '../../Theme/Dimension';
import CustomeIcon from '../../component/CustomeIcon';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../../Theme/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCalendar, fetchCustomCalendar} from '../../redux/actions/calendar';
import {STATE_STATUS} from '../../redux/constants';

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

  const dispatch = useDispatch();

  const [type, setType] = useState('cal');

  useEffect(() => {
    dispatch(
      fetchCustomCalendar({
        designation: 'all',
        company: 1,
        plant: 1,
        startDate: new Date(new Date().toDateString() + ' 00:00:00').getTime(),
        endDate: new Date(new Date().toDateString() + ' 23:59:59').getTime(),
      }),
    );
  }, []);

  const updateDate = date => {
    dispatch(
      fetchCalendar(
        new Date(date + ' 00:00:00').getTime(),
        new Date(date + ' 23:59:59').getTime(),
      ),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: Dimension.margin40,
        backgroundColor: '#fff',
      }}>
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
          <Calendars updateDate={updateDate} />
        ) : (
          <View>
            <TouchableOpacity style={styles.filterbtn}>
              <CustomeIcon
                name={'Filter-blue'}
                color={Colors.CtaColor}
                size={20}></CustomeIcon>
              <Text style={styles.filtertxt}>Filter</Text>
            </TouchableOpacity>
          </View>
        )}
        {type == 'cal' ? (
          [STATE_STATUS.FETCHING, STATE_STATUS.UNFETCHED].includes(
            meetingsStatus,
          ) ? (
            <ActivityIndicator size={'small'} />
          ) : (
            meetingsData.map((data, dataKey) => (
              <EventList data={data} key={dataKey} />
            ))
          )
        ) : [STATE_STATUS.FETCHING, STATE_STATUS.UNFETCHED].includes(
            meetingsCustomStatus,
          ) ? (
          <ActivityIndicator size={'small'} />
        ) : (
          meetingsCustomData.map((data, dataKey) => (
            <EventList data={data} key={dataKey} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;
