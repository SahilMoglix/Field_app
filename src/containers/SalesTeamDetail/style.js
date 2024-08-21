import {StyleSheet, Platform} from 'react-native';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
import {DIFF_DELETE} from 'jest-diff';
const styles = StyleSheet.create({
  TopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalbgg: {
    margin: 0,
    padding: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'flex-end',
  },
  modalbgView: {
    margin: 0,
    padding: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
    paddingBottom: Dimension.padding20,
    // paddingHorizontal: Dimension.padding15,
    // justifyContent: 'flex-end',
    position: 'relative',
    height: '80%',
    overflow: 'hidden',
  },
  headingTxt: {
    fontFamily: Dimension.CustomMediumFont,
    fontSize: Dimension.font18,
    color: colors.FontColor,
  },
  cancelBtn: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  headerWrap: {
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
    paddingHorizontal: Dimension.padding15,
    marginBottom: Dimension.margin10,
    //paddingVertical: Dimension.padding10,
    backgroundColor: '#fff',
    paddingVertical:
      Platform.OS === 'ios' ? Dimension.padding15 : Dimension.padding10,
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
    borderTopColor: '#DCE2EA',
    borderToptWidth: 1,
  },

  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: Dimension.padding10,
    borderColor: '#DCE2EA',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    // borderTopWidth: 0.5,
    marginHorizontal: Dimension.margin8,
    paddingTop: Dimension.padding20,

    backgroundColor: '#fff',
  },
  contactParentView: {
    // flex: 1,
    flexDirection: 'row',
    padding: Dimension.padding10,
    borderColor: '#DCE2EA',
    borderBottomWidth: 1,
    marginHorizontal: Dimension.margin8,
  },

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
    position: 'relative',
  },
  placeholderCopy: {
    width: 35,
    height: 35,
    borderRadius: 35,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    position: 'relative',
    // paddingRight: Dimension.padding15,
  },

  topFilter: {
    height: Dimension.height30,
    width: Dimension.width110,
    borderColor: '#1568E5',
    borderWidth: Dimension.borderwidth1,
    borderRadius: Dimension.borderRadius40,
  },
  contactDat: {
    paddingLeft: Dimension.padding10,
    width: '75%',
  },
  contactDataDg: {
    padding: Dimension.padding15,
    // width: '75%',
  },
  topView: {
    // backgroundColor: 'red',
    borderBottomColor: '#0000000D',
    borderBottomWidth: 2,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.0,
    elevation: 20,
  },

  txt: {
    fontSize: Dimension.font20,
    fontFamily: Dimension.CustomBoldFont,
    color: colors.FontColor,
  },
  txtCopy: {
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomBoldFont,
    color: colors.FontColor,
  },
  name: {
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomMediumFont,
    color: colors.FontColor,
  },
  numberr: {
    fontSize: Dimension.font20,
    fontFamily: Dimension.CustomMediumFont,
    color: colors.FontColor,
  },
  phoneNumber: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomRegularFont,
    color: colors.FontColor,
    justifyContent: 'flex-start',
  },
  redtxt: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomRegularFont,
    color: '#ED6A60',
    justifyContent: 'flex-start',
  },

  BtnTxt: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
    color: colors.CtaColor,
  },
  ActiveTopBtn: {
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.padding6,
    backgroundColor: colors.CtaColor,
    borderRadius: 50,
  },
  ActiveBtnTxt: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
    color: '#fff',
  },
  modalWrap: {
    margin: 0,
    padding: 0,
    justifyContent: 'flex-end',
  },

  confirmCta: {
    width: '100%',
    paddingVertical: Dimension.padding16,
    borderRadius: Dimension.borderRadius15,
    backgroundColor: colors.RedThemeColor,
    marginBottom: Dimension.margin5,
  },
  confirmCtaText: {
    color: colors.WhiteColor,
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomBoldFont,
    textAlign: 'center',
  },

  ModalContainer: {
    backgroundColor: '#fff',
    // justifyContent: 'flex-end',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    paddingHorizontal: Dimension.padding8,
    paddingVertical: Dimension.padding20,
    //position: 'absolute',
    // bottom: Dimension.padding10,
    width: '100%',
    left: Dimension.padding10,
  },
  fltrtxt: {
    color: '#1568E5',
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
  },
  ModalBg: {
    padding: Dimension.padding10,
    margin: 0,
    backgroundColor: 'rgba(0,0,0,.4)',
    // position: 'relative',
    justifyContent: 'flex-end',
  },
  ModalHeading: {
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomMediumFont,
    color: colors.FontColor,
    textAlign: 'center',
  },

  modalbg: {
    backgroundColor: '#FFFFFF',
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    height: '50%',
  },
  optionText: {
    fontSize: 20,
    marginVertical: 10,
  },

  InputWrap: {
    paddingTop: Dimension.padding20,
    paddingBottom: Dimension.padding50,
  },

  arrowBtn: {
    position: 'absolute',
    right: 10,
    width: Dimension.width40,
    height: Dimension.height40,
    top: 20,
    alignItems: 'flex-end',
    // backgroundColor: '#272727',
    borderRadius: Dimension.height36,
    height: Dimension.height36,
    width: Dimension.width36,
    justifyContent: 'center',
  },
  arrwTxt: {
    color: '#FFFFFF',
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomMediumFont,
    alignSelf: 'center',
  },
  filterbtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.CtaColor,
    borderRadius: 50,
    paddingHorizontal: Dimension.padding20,
    // paddingVertical: Dimension.padding5,
    alignSelf: 'center',
    marginVertical: 5,
  },
  filtertxt: {
    fontFamily: Dimension.CustomMediumFont,
    fontSize: Dimension.font14,
    color: colors.CtaColor,
    marginLeft: Dimension.margin6,
    marginTop: 1,
  },
});

export default styles;
