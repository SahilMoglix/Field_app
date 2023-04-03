import React, {useEffect} from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';

const NoDataFound = props => {
  return (
    <View style={styles.NoInvoiceWrap}>
      <Image
        style={{width: 58, height: 58}}
        source={require('../assets/images/Nodatafound.png')}
        resizeMode={'cover'}
      />
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
    height: '100%',
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
