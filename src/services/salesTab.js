import axios from 'axios';
import CONSTANTS from './constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSalesContactsApi = async params =>
  axios.post(
    `${CONSTANTS.BASE_URL}communication/getFilteredCommunication`,
    {...params},
    {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    },
  );
