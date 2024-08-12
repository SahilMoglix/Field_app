import axios from 'axios';
import CONSTANTS from './constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getContacts = async pageNo =>
  axios.post(
    `${CONSTANTS.BASE_URL}communication/getAll`,
    {
      pageNo,
      pageSize: 20,
    },
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    },
  );

export const createAllContacts = async data =>
  axios.post(`${CONSTANTS.BASE_URL}communication/createAll`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
