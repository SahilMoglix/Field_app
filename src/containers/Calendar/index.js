import React from "react";
import { View, Text,TouchableOpacity,Button } from "react-native";
import Calendars from "../../component/Calendars";
import EventList from "../../component/EventList";
import styles from './style';
import Dimension from "../../Theme/Dimension";

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
    <View>
      <Button title="Cal" />
      <Button title="List" />
    </View>
  </View>
    <View>
      <Calendars></Calendars>
      <EventList></EventList>
    </View>
    </View>
  );
};

export default CalendarScreen;
