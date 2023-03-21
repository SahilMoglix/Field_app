import React, {useState} from 'react';
import {CheckBox} from 'react-native-elements';
import Dimension from '../Theme/Dimension';
import colors from '../Theme/Colors';
import {StyleSheet} from 'react-native';
import CustomeIcon from './CustomeIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const DotCheckbox = props => {
  const {data, onCheck, toggleCheck, value} = props;

  return (
    <>
      {(data || []).map((_, i) => (
        <CheckBox
          title={_.title}
          key={_.key}
          // onPress={() => onCheck(_.key)}
          checkedIcon={
            <Icon
              name={'radiobox-marked'}
              size={Dimension.font20}
              color={colors.CtaColor}
            />
          }
          uncheckedIcon={
            <Icon
              name={'radiobox-blank'}
              size={Dimension.font20}
              color={colors.FontColor}
            />
          }
          checked={_.key == value ? true : false}
          textStyle={styles.checkboxTitle}
          fontFamily={Dimension.CustomMediumFont}
          wrapperStyle={styles.checkboxwrapper}
          containerStyle={styles.checkboxContainer}
        />
      ))}
      {/* <CheckBox
          title={props.title}
          //onPress={() => onCheck(_.key)}
          checkedIcon={
            <Icon
              name={'radiobox-marked'}
              size={Dimension.font20}
              color={colors.CtaColor}
            />
          }
          uncheckedIcon={
            <Icon
              name={'radiobox-blank'}
              size={Dimension.font20}
              color={colors.FontColor}
            />
          }
          //checked={_.key == value ? true : false}
          textStyle={styles.checkboxTitle}
          fontFamily={Dimension.CustomMediumFont}
          wrapperStyle={
             styles.checkboxwrapper
          }
          containerStyle={styles.checkboxContainer}
        /> */}
    </>
  );
};
const styles = StyleSheet.create({
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
  },
});

export default DotCheckbox;
