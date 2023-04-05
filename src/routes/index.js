import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
  ActivityIndicator,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {APP_STACK_SCREENS, BOTTOM_TAB_SCREENS} from '../constants/index';
import CustomeIcon from '../component/CustomeIcon';
import colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import LoginScreen from '../containers/Login';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchedAuth} from '../redux/actions/auth';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
const getFcmToken = async () => {
  try {
    const token = await firebase.messaging().getToken();
    AsyncStorage.setItem('fcm_token', token);
  } catch (error) {
    console.log(error);
  }
};
const onTokenRefreshListener = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};
const navOptionHandler = () => ({
  headerShown: false,
  tabBarShowLabel: false,
  ...horizontalAnimation,
  // ...TransitionPresets.SlideFromRightIOS,
});

const Routes = props => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    getFcmToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert('A new FCM message arrived!' + JSON.stringify(remoteMessage));
    });
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('Message handled in the background!', remoteMessage);
    });
    return () => {
      onTokenRefreshListener();
    };
  }, []);

  const init = async () => {
    let userData = await AsyncStorage.getItem('@microsoftLogin');
    let parsedToken = JSON.parse(userData);
    if (parsedToken) {
      if (Object.keys(parsedToken).length) {
        await dispatch(fetchedAuth(parsedToken));
        setIsLoggedIn(true);
        setLoading(false);
        // setTimeout(() => {

        // }, 2000);
      } else {
        setIsLoggedIn(false);
        setLoading(false);
      }
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#fefefe'}}>
        <ActivityIndicator size={'large'} color={'dodgerblue'} />
      </View>
    );
  }

  const tabBarIcon = (focused, color, route, rest) => {
    let currentScreen = BOTTOM_TAB_SCREENS.find(
      screen => screen.name === route.name,
    );
    let tabName = currentScreen['name'];
    let iconName = currentScreen[focused ? 'activeIcon' : 'inactiveIcon'];
    return (
      <TouchableOpacity
        style={focused ? styles.ActiveIconBtn : styles.iconAlignment}
        onPress={() => rest.navigation.navigate(route.name)}>
        <CustomeIcon
          name={iconName}
          size={Dimension.font22}
          color={focused ? '#0066FF' : '#898989'}></CustomeIcon>
        <Text
          style={[styles.tabText, {color: focused ? '#0066FF' : '#898989'}]}>
          {tabName}
        </Text>
      </TouchableOpacity>
    );
  };

  const linking = {
    prefixes: ['com.moglix.field://'],
  };
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        options={navOptionHandler}
        screenOptions={({route, ...rest}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color}) =>
            tabBarIcon(focused, color, route, rest),
          // lazy: false,
          safeAreaInsets: {bottom: 0},
          tabBarStyle: {
            paddingTop: Dimension.padding20,
            borderWidth: 0.5,
            borderColor: colors.DateBgColor,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: '#fff',
            height: Platform.OS === 'ios' ? 85 : 80,
            borderBottomWidth: 0,
          },
        })}
        tabBarOptions={tabBarOptions}>
        {BOTTOM_TAB_SCREENS.map((screen, key) => (
          <Tab.Screen
            key={key}
            lazy={false}
            name={screen.name}
            initialParams={{
              setIsLoggedIn,
            }}
            component={screen.component}
            options={navOptionHandler}
            screenOptions={{
              headerShown: false,
            }}
          />
        ))}
      </Tab.Navigator>
    );
  };

  const MainStack = () => {
    return (
      <AppStack.Navigator>
        <AppStack.Screen
          screenOptions={{
            headerShown: false,
          }}
          initialParams={{
            setIsLoggedIn,
          }}
          name="HomeApp"
          component={TabNavigator}
          options={navOptionHandler}
        />
        {APP_STACK_SCREENS.map((screen, key) => (
          <AppStack.Screen
            key={key}
            name={screen.name}
            screenOptions={{
              headerShown: false,
            }}
            component={screen.component}
            options={navOptionHandler}
          />
        ))}
      </AppStack.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <AppStack.Screen
          initialParams={{
            setIsLoggedIn,
          }}
          key={'Login'}
          name={'Login'}
          screenOptions={{
            headerShown: false,
          }}
          component={LoginScreen}
          options={navOptionHandler}
        />
      </AppStack.Navigator>
    );
  };

  const RootNavigation = () => {
    return (
      <NavigationContainer linking={linking}>
        {!isLoggedIn ? <AuthStack /> : <MainStack />}
      </NavigationContainer>
    );
  };

  return <RootNavigation />;
};
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
  },
  //   IconDefaultColor: {color: colors.ExtralightGrayText},
  tabText: {
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomMediumFont,
    marginTop: 4,
    color: colors.bottomTabColor,
    paddingBottom: 5,
  },

  iconAlignment: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: Dimension.padding5,
    paddingHorizontal: Dimension.padding10,
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
  },
  ActiveIconBtn: {
    borderBottomColor: colors.CtaColor,
    borderBottomWidth: 3,
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: Dimension.padding5,
    paddingHorizontal: Dimension.padding10,
  },
});
const tabBarOptions = {
  activeTintColor: '#0066FF',
  inactiveTintColor: '#898989',
  showLabel: false,
  headerShown: false,
  lazy: false,
  style: styles.tabBar,
  safeAreaInsets: {bottom: 0},
};

export default Routes;
