import axios from 'axios';
import CONSTANTS from './constant';

export const getDesignations = async () =>
  axios.get(`${CONSTANTS.BASE_URL}/GetAllDesignations`, {
    params: {
      id: 1, //await AsyncStorage.getItem('userId')
    },
    headers: {
      // 'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

export const getPlantCompnaies = async () =>
  axios.get(`${CONSTANTS.BASE_URL}/GetPlantCompanyDetailsByKamId`, {
    params: {
      id: 1, //await AsyncStorage.getItem('userId')
    },
    headers: {
      // 'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

export const getDepartments = async () =>
  axios.get(`${CONSTANTS.BASE_URL}/GetAllDepartments`, {
    params: {
      id: 1, //await AsyncStorage.getItem('userId')
    },
    headers: {
      // 'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
