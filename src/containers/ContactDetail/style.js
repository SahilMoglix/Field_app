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
    marginLeft: Dimension.margin10,
  },
  blueHeadingtxt: {
    fontFamily: Dimension.CustomRegularFont,
    fontSize: Dimension.font14,
    color: colors.CtaColor,
    marginLeft: Dimension.margin10,
  },
  headerWrap: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingHorizontal: Dimension.padding15,
    paddingVertical:
      Platform.OS == 'ios' ? Dimension.padding15 : Dimension.padding10,
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
    elevation: 0,
    position: 'relative',
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

  ActivityBtnText: {
    fontFamily: Dimension.CustomMediumFont,
    color: colors.CtaColor,
    fontSize: Dimension.font14,
    alignSelf: 'flex-start',
  },

  //add User form css
  addPhotoBtn: {
    alignItems: 'center',
  },
});
export default styles;
