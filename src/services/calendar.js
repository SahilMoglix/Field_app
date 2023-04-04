import axios from 'axios';
import CONSTANTS from './constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMeetings = async (startDate, endDate) =>
  axios.post(
    `${CONSTANTS.BASE_URL}calender/getCalendar`,
    {
      startDate,
      endDate,
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    },
  );

export const getCustomMeetings = async params =>
  axios.post(
    `${CONSTANTS.BASE_URL}calender/getCalendar`,
    {...params},
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    },
  );

export const getMonthMeetings = async params =>
  axios.post(
    `${CONSTANTS.BASE_URL}calender/getCalendarCount`,
    {...params},
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    },
  );
