import {StyleSheet, Platform} from 'react-native';
import colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';

const styles = StyleSheet.create({
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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingHorizontal: Dimension.padding15,
    //marginBottom: Dimension.margin10,
    paddingVertical: Dimension.padding10,
    backgroundColor: '#fff',
  },
  ScrollViewCss: {
    backgroundColor: colors.WhiteColor,
    paddingHorizontal: Dimension.padding15,
    marginTop: Dimension.margin8,
  },
  UserDeatilCardWrapper: {
    borderRadius: 0,

    borderWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderLeftColor: colors.WhiteColor,
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.padding30,
    margin: 0,
    //marginBottom:Dimension.margin10,
    elevation: 0,
    //   justifyContent:"center",
    //alignItems:"center",
    position: 'relative',
    //backgroundColor:"#ccc"
  },
  NameCss: {
    fontFamily: Dimension.CustomMediumFont,
    color: colors.FontColor,
    fontSize: Dimension.font20,
    marginVertical: Dimension.margin10,
    alignSelf: 'center',
  },
  UserimgContainer: {
    width: Dimension.width80,
    height: Dimension.height80,
    alignSelf: 'center',
  },
  UserImgIcon: {
    width: Dimension.width80,
    height: Dimension.height80,
    borderRadius: Dimension.height80,
  },
  UserBtnStyle: {
    backgroundColor: colors.CallingBgColor,
    borderRadius: 5,
    width: Dimension.width50,
    height: Dimension.height40,
  },
  UserBtnStyle1: {
    backgroundColor: colors.WhatsappBgColor,
    borderRadius: 5,
    width: Dimension.width50,
    height: Dimension.height40,
    marginLeft: Dimension.margin10,
  },
  UserBtnStyle2: {
    backgroundColor: colors.CallingBgColor,
    borderRadius: 5,
    width: Dimension.width50,
    height: Dimension.height40,
    marginLeft: Dimension.margin10,
  },
  UserBtnStyle3: {
    backgroundColor: colors.CallingBgColor,
    borderRadius: 5,
    paddingHorizontal: Dimension.padding1,
    paddingVertical: Dimension.padding10,
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  ActivityBtnText: {
    fontFamily: Dimension.CustomMediumFont,
    color: colors.CtaColor,
    fontSize: Dimension.font14,
    alignSelf: 'flex-start',
    //fontWeight:"normal"
  },
  EventCardWrapper: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.borderColor,
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.padding30,
    margin: 0,
    marginBottom: Dimension.margin10,
  },
  WithoutPadEventCardWrapper: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.borderColor,
    paddingHorizontal: Dimension.padding15,
    paddingVertical: Dimension.padding5,
    margin: 0,
    marginBottom: Dimension.margin10,
  },
  EventCardInnerWrapper: {
    backgroundColor: '#fff',
  },
  eventBtn: {flexDirection: 'row'},

  eventBtnBlueTxt: {
    fontFamily: Dimension.CustomMediumFont,
    color: colors.CtaColor,
    fontSize: Dimension.font16,
    marginBottom: Dimension.margin8,
    marginLeft: Dimension.margin8,
  },

  //add User form css
  addPhotoBtn: {
    alignItems: 'center',
  },
  addPhotoText: {
    color: colors.CtaColor,
    fontFamily: Dimension.CustomMediumFont,
    fontSize: Dimension.font14,
    marginTop: Dimension.margin15,
  },

  WrapperStyle: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 5,
    paddingHorizontal: Dimension.padding20,
    paddingVertical: Dimension.padding12,
    height: Dimension.height70,
    //backgroundColor:'#aaa',
    marginBottom: Dimension.margin10,
  },
  labelStyle: {
    fontSize: Dimension.font16,
    color: colors.DateBgColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin8,
    // marginBottom: Dimension.margin5,
    fontWeight: 'normal',
    position: 'absolute',
    left: 50,
    top: 30,
  },

  inputContainerStyle: {
    paddingBottom: 0,
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingVertical: 0,
    paddingTop: 0,
  },

  inputStyle: {
    fontSize: Dimension.font16,
    color: colors.FontColor,
    fontFamily: Dimension.CustomMediumFont,
    paddingLeft: 0,
    marginBottom: 0,
    paddingLeft: Dimension.padding20,
  },
  iconStyle: {
    width: Dimension.width24,
    height: Dimension.height24,
    paddingRight: 0,
  },
  errorText: {
    fontSize: Dimension.font10,
    color: colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  AddChildWrap: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    paddingHorizontal: Dimension.padding15,
    paddingVertical: Dimension.padding30,
    flexDirection: 'row',
    marginBottom: Dimension.margin30,
  },
  AddChildBtntxt: {
    fontSize: Dimension.font16,
    color: colors.CtaColor,
    fontFamily: Dimension.CustomMediumFont,
    marginLeft: Dimension.margin10,
  },
  btntxt:
    Platform.OS === 'ios'
      ? {
          color: colors.WhiteColor,
          fontSize: Dimension.font14,
          fontFamily: Dimension.CustomBoldFont,
          fontWeight: '700',
        }
      : {
          color: colors.WhiteColor,
          fontSize: Dimension.font14,
          fontFamily: Dimension.CustomBoldFont,
        },
  btnStyle: {
    backgroundColor: colors.CtaColor,
    borderRadius: 50,
    paddingHorizontal: Dimension.padding30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    //marginBottom: Dimension.margin20,
  },

  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  CancelbtnStyle: {
    backgroundColor: '#FAFAFA',
    // borderRadius: 50,
    // paddingHorizontal: Dimension.padding30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  Cancelbtntxt:
    Platform.OS === 'ios'
      ? {
          color: colors.CtaColor,
          fontSize: Dimension.font14,
          fontFamily: Dimension.CustomBoldFont,
          fontWeight: '700',
        }
      : {
          color: colors.CtaColor,
          fontSize: Dimension.font14,
          fontFamily: Dimension.CustomBoldFont,
        },

  BtnWrapper: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    shadowColor: '##0000000D',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flex: 1,
    paddingVertical: Dimension.padding20,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
});
export default styles;
