import React from 'react';
import {StatusBar, View, Platform} from 'react-native';
import Routes from './src/routes';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor="#fff" barStyle={'dark-content'} />
      <View
        style={{
          marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        }}
      />
      <Routes />
      <Toast />
    </Provider>
  );
};

export default App;
