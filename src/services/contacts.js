import axios from 'axios';
import CONSTANTS from './constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getContacts = async () =>
  axios.get(`${CONSTANTS.BASE_URL}contact/getByLoggedInUser`, {
    params: {
      // id: 1, //await AsyncStorage.getItem('userId')
    },
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

export const getNumberDetails = async phone =>
  axios.get(
    `${CONSTANTS.BASE_URL}contact/searchContactByPhoneForLoggedInUser/${phone}`,
    {
      params: {
        // id: 1, //await AsyncStorage.getItem('userId')
      },
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    },
  );

export const createContact = async data =>
  axios.post(`${CONSTANTS.BASE_URL}contact/create`, data, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });

export const deletContact = async id =>
  axios.get(`${CONSTANTS.BASE_URL}contact/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
