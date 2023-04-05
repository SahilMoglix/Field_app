import React, {useState} from 'react';
import {Button, Image} from 'react-native-elements';
//import CONSTANTS from "../../services/constant";
import styles from './style';
import Dimension from '../../Theme/Dimension';
//import { userService } from "../../services/homepage";
import LinearGradient from 'react-native-linear-gradient';
import {Text, ScrollView, View, StatusBar} from 'react-native';
import AzureAuth from 'react-native-azure-auth';
import {fetchedAuth} from '../../redux/actions/auth';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../../services/auth';
import {setLogoutFunction} from '../../redux/actions/homepage';

const CLIENT_ID = 'ff1fe9da-d218-4ceb-a11f-05ea54a985fb'; //'ac5fc872-17f9-4f59-af74-3abbe885956e'; //'ff1fe9da-d218-4ceb-a11f-05ea54a985fb';

const azureAuth = new AzureAuth({
  clientId: CLIENT_ID,
});

const LoginScreen = props => {
  const [myContact, setContact] = useState();
  const [myPass, setPass] = useState();
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState('');
  const [mails, setMails] = useState([]);
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      let tokens = await azureAuth.webAuth.authorize({
        scope: 'openid profile User.Read offline_access Calendars.Read',
      });
      setAccessToken(tokens?.accessToken);
      let info = await azureAuth.auth.msGraphRequest({
        token: tokens.accessToken,
        path: 'me',
        scope: 'openid profile User.Read offline_access Calendars.Read',
      });
      if (tokens?.accessToken && tokens?.refreshToken) {
        let loginPayload = {
          tokenType: 'Bearer',
          scope: 'Calendars.Read openid profile User.Read email',
          expires_in: tokens?.expiresIn,
          ext_expires_in: tokens?.extExpiresIn,
          access_token: tokens?.accessToken,
          refresh_token: tokens?.refreshToken,
          email: info?.mail,
        };
        let loginResponse = await login(loginPayload);
        if (loginResponse?.data?.result?.access_token) {
          let storeRes = {
            access_token: loginResponse?.data?.result?.access_token,
            email: loginResponse?.data?.result?.email,
          };
          dispatch(fetchedAuth(storeRes));
          await AsyncStorage.setItem(
            '@microsoftLogin',
            JSON.stringify(storeRes),
          );
          await AsyncStorage.setItem(
            'token',
            String(loginResponse?.data?.result?.access_token),
          );
          await AsyncStorage.setItem('email', String(info.mail));
          dispatch(setLogoutFunction(props.route.params.setIsLoggedIn));
          props.route.params.setIsLoggedIn(true);
        }
      } else {
        console.log('Something went wrong!!');
      }
    } catch (error) {
      console.log('Error during Azure operation', error);
    }
  };

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <LinearGradient
          colors={['#EAF2FF', '#fff']}
          style={{flex: 1, position: 'relative', justifyContent: 'flex-end'}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <View style={styles.logoWrap}>
            <Image
              source={require('../../assets/images/Logo.png')}
              style={{
                width: '100%',
                height: Dimension.height25,
                alignSelf: 'center',
              }}
              resizeMode={'contain'}
            />
            <Text style={styles.AppName}>Key Account Manager</Text>
          </View>
          <View style={styles.imageWrap}>
            <Image
              source={require('../../assets/images/login.png')}
              style={{
                width: '100%',
                height: Dimension.height200,
                alignSelf: 'center',
              }}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.formWrap}>
            <Button
              onPress={onLogin}
              title="Login with Microsoft"
              color="#272727"
              buttonStyle={styles.btnStyle}
              titleStyle={styles.btntxt}
              containerStyle={styles.btnContainer}
              raised
            />
          </View>
        </LinearGradient>
      </ScrollView>
    </>
  );
};

export default LoginScreen;
