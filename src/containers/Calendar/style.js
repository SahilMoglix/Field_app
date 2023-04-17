import {StyleSheet, Platform} from 'react-native';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
const styles = StyleSheet.create({
  dateText: {
    color: colors.FontColor,
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
    marginTop: Dimension.margin12,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: Dimension.padding12,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  TopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingTxt: {
    fontFamily: Dimension.CustomMediumFont,
    fontSize: Dimension.font18,
    color: colors.FontColor,
  },
  headerWrap: {
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
    marginBottom: 10,
    paddingHorizontal: Dimension.padding15,
    paddingVertical: Dimension.padding15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightWrap: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#EAF2FF',
    borderRadius: 4,
  },
  activRightBtn: {
    backgroundColor: '#EAF2FF',
    paddingHorizontal: Dimension.padding8,
    paddingTop: Dimension.padding4,
    paddingBottom: Dimension.padding5,
  },
  InactivRightBtn: {
    paddingHorizontal: Dimension.padding8,
    backgroundColor: '#FFFFFF',
    paddingVertical: Dimension.padding4,
  },
  filterbtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.CtaColor,
    borderRadius: 50,
    paddingHorizontal: Dimension.padding10,
    paddingVertical: Dimension.padding5,
    alignSelf: 'center',
    marginTop: Dimension.margin10,
  },
  filtertxt: {
    fontFamily: Dimension.CustomMediumFont,
    fontSize: Dimension.font16,
    color: colors.CtaColor,
    marginLeft: Dimension.margin6,
    marginTop: 1,
  },
});

export default styles;
