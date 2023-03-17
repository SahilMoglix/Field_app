import React, {useState} from "react";
import { View, Text,TouchableOpacity,Button } from "react-native";
import Calendars from "../../component/Calendars";
import EventList from "../../component/EventList";
import styles from './style';
import Dimension from "../../Theme/Dimension";
import CustomeIcon from "../../component/CustomeIcon";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../Theme/Colors";

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
    <View style={styles.rightWrap}>
      <TouchableOpacity onPress={() => setType("cal")} style={styles.activRightBtn}>
      <CustomeIcon name={'Calendar-black'} size={18} color={'#1568E5'}></CustomeIcon>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setType("list")} style={styles.InactivRightBtn}>
      <CustomeIcon name={'List-black'} size={18} color={'#3c3c3c'}></CustomeIcon>
      </TouchableOpacity>
    </View>
  </View>
    <ScrollView>
      
    {type=="cal"? <Calendars></Calendars>:
    <View style={{flexDirection:"row"}}>
    <CustomeIcon name={'filter-blue'} color={Colors.CtaColor} size={20}></CustomeIcon>
    <Text style={styles.filtertxt}>Filter</Text>
  </View>}
      <EventList></EventList>
    </ScrollView>
    </View>
  );
};

export default CalendarScreen;
