import React, {useState, useRef, useEffect} from 'react';
import {TextInput, Text, StyleSheet, View, Animated} from 'react-native';
import CustomeIcon from './CustomeIcon';
import Dimension from '../Theme/Dimension';
import colors from '../Theme/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyInput = props => {
  const inEditing = useState(false);
  const labelAnim = useRef(new Animated.Value(0)).current;
  const onFocus = e => {
    Animated.spring(labelAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (props.value) {
      onFocus();
    }
  }, [props.value]);

  return (
    <View style={styles.WrapperStyle}>
      <Animated.Text
        style={[
          styles.labelStyle,

          {
            transform: [
              {
                translateY: labelAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -30],
                }),
              },
            ],
          },
          props.IconName
            ? {left: Dimension.padding30}
            : {left: Dimension.padding10},
        ]}>
        {props.label}
      </Animated.Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {props.prefix ? (
          <Text
            style={{
              fontSize: Dimension.font16,
              color: colors.FontColor,
              fontFamily: Dimension.CustomMediumFont,
              marginLeft: Dimension.margin20,
              marginTop: Dimension.margin6,
            }}>
            {props.prefix}
            {' -'}
          </Text>
        ) : null}
        <TextInput
          style={[
            styles.inputStyle,
            props.prefix
              ? {paddingLeft: 0}
              : {paddingLeft: Dimension.padding20},
            props.RightIconName
              ? {paddingRight: Dimension.padding20}
              : {paddingRight: 0},
          ]}
          autoCapitalize="none"
          defaultValue={props.defaultValue}
          value={props.value}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          editable={props.editable}
          maxLength={props.maxLength}
          onFocus={onFocus}
          onSubmitEditing={props.onSubmitEditing}
          //onBlur={(e)=>onBlur(e.target.value)}
          // placeholder={props.Placeholder}
        />
      </View>
      {props.IconName ? (
        <CustomeIcon
          name={props.IconName}
          size={Dimension.font18}
          color={colors.DateBgColor}
          style={styles.iconCss}></CustomeIcon>
      ) : null}
      {props.RightIconView ? (
        <View style={styles.RightIconCss}>{props.RightIconView()}</View>
      ) : null}
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
    position: 'relative',
  },
  labelStyle: {
    fontSize: Dimension.font16,
    color: colors.DateBgColor,
    fontFamily: Dimension.CustomMediumFont,
    // fontWeight:(Platform.OS === 'ios') ? "500" : "",
    marginLeft: Dimension.margin8,
    // marginBottom: Dimension.margin5,
    fontWeight: 'normal',
    position: 'absolute',
    top: Dimension.padding30,
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
    paddingLeft: 0,
    marginBottom: 0,
    flex: 1,
    marginTop: Dimension.margin10,
  },
  iconStyle: {
    width: Dimension.width24,
    height: Dimension.height24,
    paddingRight: 0,
  },
  errorText: {
    fontSize: Dimension.font10,
    color: colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
    //fontWeight:(Platform.OS === 'ios') ? "500" : "",
  },
  iconCss: {
    position: 'absolute',
    top: Dimension.padding30,
    left: Dimension.padding15,
  },
  RightIconCss: {
    position: 'absolute',
    top: Dimension.padding25,
    right: Dimension.padding15,
  },
});
export default MyInput;
