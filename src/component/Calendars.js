import {OrderedMap} from 'immutable';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Modal, Platform} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';

const Calendars = props => {
  const {updateDate, updateMonthData, meetingsMonthData} = props;

  LocaleConfig.locales['en'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thrusday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  };
  LocaleConfig.defaultLocale = 'en';
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const formatDate = date => {
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
  const [currentMonthYear, setCurrentMonthYear] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  useEffect(() => {
    updateDate(currentDate);
  }, [currentDate]);

  useEffect(() => {
    updateMonthData(currentMonthYear);
  }, [currentMonthYear]);

  const getDots = dotCount => {
    let dots = [];
    new Array(dotCount).fill({}).map(_ => {
      dots.push({
        key: 'vacation',
        color: 'dodgerblue',
        selectedDotColor: 'dodgerblue',
      });
    });
    return dots;
  };

  const getMarkedDates = () => {
    let obj = {};
    meetingsMonthData.toArray().map(_ => {
      obj[`${Object.keys(_)[0]}`] = {
        selected: Object.keys(_)[0] == currentDate,
        marked: Object.keys(_)[0] == currentDate,
        selectedColor: Object.keys(_)[0] == currentDate ? '#ED6A60' : null,
        dots: getDots(_[Object.keys(_)[0]]),
      };
    });
    if (obj[currentDate]) {
      obj[currentDate] = {
        ...obj[currentDate],
        selected: true,
        marked: true,
        selectedColor: '#ED6A60',
      };
    } else {
      obj[currentDate] = {
        selected: true,
        marked: true,
        selectedColor: '#ED6A60',
      };
    }
    return obj;
  };

  return (
    <View style={{backgroundColor: '#fff'}}>
      <Calendar
        current={currentDate}
        onDayPress={day => {
          setCurrentDate(day.dateString);
        }}
        onDayLongPress={day => {
          setCurrentDate(day.dateString);
        }}
        monthFormat={'yyyy MM'}
        onMonthChange={month => {
          setCurrentDate(month.dateString);
          setCurrentMonthYear(month);
        }}
        hideArrows={false}
        hideExtraDays={true}
        disableMonthChange={true}
        firstDay={1}
        hideDayNames={false}
        showWeekNumbers={false}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableArrowLeft={false}
        disableArrowRight={false}
        theme={{
          monthTextColor: 'white',
          dotStyle: {width: 6, height: 6, marginTop: 10},
          selectedDayBackgroundColor: Colors.BgColor1,
          arrowColor: Colors.FontColor,
          textDayFontFamily: Dimension.CustomMediumFont,
          textMonthFontFamily: Dimension.CustomMediumFont,
          textDayHeaderFontFamily: Dimension.CustomMediumFont,
          textDayFontWeight: '500',
          textDayFontSize: Dimension.font14,
          textMonthFontSize: Dimension.font14,
          textDayHeaderFontSize: Dimension.font14,
          //monthTextColor: 'blue',
        }}
        disableAllTouchEventsForDisabledDays={true}
        renderHeader={date => (
          <>
            <Text
              style={{
                color: Colors.FontColor,
                fontSize: Dimension.font16,
                fontFamily: Dimension.CustomMediumFont,
                height: 30,
              }}>
              {months[new Date(currentDate).getMonth()]}{' '}
              {new Date(currentDate).getFullYear()}
            </Text>
          </>
        )}
        markedDates={getMarkedDates()}
        markingType={'multi-dot'}
        enableSwipeMonths={true}
        style={{
          marginBottom: Dimension.margin5,
          paddingBottom: Dimension.padding10,
          shadowColor: '#000',
          height: 320,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5,
        }}
      />
    </View>
  );
};

export default Calendars;
