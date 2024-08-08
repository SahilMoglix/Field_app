import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import {colors} from 'react-native-elements';

const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  TopHeader: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  headingTxt: {
    fontFamily: Dimension.CustomMediumFont,
    fontSize: Dimension.font18,
    color: Colors.FontColor,
    marginLeft: Dimension.margin10,
    marginTop: 3,
  },
  headerWrap: {
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingHorizontal: Dimension.padding15,
    marginBottom: Dimension.margin5,
    height: Dimension.height40,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  bottomAction: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
    padding: Dimension.padding15,
    backgroundColor: Colors.WhiteColor,
    position: 'absolute',
    width: '100%',
    bottom: 0,

    flexDirection: 'row',
  },
  leftTextBg: {
    paddingVertical: Dimension.padding15,
    paddingHorizontal: Dimension.padding15,
    paddingRight: Dimension.padding10,
  },
  leftActiveBackground: {
    backgroundColor: Colors.CallingBgColor,
  },
  leftInactiveBackground: {
    backgroundColor: '#fff',
  },
  leftText: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
  },
  LeftInActiveTxt: {
    color: Colors.graySahde1,
  },
  LeftActiveTxt: {
    color: Colors.CtaColor,
  },

  MidWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: deviceHeight,
  },
  leftPart: {
    flex: 0.35,
    borderRightColor: Colors.borderColor,
    borderRightWidth: 1,
    backgroundColor: '#fff',
    height: deviceHeight,
  },
  rightPart: {
    flex: 0.65,
    paddingTop: Dimension.padding5,
    height: deviceHeight,
    paddingHorizontal: Dimension.padding10,
  },

  acceptCtabtn: {
    flex: 5,
    backgroundColor: Colors.CtaColor,
    borderRadius: 50,
    paddingVertical: Dimension.padding12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Dimension.margin10,
    shadowColor: 'rgba(21, 104, 229, .80)',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
  },
  acceptCtaTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.WhiteColor,
    fontSize: Dimension.font16,
  },
  rejectCtabtn: {
    flex: 5,
    backgroundColor: Colors.brandColor,
    borderRadius: 4,
    paddingVertical: Dimension.padding12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectCtaTxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.WhiteColor,
    fontSize: Dimension.font16,
  },
  cancelBtn: {
    flex: 5,
    backgroundColor: Colors.WhiteColor,
    borderRadius: 4,
    paddingVertical: Dimension.padding12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canceltxt: {
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.FontColor,
    fontSize: Dimension.font16,
  },
  tooltipWrap: {
    backgroundColor: '#000',
    marginTop: 10,
    position: 'relative',
    borderRadius: 4,
    marginHorizontal: Dimension.margin15,
    padding: 15,
  },
  arrow: {
    borderLeftColor: '#fff',
    borderBottomColor: '#000',
    borderRightColor: '#fff',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 8,
    width: 0,
    height: 0,
    position: 'absolute',
    right: 15,
    top: -8,
  },
  tooltipTxt: {
    fontFamily: Dimension.CustomRegularFont,
    color: Colors.WhiteColor,
    fontSize: Dimension.font10,
    marginBottom: Dimension.margin8,
  },
  tooltipBoldTxt: {
    fontFamily: Dimension.CustomMediumFont,
  },
  searchWraper: {
    marginHorizontal: Dimension.margin5,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    paddingHorizontal: Dimension.padding10,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    height: Dimension.height40,
  },
  SearchInputCss: {
    fontSize: Dimension.font12,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    flex: 1,
    marginLeft: 5,
    lineHeight: Dimension.font18,
    height: '100%',
    backgroundColor: 'transparent',
  },
  seacrhIcon: {
    position: 'absolute',
    top: Dimension.padding12,
    right: Dimension.padding10,
    fontSize: Dimension.font22,
    color: colors.FontColor,
  },
  allButton: {
    flexDirection: 'row',
    marginLeft: Dimension.margin10,
    marginBottom: Dimension.margin10,
  },
});
export default styles;
