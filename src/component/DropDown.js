import React, {useState} from 'react';
import Dimension from '../Theme/Dimension';
import colors from '../Theme/Colors';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from 'react-native';
import CustomeIcon from './CustomeIcon';
import Modal from 'react-native-modal';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const DropDown = props => {
  const {onValueChange, IconName, label, value, options} = props;

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <View style={{position: 'relative'}}>
      {value ? <Text style={styles.labelStyle1}>{label}</Text> : null}
      <TouchableOpacity onPress={showMenu} style={styles.dropDownBtn}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <CustomeIcon
            name={IconName}
            size={Dimension.font18}
            color={colors.DateBgColor}></CustomeIcon>
          <Text style={value ? styles.valuestyle : styles.labelStyle}>
            {value || label}
          </Text>
        </View>
        <CustomeIcon
          name="icon_Below"
          size={Dimension.font18}
          color={colors.FontColor}
          style={styles.DropDownIcon}></CustomeIcon>
      </TouchableOpacity>
      <Modal
        isVisible={visible}
        onBackButtonPress={() => hideMenu()}
        onBackdropPress={() => hideMenu()}
        style={{backgroundColor: '#fff'}}
        backdropColor={'rgba(0,0,0,0.3)'}
        backdropOpacity={0.3}>
        <View style={{backgroundColor: '#fff', flex: 1}}>
          {options.map((item, itemIndex) => (
            <TouchableOpacity
              key={itemIndex}
              onPress={() => {
                onValueChange(item.value, item.label);
                hideMenu();
              }}
              style={styles.dropDowninnerWrap}>
              <Text style={styles.dropdownval}> {item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
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
    backgroundColor: colors.borderColor,
    width: '100%',
    maxWidth: '96%',
    // shadowColor: 'rgba(0,0,0,0.5)',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // elevation: 2,
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
    borderBottomColor: colors.FontColor,
    borderBottomWidth: 0.5,
    //backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    // minWidth: '100%',
    width: SCREEN_WIDTH - Dimension.margin40,

    paddingVertical: Dimension.padding5,
    marginHorizontal: 5,
    marginVertical: 0,
  },
  valuestyle: {
    fontSize: Dimension.font16,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    // fontWeight:(Platform.OS === 'ios') ? "500" : "",
    marginLeft: Dimension.margin8,
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
  labelStyle1: {
    fontSize: Dimension.font16,
    color: colors.DateBgColor,
    fontFamily: Dimension.CustomMediumFont,
    // fontWeight:(Platform.OS === 'ios') ? "500" : "",
    marginLeft: Dimension.margin8,
    fontWeight: 'normal',
    position: 'absolute',
    top: Dimension.padding8,
    paddingLeft: Dimension.padding20,
    left: 0,
    zIndex: 9999,
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
