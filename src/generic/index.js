import colors from '../Theme/Colors';
import Dimension from '../Theme/Dimension';
import React, {useRef} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export const toastConfig = {
  success: ({text1, text2, onPress, ...rest}) => (
    <View style={styles.successView}>
      <Text style={styles.successText}>{text1}</Text>
      {text2 ? <Text style={styles.successText2}>{text2}</Text> : null}
    </View>
  ),
  error: ({text1, text2, onPress, ...rest}) => (
    <View style={styles.errorView}>
      <Text style={styles.errorText}>{text1}</Text>
      {text2 ? <Text style={styles.errorText2}>{text2}</Text> : null}
    </View>
  ),
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: Dimension.CustomBoldFont,
  },
  text3: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successText: {
    color: colors.FontColor,
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomMediumFont,
  },
  successText2: {
    color: colors.FontColor,
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomMediumFont,
    marginTop: Dimension.margin8,
  },
  errorText: {
    color: colors.FontColor,
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomMediumFont,
  },
  errorText2: {
    color: colors.FontColor,
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomMediumFont,
    marginTop: Dimension.margin8,
  },
  successView: {
    //height: 53,
    width: '95%',
    backgroundColor: '#E2FCD0',
    borderRadius: 10,
    paddingVertical: Dimension.padding12,
    paddingHorizontal: Dimension.padding25,
    shadowColor: '#E2FCD0',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
    marginVertical: 10,
  },
  errorView: {
    //  height: 53,
    width: '95%',
    backgroundColor: '#D0D0D0',
    borderRadius: 5,
    paddingVertical: Dimension.padding12,
    paddingHorizontal: Dimension.padding25,
    shadowColor: '#D0D0D0',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
    marginVertical: 10,
  },
});
