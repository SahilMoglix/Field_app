import React, {useState} from 'react';
import Dimension from '../Theme/Dimension';
import colors from '../Theme/Colors';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import CustomeIcon from './CustomeIcon';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {ScrollView} from 'react-native-gesture-handler';

const DropDown = props => {
  const {onValueChange, IconName, label, value, options} = props;

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <Menu
      visible={visible}
      anchor={
        <TouchableOpacity onPress={showMenu} style={styles.dropDownBtn}>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <CustomeIcon
              name={IconName}
              size={Dimension.font18}
              color={colors.DateBgColor}></CustomeIcon>
            <Text style={styles.labelStyle}>{value || label}</Text>
          </View>
          <CustomeIcon
            name="icon_Below"
            size={Dimension.font18}
            color={colors.FontColor}
            style={styles.DropDownIcon}></CustomeIcon>
        </TouchableOpacity>
      }
      onRequestClose={hideMenu}
      style={[
        styles.dropDownWrap,
        options.length ? {height: 150} : {height: 0},
      ]}>
      <ScrollView>
        {options.map((item, itemIndex) => (
          <MenuItem
            onPress={() => {
              onValueChange(item.value, item.label);
              hideMenu();
            }}
            key={itemIndex}
            textStyle={styles.dropdownval}
            style={styles.dropDowninnerWrap}>
            {item.label}
          </MenuItem>
        ))}
      </ScrollView>
    </Menu>
  );
};
const styles = StyleSheet.create({
  dropDownBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 5,
    paddingHorizontal: Dimension.padding15,
    paddingVertical: Dimension.padding12,
    height: Dimension.height70,
    marginBottom: Dimension.margin10,
    justifyContent: 'space-between',
    width: '100%',
  },
  dropDownWrap: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 4,
    backgroundColor: '#fff',
    width: '92%',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginTop: Dimension.margin70,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginVertical: 0,
  },
  dropdownval: {
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 10,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 0.5,

    paddingVertical: Dimension.padding5,
    marginHorizontal: 5,
  },
  labelStyle: {
    fontSize: Dimension.font16,
    color: colors.DateBgColor,
    fontFamily: Dimension.CustomMediumFont,
    // fontWeight:(Platform.OS === 'ios') ? "500" : "",
    marginLeft: Dimension.margin8,

    fontWeight: 'normal',
    position: 'absolute',
    top: Dimension.padding2,
    paddingLeft: Dimension.padding20,
  },

  dropDowninnerWrap: {
    width: '100%',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginVertical: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  DropDownIcon: {
    marginTop: Dimension.margin20,
  },
});

export default DropDown;
