import axios from 'axios';
import CONSTANTS from './constant';

export const getMeetings = async (startDate, endDate) =>
  axios.get(`${CONSTANTS.BASE_URL}/GetMeetingByKAMId`, {
    params: {
      // startDate,
      // endDate,
      id: 1, //await AsyncStorage.getItem('userId')
    },
    headers: {
      // 'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

export const getCustomMeetings = async params =>
  axios.get(`${CONSTANTS.BASE_URL}/GetMeetingByKAMId`, {
    params: {
      ...params,
      id: 1, //await AsyncStorage.getItem('userId')
    },
    headers: {
      // 'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
