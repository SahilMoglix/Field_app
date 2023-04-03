import axios from 'axios';
import CONSTANTS from './constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDesignations = async () =>
  axios.get(`${CONSTANTS.BASE_URL}deignation/get`, {
    params: {
      // id: 1, //await AsyncStorage.getItem('userId')
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

export const getPlantCompnaies = async () =>
  axios.get(`${CONSTANTS.BASE_URL}user/getPlantCompanyDetails`, {
    params: {
      // id: 1, //await AsyncStorage.getItem('userId')
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

export const getDepartments = async () =>
  axios.get(`${CONSTANTS.BASE_URL}department/getAllDepartment`, {
    params: {
      // id: 1, //await AsyncStorage.getItem('userId')
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
