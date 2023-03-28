import axios from 'axios';
import CONSTANTS from './constant';

export const getContacts = async () =>
  axios.get(`${CONSTANTS.BASE_URL}/GetLastSavedCallLogByKamId`, {
    params: {
      id: 1, //await AsyncStorage.getItem('userId')
    },
    headers: {
      // 'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

export const createAllContacts = async data =>
  axios.post(`${CONSTANTS.BASE_URL}/createAll`, data, {
    headers: {
      // 'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
