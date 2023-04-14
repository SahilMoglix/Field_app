import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import logAnalytics from '../../services/analytics';

export const logoutMiddleware = store => next => async action => {
  if (
    action &&
    action.error &&
    action.error.response &&
    action.error.response.status == 429
  ) {
    await logAnalytics('Calendar_ToomanyRequest', {
      Error_Message: action?.error?.response?.data?.message || '',
    });
    Toast.show({
      type: 'error',
      text1: 'Please try after sometime!',
    });
  } else if (action?.error?.response?.data) {
    Toast.show({
      type: 'info',
      text1: action?.error?.response?.data?.message || 'Something went wrong!',
    });
  }
  if (
    action &&
    action.error &&
    action.error.response &&
    (action.error.response.status == 401 || action.error.response.status == 410)
  ) {
    try {
      await AsyncStorage.clear();
      let logoutFunction = store.getState().homepageReducer.get('logoutFunc');
      logoutFunction(false);
      Toast.show({
        type: 'error',
        text1: 'Session expired!',
        text2: 'Please login again.',
      });
      return next({
        type: 'LOGOUT',
      });
    } catch (e) {
      return next({
        type: 'LOGOUT',
      });
    }
  }
  return next(action);
};
