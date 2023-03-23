import React, {useState, useEffect} from 'react';
import {
  Card,
  Button,
  Icon,
  Avatar,
  ListItem,
  Image,
  Input,
} from 'react-native-elements';
//import CONSTANTS from "../../services/constant";
import styles from './style';
import Dimension from '../../Theme/Dimension';
//import { userService } from "../../services/homepage";
import LinearGradient from 'react-native-linear-gradient';
import {Text, ScrollView, View, StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import AzureAuth from 'react-native-azure-auth';
import Client from 'react-native-azure-auth/src/networking';
const CLIENT_ID = 'ac5fc872-17f9-4f59-af74-3abbe885956e'; // replace the string with YOUR client ID

const azureAuth = new AzureAuth({
  clientId: CLIENT_ID,
});

const LoginScreen = ({navigation}) => {
  const [myContact, setContact] = useState();
  const [myPass, setPass] = useState();
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState('');
  const [mails, setMails] = useState([]);
  const [userId, setUserId] = useState('');

  const onLogin = async () => {
    try {
      console.log('mc yahana aarha hai!!');
      let tokens = await azureAuth.webAuth.authorize({
        scope: 'openid profile User.Read',
      });
      console.log('CRED>>>', tokens);
      setAccessToken(tokens?.accessToken);
      let info = await azureAuth.auth.msGraphRequest({
        token: tokens.accessToken,
        path: 'me',
      });
      console.log('info', info);
      setUser(info.displayName);
      setUserId(tokens?.userId);
    } catch (error) {
      console.log('Error during Azure operation', error);
    }
    // navigation.navigate('HomeApp');
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
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
            {/* <Text style={styles.loginHeading}>Login</Text>
              <Input
                placeholder="Phone no"
                label="Phone Number"
                keyboardType="number-pad"
                onChangeText={(newNo) => setContact(newNo)}
                autoCorrect={false}
                containerStyle={styles.WrapperStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                rightIconContainerStyle={styles.iconStyle}
                errorStyle={styles.errorText}
              />
              <Input
                placeholder="Password"
                label="Password"
                secureTextEntry={true}
                containerStyle={styles.WrapperStyle}
                onChangeText={(newPass) => setPass(newPass)}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                rightIconContainerStyle={styles.iconStyle}
                errorStyle={styles.errorText}
              /> */}
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
