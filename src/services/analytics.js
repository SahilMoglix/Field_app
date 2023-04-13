import {Platform} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logAnalytics = async (eventName, params) => {
  let email = await AsyncStorage.getItem('email');
  console.log(eventName, {
    Email_Id: email,
    Platform: Platform.OS,
    Version: DeviceInfo.getVersion(),
    Timestamp: new Date().getTime(),
    ...params,
  });
  await analytics().logEvent(eventName, {
    Email_Id: email,
    Platform: Platform.OS,
    Version: DeviceInfo.getVersion(),
    Timestamp: new Date().getTime(),
    ...params,
  });
};

export default logAnalytics;
