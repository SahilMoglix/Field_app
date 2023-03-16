import React, {useState} from "react";
import { View, Text,TouchableOpacity,Button } from "react-native";
import Calendars from "../../component/Calendars";
import EventList from "../../component/EventList";
import styles from './style';
import Dimension from "../../Theme/Dimension";

const CalendarScreen = () => {
  const [type, setType] = useState("cal")
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
      <Button title="Cal" onPress={() => setType("cal")}/>
      <Button title="List" onPress={() => setType("list")}/>
    </View>
  </View>
    <View>
      {type=="cal"&& <Calendars></Calendars>}
      <EventList></EventList>
    </View>
    </View>
  );
};

export default CalendarScreen;
