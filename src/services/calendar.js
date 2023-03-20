import axios from 'axios';

export const getMeetings = async (startDate, endDate) =>
  axios.get(
    'https://731f9f6b-161f-46c7-bbfc-3541588250cf.mock.pstmn.io/GetMeetingByKAMId',
    {
      params: {
        // startDate,
        // endDate,
        id: 1, //await AsyncStorage.getItem('userId')
      },
      headers: {
        // 'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    },
  );

export const getCustomMeetings = async params =>
  axios.get(
    'https://731f9f6b-161f-46c7-bbfc-3541588250cf.mock.pstmn.io/GetMeetingByKAMId',
    {
      params: {
        ...params,
        id: 1, //await AsyncStorage.getItem('userId')
      },
      headers: {
        // 'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    },
  );
