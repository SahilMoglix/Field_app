import {StyleSheet, Platform} from 'react-native';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
const styles = StyleSheet.create({
  dateText: {
    color: colors.FontColor,
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: Dimension.padding12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Dimension.margin12,
  },
  TopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingTxt: {
    fontFamily: Dimension.CustomMediumFont,
    fontSize: Dimension.font18,
    color: colors.FontColor,
    lineHeight: Dimension.font27,
  },
  headerWrap: {
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
    marginBottom: 10,
    padding: Dimension.padding15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAF2FF',
    borderRadius: 4,
  },
  activRightBtn: {
    backgroundColor: '#EAF2FF',
    paddingVertical: Dimension.padding8,
    paddingHorizontal: Dimension.padding10,
  },
  InactivRightBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: Dimension.padding8,
    paddingHorizontal: Dimension.padding10,
  },
  filterbtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.CtaColor,
    borderRadius: 50,
    paddingHorizontal: Dimension.padding15,
    paddingVertical: Dimension.padding5,
    alignItems: 'center',
  },
  filtertxt: {
    fontFamily: Dimension.CustomMediumFont,
    fontSize: Dimension.font14,
    color: colors.CtaColor,
    marginLeft: Dimension.margin7,
    lineHeight: Dimension.font21,
  },
});

export default styles;
