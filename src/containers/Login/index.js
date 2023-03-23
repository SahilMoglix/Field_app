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

const LoginScreen = ({navigation}) => {
  const [myContact, setContact] = useState();
  const [myPass, setPass] = useState();

  const onLogin = () => {
    navigation.navigate('HomeApp');
    // userService
    //   .UserLogin(myContact,myPass)
    //   .then((data) => {
    //     if (data.code == 200 && data.success) {
    //       navigation.navigate("HomeApp");
    //     } else {
    //       Toast.show({
    //         type: 'error',
    //          position: 'top',
    //         text1: data.message,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
  };

  return (
    <>
      <StatusBar translucent backgroundColor="#fff" barStyle={'dark-content'} />
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
