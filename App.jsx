import React from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import Routes from './src/routes';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import Dimension from './src/Theme/Dimension';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor="#fff" barStyle={'dark-content'} />
      <View style={{marginTop: Dimension.padding30}} />
      <Routes />
      <Toast />
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
