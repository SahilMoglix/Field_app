import React, {useState, useRef, useEffect} from 'react';
import {TextInput, Text, StyleSheet, View, Animated} from 'react-native';
import CustomeIcon from './CustomeIcon';
import Dimension from '../Theme/Dimension';
import colors from '../Theme/Colors';

const ContactData = props => {
  const IconSet = {
    name: 'Name-Icon-Grey',
    email: 'Mail-grey',
    phone: 'call-grey',
    inclination: 'Inclination-grey',
    designation: 'Designation-grey',
    plant: 'Plant-grey',
    company: 'company-grey',
    department: 'Department-grey',
    whatsappContact: 'Whatsaap-green',
  };
  const getIconName = () => {
    return IconSet[props.icon];
  };

  return (
    <View style={styles.WrapperStyle}>
      <View style={styles.iconWrap}>
        <CustomeIcon
          name={getIconName()}
          size={Dimension.font20}
          color={colors.DateBgColor}></CustomeIcon>
      </View>
      <View>
        <Text style={styles.labelStyle}>{props.label}</Text>
        <Text style={styles.inputStyle}>{props.value}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  WrapperStyle: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 5,
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.padding12,
    height: Dimension.height70,
    marginBottom: Dimension.margin10,
    flexDirection: 'row',
  },
  labelStyle: {
    fontSize: Dimension.font16,
    color: colors.DateBgColor,
    fontFamily: Dimension.CustomMediumFont,
    // fontWeight:(Platform.OS === 'ios') ? "500" : "",
    marginLeft: Dimension.margin10,
    fontWeight: 'normal',
  },
  inputContainerStyle: {
    paddingBottom: 0,
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingVertical: 0,
    paddingTop: 0,
  },

  inputStyle: {
    fontSize: Dimension.font16,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    // fontWeight:(Platform.OS === 'ios') ? "500" : "",
    paddingLeft: Dimension.padding10,
    marginBottom: 0,
    marginTop: Dimension.margin5,
  },
  iconStyle: {
    width: Dimension.width24,
    height: Dimension.height24,
    paddingRight: 0,
  },
});
export default ContactData;
