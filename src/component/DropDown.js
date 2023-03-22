import React, {useState} from 'react';
import {CheckBox} from 'react-native-elements';
import Dimension from '../Theme/Dimension';
import colors from '../Theme/Colors';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import CustomeIcon from './CustomeIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
const DropDown = props => {
  const {data, onCheck, toggleCheck, value} = props;
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
              name="Designation-grey"
              size={Dimension.font18}
              color={colors.DateBgColor}></CustomeIcon>
            <Text style={styles.labelStyle}>Show Menu</Text>
          </View>
          <CustomeIcon
            name="icon_Below"
            size={Dimension.font18}
            color={colors.FontColor}
            style={styles.DropDownIcon}></CustomeIcon>
        </TouchableOpacity>
      }
      onRequestClose={hideMenu}
      style={styles.dropDownWrap}>
      {/* {options.map((item, itemIndex) => (
        <MenuItem
            onPress={() => {
                onValueChange(item.value, item.label);
                hideMenu();
            }}
            textStyle={styles.dropdownval}
            style={styles.dropDowninnerWrap}>
            {item.label}
        </MenuItem>
         ))} */}
      <MenuItem
        onPress={hideMenu}
        textStyle={styles.dropdownval}
        style={styles.dropDowninnerWrap}>
        Menu item 1
      </MenuItem>
      <MenuItem
        onPress={hideMenu}
        textStyle={styles.dropdownval}
        style={styles.dropDowninnerWrap}>
        Menu item 2
      </MenuItem>

      <MenuItem
        onPress={hideMenu}
        textStyle={styles.dropdownval}
        style={styles.dropDowninnerWrap}>
        Menu item 4
      </MenuItem>
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
    //backgroundColor:'#aaa',
    marginBottom: Dimension.margin10,
    justifyContent: 'space-between',
    width: '100%',
    //  backgroundColor: '#ccc',
  },
  dropDownWrap: {
    borderWidth: 1,
    borderColor: colors.eyeIcon,
    borderRadius: 4,
    backgroundColor: '#fff',
    width: '70%',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginTop: Dimension.margin35,
    //padding:Dimension.padding10
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginVertical: 0,
  },
  dropdownval: {
    fontSize: Dimension.font12,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomColor: colors.eyeIcon,
    borderBottomWidth: 0.5,
    //width: '100%',
    paddingVertical: Dimension.padding5,
    marginHorizontal: 5,
    //backgroundColor:"#000"
    // width:"100%"
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
    //height: Dimension.height20,
  },
  DropDownIcon: {
    marginTop: Dimension.margin20,
  },
});

export default DropDown;
