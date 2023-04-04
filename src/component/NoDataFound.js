import React, {useEffect} from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const NoDataFound = props => {
  return (
    <View style={styles.NoInvoiceWrap}>
      {/* <Image
        style={{width: 58, height: 58}}
        source={require('../assets/images/Nodatafound.png')}
        resizeMode={'cover'}
      /> */}
      <Text style={styles.NoInvoiceTxt}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  NoInvoiceTxt: {
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomMediumFont,
    color: '#8E8E93',
    textAlign: 'center',
    marginVertical: Dimension.margin10,
  },
  NoInvoiceWrap: {
    paddingHorizontal: Dimension.padding20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    //height: SCREEN_HEIGHT - 150,
    marginVertical: 50,
    alignSelf: 'center',
    alignContent: 'center',
    // backgroundColor: '#ccc',
  },
  NoInvoiceSmallTxt: {
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.FontColor,
    textAlign: 'center',
    marginBottom: Dimension.margin10,
  },
});

export default NoDataFound;
