import axios from 'axios';
import CONSTANTS from './constant';

export const getContacts = async () =>
  axios.get(`${CONSTANTS.BASE_URL}/getAllContactsByKamId`, {
    params: {
      id: 1, //await AsyncStorage.getItem('userId')
    },
    headers: {
      // 'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

export const getNumberDetails = async phone =>
  axios.get(`${CONSTANTS.BASE_URL}/searchContactByPhoneAndKAMId`, {
    params: {
      id: 1, //await AsyncStorage.getItem('userId')
      phone,
    },
    headers: {
      // 'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
