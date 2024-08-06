import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import { colors } from 'react-native-elements';

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
    paddingVertical: Dimension.padding10,
    backgroundColor: '#fff',
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

  activeBackground: {
    backgroundColor: Colors.CallingBgColor,
    paddingVertical: Dimension.padding15,
    paddingHorizontal: Dimension.padding20,
  },
  inactiveBackground: {
    backgroundColor: '#fff',
    paddingVertical: Dimension.padding15,
    paddingHorizontal: Dimension.padding20,
  },
  LeftInActiveTxt: {
    fontSize: Dimension.font14,
    color: Colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  LeftActiveTxt: {
    fontSize: Dimension.font14,
    color: Colors.CtaColor,
    fontFamily: Dimension.CustomMediumFont,
  },

  MidWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: deviceHeight,
  },
  leftPart: {
    flex: 4,
    borderRightColor: Colors.borderColor,
    borderRightWidth: 1,
    backgroundColor: '#fff',
    paddingTop: Dimension.padding20,
    height: deviceHeight,
  },
  rightPart: {
    flex: 6.5,

    paddingTop: Dimension.padding25,
    height: deviceHeight,
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
  
    marginHorizontal:Dimension.margin5,
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    paddingHorizontal: Dimension.padding10,
    height: Dimension.height40,
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  searchIcon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 10 : 10,
    left: Platform.OS === 'ios' ? 10 : 10,
  },
  SearchInputCss: {
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    height: Dimension.height40,
    width: '90%',
    paddingHorizontal: Dimension.padding25,
  },
  seacrhIcon: {
    position: 'absolute',
    top: Dimension.padding12,
    right: Dimension.padding10,
    fontSize: Dimension.font22,
    color: colors.FontColor,
  },
});
export default styles;
