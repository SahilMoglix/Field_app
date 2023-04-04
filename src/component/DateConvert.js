import React from 'react';
import {Text, StyleSheet} from 'react-native';
import colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';

const DateConvert = props => {
  // const date = new Date(props.time.noteDate);
  // const formattedDate = moment(date).format("DD MMM YYYY")
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

  const getTime = time => {
    // const dateSplit = time?.split(' ') || '';
    // let actualDate = `${dateSplit?.[2]}-${
    //   months.findIndex(_ => _ == dateSplit?.[1]) + 1
    // }-${dateSplit?.[0]} ${dateSplit?.[3]}`; //might need in future if date format is not standard
    let date = new Date(time);
    let currentDate = new Date();
    if (currentDate.getFullYear() == date.getFullYear()) {
      if (currentDate.getMonth() == date.getMonth()) {
        if (currentDate.getDate() == date.getDate()) {
          return `Today ${date.getHours()}:${date.getMinutes()}`;
        } else if (currentDate.getDate() - date.getDate() == 1) {
          return `Yesterday ${date.getHours()}:${date.getMinutes()}`;
        } else {
          return `${date.getDate()} ${
            months[date.getMonth()]
          } ${date.getFullYear()}`;
        }
      } else {
        return `${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`;
      }
    } else {
      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    }
  };

  return (
    <Text
      style={
        props.contactType == 'MISSED' ? styles.RedDateTxt : styles.DateTxt
      }>
      {getTime(props.date)}
    </Text>
  );
};
const styles = StyleSheet.create({
  DateTxt: {
    fontFamily: Dimension.CustomRegularFont,
    // fontWeight:(Platform.OS === 'ios') ? "500" : "",
    color: colors.FontColor,
    fontSize: Dimension.font14,
  },
  RedDateTxt: {
    fontFamily: Dimension.CustomRegularFont,
    // fontWeight:(Platform.OS === 'ios') ? "500" : "",
    color: colors.brandColor,
    fontSize: Dimension.font14,
  },
});
export default DateConvert;
