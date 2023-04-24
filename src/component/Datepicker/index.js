import React, {useEffect, useState} from 'react';
import {View, Platform, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
import {Input} from 'react-native-elements';
import CustomeIcon from '../CustomeIcon';
import styles from './styles';

const CustomeDatePicker = props => {
  const {display, value, maxdate, fromCategoryBrand, natureOfBusiness} = props;
  const [date, setDate] = useState(value || new Date());
  const [isFocused, setIsFocused] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Select Date');

  const onchangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    if (event.type != 'dismissed') {
      setDate(currentDate);

      let tempDate = new Date(currentDate);
      let fDate =
        tempDate.getDate() +
        '-' +
        (tempDate.getMonth() + 1) +
        '-' +
        tempDate.getFullYear();

      props.onChange(fDate);
      setText(fDate);
    }
  };

  useEffect(() => {
    handleBlur();
    if (props.autoFocus) {
      handleFocus();
    }
  }, []);

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (props.handleFocus) {
      props.handleFocus();
    }
  };

  const handleBlur = runOnBlur => {
    if (props.hideLabel) {
      setIsFocused(true);
    } else {
      if (!props.value) {
        setIsFocused(false);
      } else {
        setIsFocused(true);
      }
    }
    if (props.onBlur && runOnBlur) {
      props.onBlur();
    }
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const renderDatePicker = () => {
    return (
      <>
        {Platform.OS == 'android' ? (
          <TouchableOpacity onPress={showDatepicker}>
            <View style={{flexDirection: 'row'}}>
              <Input
                {...props}
                label={() => (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.labelStyle}>{props.label}</Text>
                    {props.isImp ? (
                      <Text style={styles.starIcon}>*</Text>
                    ) : null}
                  </View>
                )}
                editable={false}
                selectionColor={'#3c3c3c'}
                placeholder={'Select ' + props.label}
                disabled={props.disabled}
                onFocus={handleFocus}
                onBlur={() => handleBlur(true)}
                containerStyle={styles.WrapperStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                errorStyle={styles.errorText}
                disabledInputStyle={styles.disabledInputStyle}
                errorMessage={props.showError ? props.errorMessage : null}
                rightIcon={
                  <CustomeIcon
                    name={'Calendar-blue'}
                    size={Dimension.font20}
                    color={colors.FontColor}
                  />
                }
                rightIconContainerStyle={styles.iconStyle}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.WrapperStyle}>
            <Text>{props.label}</Text>
            <TouchableOpacity style={[styles.inputContainerStyle]}>
              <View style={[styles.inputStyle, styles.inputStylesIos]}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date || value}
                  style={{width: '70%'}}
                  mode={mode}
                  maximumDate={maxdate}
                  accentColor={'red'}
                  is24Hour={true}
                  display={display}
                  onChange={onchangeDate}
                />
                <CustomeIcon
                  name={'Calendar-blue'}
                  size={Dimension.font20}
                  color={colors.FontColor}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {show && Platform.OS == 'android' && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            maximumDate={maxdate}
            is24Hour={true}
            display={display}
            onChange={onchangeDate}
          />
        )}
      </>
    );
  };

  if (fromCategoryBrand) {
    if (natureOfBusiness == 3) {
      return renderDatePicker();
    } else {
      return null;
    }
  } else {
    return renderDatePicker();
  }
};

export default CustomeDatePicker;
