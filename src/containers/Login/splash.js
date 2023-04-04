import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native-elements';
import Dimension from '../../Theme/Dimension';
import {userService} from '../../services/homepage';
//import SyncStorage from 'sync-storage';
import SplashScreen from 'react-native-splash-screen';

const Splash = ({navigation}) => {
  useEffect(() => {
    navigation.navigate('HomeApp');
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#EAF2FF', '#fff']}
      style={{flex: 1, justifyContent: 'center'}}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <Image
        source={require('../../assets/images/login.png')}
        style={{
          width: '100%',
          height: Dimension.height200,
          alignSelf: 'center',
        }}
        resizeMode={'contain'}
      />
    </LinearGradient>
  );
};

export default Splash;
