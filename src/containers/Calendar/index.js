import React from "react";
import { View, Text,TouchableOpacity,Button } from "react-native";
import Calendars from "../../component/Calendars";
import EventList from "../../component/EventList";
import styles from './style';
import Dimension from "../../Theme/Dimension";
import CustomeIcon from "../../component/CustomeIcon";
import { ScrollView } from "react-native-gesture-handler";

const CalendarScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: Dimension.margin40,
        backgroundColor: "#fff",
      }}
    >
    <View style={styles.headerWrap}>
    <View style={styles.TopHeader}>
      <Text style={styles.headingTxt}>Calendar</Text>
    </View>
    <View style={styles.rightWrap}>
      <TouchableOpacity style={styles.activRightBtn}>
      <CustomeIcon name={'Calendar-black'} size={18} color={'#1568E5'}></CustomeIcon>
      </TouchableOpacity>
      <TouchableOpacity style={styles.InactivRightBtn}>
      <CustomeIcon name={'List-black'} size={18} color={'#3c3c3c'}></CustomeIcon>
      </TouchableOpacity>
    </View>
  </View>
    <ScrollView>
      <Calendars></Calendars>
      <EventList></EventList>
      <EventList></EventList>

    </ScrollView>
    </View>
  );
};

export default CalendarScreen;
