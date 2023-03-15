import React, { useState } from "react";
import {StyleSheet, View,Text,Modal, Platform} from "react-native";
import { Calendar,LocaleConfig } from "react-native-calendars";
import Colors from "../Theme/Colors";
import Dimension from "../Theme/Dimension";

const Calendars = (props) => {
    LocaleConfig.locales['en'] = {
        monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'],
        dayNamesShort: ['S','M','T','W','T','F','S']
      };
    LocaleConfig.defaultLocale = 'en';
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      const formatDate = (date) => {
        return `${date.getFullYear()}-${
          String(date.getMonth() + 1).length > 1
            ? date.getMonth()
            : 0 + String(date.getMonth() + 1)
        }-${
          String(date.getDate()).length > 1
            ? date.getDate()
            : 0 + String(date.getDate())
        }`;
      };
      const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
      console.log(currentDate)
    return (
        <View style={{ backgroundColor: "#fff", flex: 1,marginTop:30 }}>
        <Calendar
        // Initially visible month. Default = now
        current={currentDate}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={"2022-01-01"}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={"2022-03-13"}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          setCurrentDate(day.dateString);
          console.log("selecasted day", day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          setCurrentDate(day.dateString);
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
          setCurrentDate(month.dateString);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        //renderArrow={direction => <Arrow />}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        theme={{ 
          monthTextColor: "white" ,
          dotStyle: { width: 6, height: 6,marginTop:10 },
          selectedDayBackgroundColor: Colors.BgColor1,
          arrowColor: Colors.FontColor,
          textDayFontFamily: Dimension.CustomMediumFont,
            textMonthFontFamily: Dimension.CustomMediumFont,
            textDayHeaderFontFamily: Dimension.CustomMediumFont,
            textDayFontWeight: '500',
        // textMonthFontWeight: 'bold',
            //textDayHeaderFontWeight: '300',
            textDayFontSize: Dimension.font14,
            textMonthFontSize: Dimension.font14,
            textDayHeaderFontSize: Dimension.font14,
            //monthTextColor: 'blue',
        }}
        //markedDates={currentMonthData}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={(date) => (
          <>
            <Text
              style={{
                color: Colors.FontColor,
                fontSize: Dimension.font16,
                fontFamily: Dimension.CustomMediumFont,
                height:30
              }}
            >
              {months[new Date(currentDate).getMonth()]}{" "}
              {new Date(currentDate).getFullYear()}
            </Text>
          </>
        )}
        markingType={"multi-dot"}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
        style={{
          marginTop: Dimension.margin10,
          marginBottom:Dimension.margin5,
          paddingBottom: Dimension.padding10,
          shadowColor: "#000",
          borderWidth: 1,
          borderColor: 'gray',
          height: 350,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 5,
        }}

      />
        </View>)
};

export default Calendars;