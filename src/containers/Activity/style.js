import {StyleSheet, Platform} from 'react-native';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
import {DIFF_DELETE} from 'jest-diff';
const styles = StyleSheet.create({
  NoDataFoundTxt: {
    alignSelf: 'center',
    marginTop: Dimension.margin10,
    color: '#000',
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
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingHorizontal: Dimension.padding15,
    marginBottom: Dimension.margin10,
    paddingVertical: Dimension.padding10,
    backgroundColor: '#fff',
  },
  searchWraper: {
    marginTop: Dimension.margin5,

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
  crossIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
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
  list: {
    flex: 1,
  },
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: Dimension.padding10,
    borderColor: '#DCE2EA',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    backgroundColor: '#fff',
  },
  imgCon: {},
  placeholder: {
    width: 48,
    height: 48,
    borderRadius: 48,
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  contactDat: {
    paddingLeft: 5,
  },
  txt: {
    fontSize: Dimension.font20,
    fontFamily: Dimension.CustomBoldFont,
    color: colors.FontColor,
  },
  name: {
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomMediumFont,
    color: colors.FontColor,
  },
  phoneNumber: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomRegularFont,
    color: colors.FontColor,
    justifyContent: 'flex-start',
  },
  datetxt: {
    marginLeft: Dimension.margin10,
  },
  BtnWrap: {
    borderWidth: 1,
    borderColor: '#1568E5',
    borderRadius: 50,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: Dimension.padding5,
    paddingVertical: 2,
  },
  TopBtn: {
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.padding6,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  BtnTxt: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
    color: '#1568E5',
  },
  ActiveTopBtn: {
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.padding6,
    backgroundColor: '#1568E5',
    borderRadius: 50,
  },
  ActiveBtnTxt: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
    color: '#fff',
  },
});

export default styles;
