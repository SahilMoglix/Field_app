import axios from 'axios';
import CONSTANTS from './constant';

export const login = async data =>
  axios.post(`https://acc-mgmt.moglilabs.com/app/user/login`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
