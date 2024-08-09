import axios from 'axios';
import CONSTANTS from './constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUsers = async data =>
  axios.post(`${CONSTANTS.BASE_URL}user/region/branch/user`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

export const getRegion = async () =>
  axios.get(`${CONSTANTS.BASE_URL}user/getRegion`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

export const getBranch = async data =>
  axios.post(`${CONSTANTS.BASE_URL}user/region/branch`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
