import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const logoutMiddleware = store => next => async action => {
  if (
    action &&
    action.error &&
    action.error.response &&
    action.error.response.status == 401
  ) {
    try {
      await AsyncStorage.clear();
      let logoutFunction = store.getState().homepageReducer.get('logoutFunc');
      logoutFunction(false);
      Toast.show({
        type: 'info',
        text1: 'Session expired!',
        text2: 'Please login again.',
      });
      return next({
        type: 'LOGOUT',
      });
    } catch (e) {
      console.log(e);
      return next({
        type: 'LOGOUT',
      });
    }
  }

  return next(action);
};
