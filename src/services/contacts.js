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
