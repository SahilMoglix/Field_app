import axios from 'axios';
import CONSTANTS from './constant';

export const login = async data =>
  axios.post(`${CONSTANTS.BASE_URL}user/login`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
