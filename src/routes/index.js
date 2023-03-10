import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity,Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { APP_STACK_SCREENS, BOTTOM_TAB_SCREENS } from "../constants/index";
//import CustomeIcon from "../component/common/CustomeIcon";
import colors from "../Theme/Colors";
import Dimension from "../Theme/Dimension";

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const horizontalAnimation = {
  gestureDirection: "horizontal",
  cardStyleInterpolator: ({ current, layouts }) => {
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

const navOptionHandler = () => ({
  headerShown: false,
  tabBarShowLabel: false,
  ...horizontalAnimation,
  // ...TransitionPresets.SlideFromRightIOS,
});

const Routes = (props) => {
  const tabBarIcon = (focused, color, route, rest) => {
    let currentScreen = BOTTOM_TAB_SCREENS.find(
      (screen) => screen.name === route.name
    );
    let tabName = currentScreen["name"];
    let iconName = currentScreen[focused ? "activeIcon" : "inactiveIcon"];
    return (
      <TouchableOpacity
        style={focused ? styles.ActiveIconBtn : styles.iconAlignment}
        onPress={() => rest.navigation.navigate(route.name)}
      >
        {/* <CustomeIcon
          name={iconName}
          size={Dimension.font22}
          color={focused ? "#0066FF" : "#898989"}
        ></CustomeIcon> */}
        <Text
          style={[styles.tabText, { color: focused ? "#0066FF" : "#898989" }]}
        >
          {tabName}
        </Text>
      </TouchableOpacity>
    );
  };

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route, ...rest }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color }) =>
            tabBarIcon(focused, color, route, rest),
          // lazy: false,
          safeAreaInsets: { bottom: 0 },
          tabBarStyle: {
            paddingTop: Dimension.padding20,
            borderWidth: 0.5,
            borderColor: colors.DateBgColor,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: "#fff",
            height: Platform.OS === 'ios'? 85:80,
            borderBottomWidth: 0,
          },
        })}
        tabBarOptions={tabBarOptions}
      >
        {BOTTOM_TAB_SCREENS.map((screen, key) => (
          <Tab.Screen
            key={key}
            lazy={false}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash"
      >
        <AppStack.Screen
          screenOptions={{
            headerShown: false,
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
            // options={navOptionHandler}
          />
        ))}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
  },
  //   IconDefaultColor: {color: colors.ExtralightGrayText},
  tabText: {
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomMediumFont,
    marginTop: 4,
    color: colors.bottomTabColor,
    paddingBottom:5
  },

  iconAlignment: {
    alignItems: "center",
    alignSelf: "center",
    paddingBottom: Dimension.padding5,
    paddingHorizontal: Dimension.padding5,
    borderBottomWidth: 4,
    borderBottomColor:"#fff"
  },
  ActiveIconBtn: {
    borderBottomColor: colors.CtaColor,
    borderBottomWidth: 4,
    alignItems: "center",
    alignSelf: "center",
    paddingBottom: Dimension.padding5,
    paddingHorizontal: Dimension.padding5,
  },
});
const tabBarOptions = {
  activeTintColor: "#0066FF",
  inactiveTintColor: "#898989",
  showLabel: false,
  lazy: false,
  style: styles.tabBar,
  safeAreaInsets: { bottom: 0 },
};

export default Routes;
