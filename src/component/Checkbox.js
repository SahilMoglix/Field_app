import React, {useState} from 'react';
import {CheckBox} from 'react-native-elements';
import Dimension from '../Theme/Dimension';
import colors from '../Theme/Colors';
import {StyleSheet, View, Text} from 'react-native';
import CustomeIcon from './CustomeIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const DotCheckbox = props => {
  const {data, onCheck, selectedValues, searchvalue, from, horizontalView} =
    props;
  const isAllSelected = selectedValues?.length === data?.length - 1;

  return (
    <View style={from === 'addContact' ? styles.WrapperStyle : null}>
      {from === 'addContact' ? (
        <View style={{flexDirection: 'row'}}>
          <CustomeIcon
            name={props.IconName}
            size={Dimension.font18}
            color={colors.DateBgColor}
            style={styles.iconCss}
          />
          <Text style={styles.labelStyle}> {props.label}</Text>
        </View>
      ) : null}
      <View
        style={
          horizontalView
            ? {flexDirection: 'row', marginLeft: -10, flexWrap: 'wrap'}
            : {flexDirection: 'column'}
        }>
        {(data || [])
          .filter(item =>
            item?.label
              ?.toString()
              .toLowerCase()
              .includes(searchvalue?.toLowerCase()),
          )
          .map(item => (
            <CheckBox
              title={item?.title}
              key={item?.key}
              onPress={() => onCheck(item?.key)}
              checkedIcon={
                <Icon
                  name="checkbox-marked"
                  size={Dimension.font20}
                  color={colors.CtaColor}
                />
              }
              uncheckedIcon={
                <Icon
                  name="checkbox-blank-outline"
                  size={Dimension.font20}
                  color={colors.FontColor}
                />
              }
              checked={
                item?.key === 'All'
                  ? isAllSelected
                  : selectedValues.includes(item.key)
              }
              // checked={selectedValues.includes(item.key)}
              textStyle={styles.checkboxTitle}
              fontFamily={Dimension.CustomMediumFont}
              wrapperStyle={styles.checkboxwrapper}
              containerStyle={styles.checkboxContainer}
            />
          ))}
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
    marginBottom: Dimension.margin10,
    position: 'relative',
  },
  labelStyle: {
    fontSize: Dimension.font16,
    color: colors.DateBgColor,
    fontFamily: Dimension.CustomMediumFont,
    // fontWeight:(Platform.OS === 'ios') ? "500" : "",
    marginLeft: Dimension.margin8,
    fontWeight: 'normal',
  },
  checkboxTitle: {
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontWeight: 'normal',
    marginLeft: Dimension.margin10,
  },
  checkboxwrapper: {
    backgroundColor: colors.transparent,
    paddingHorizontal: Dimension.padding10,
    marginBottom: Dimension.padding10,
  },
  withMargincheckboxwrapper: {
    backgroundColor: colors.transparent,
    marginBottom: Dimension.margin25,
  },
  checkboxContainer: {
    backgroundColor: colors.transparent,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderWidth: 0,
    borderColor: colors.WhiteColor,
    width: 'auto',
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default DotCheckbox;
