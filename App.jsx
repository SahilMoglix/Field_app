import React, {useEffect} from 'react';
import {StatusBar, View, Platform, SafeAreaView} from 'react-native';
import Routes from './src/routes';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import {toastConfig} from './src/generic/index';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
        <Routes />
        {/* <Toast /> */}
        <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
