import { StyleSheet,Platform} from "react-native";
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
const styles = StyleSheet.create({
  button: {
    color: "#0000FF",
    width: 100,
    height: 100,
  },
  logoWrap:{
    marginTop:Dimension.padding80,
    marginBottom:Dimension.margin40
    
  },
  AppName: Platform.OS === 'ios' ? {
    fontFamily:Dimension.CustomBoldFont,
    color:colors.FontColor,
    fontSize:Dimension.font20,
    alignSelf:"center",
    marginTop:Dimension.margin20,
    fontWeight:"700",
  }:{
    fontFamily:Dimension.CustomBoldFont,
    color:colors.FontColor,
    fontSize:Dimension.font20,
    alignSelf:"center",
    marginTop:Dimension.margin20,
  },
  WrapperStyle: {
    marginBottom:0,
    paddingHorizontal: 0,
  },
  labelStyle: {
    fontSize: Dimension.font14,
    color: colors.labelColor,
    fontFamily: Dimension.CustomRegularFont,
   // marginLeft: Dimension.margin12,
    marginBottom: Dimension.margin5,
    fontWeight: 'normal',
  },
  
  loginHeading:{
    fontSize: Dimension.font16,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
    marginBottom:Dimension.margin15
  },
  imageWrap:{
    marginTop:Dimension.margin50
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: colors.graySahde1,
    borderRadius: 4,
    paddingHorizontal: Dimension.padding12,
    height: Dimension.height40,
    paddingBottom: 0,
    marginBottom:0
   
  },
 
  inputStyle: {
    fontSize: Dimension.font14,
    color: colors.FontColor,
    fontFamily: Dimension.CustomRegularFont,
   paddingLeft: 0,
  },
  iconStyle: {
    width: Dimension.width24,
    height: Dimension.height24,
    paddingRight: 0,
  },
  iconBtnstyle:{
    paddingRight:0
  },
  errorText: {
    fontSize: Dimension.font10,
    color: colors.BrandColor,
    fontFamily: Dimension.CustomMediumFont,
  },
  
  btntxt: Platform.OS === 'ios' ?{
    color: colors.WhiteColor,
    fontSize: Dimension.font14,
    fontFamily:Dimension.CustomBoldFont,
    fontWeight:"700",
    
  }:{
    color: colors.WhiteColor,
    fontSize: Dimension.font14,
    fontFamily:Dimension.CustomBoldFont,
    alignSelf:'center'
  },
  btnStyle:{backgroundColor:'#272727',borderRadius:8,
    alignItems:"center",justifyContent:"center",alignContent:"center",
  paddingHorizontal:Dimension.padding20, height:Dimension.height45,},
  btnContainer:{
    backgroundColor:colors.CtaColor,borderRadius:8,alignItems:"center",
    justifyContent:"center",alignContent:"center",
    alignSelf:"center",
    //paddingHorizontal:Dimension.padding30,
    height:Dimension.height45,
   marginTop:Dimension.margin100
 },
 formWrap:{
   paddingHorizontal:Dimension.padding20,
   position:"relative",
   bottom:0,
   width:"100%",
   justifyContent:"flex-end",
   
   
 },
});

export default styles;
