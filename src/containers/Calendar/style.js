import { StyleSheet,Platform} from "react-native";
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
const styles = StyleSheet.create({
  
  TopHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
  },
  headingTxt:{
    fontFamily:Dimension.CustomMediumFont,
    fontSize:Dimension.font18,
    color:colors.FontColor,
  },
  headerWrap:{
    shadowColor: "#000",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingHorizontal:Dimension.padding15,
    //marginBottom:Dimension.margin10,
    paddingVertical:Dimension.padding15,
    backgroundColor:"#fff",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  rightWrap:{
    flexDirection:"row",
    borderWidth:1,
    borderColor:"#EAF2FF",
    borderRadius:4,
    

  },
  activRightBtn:{
    backgroundColor:"#EAF2FF",
    paddingHorizontal:Dimension.padding8,
    paddingVertical:Dimension.padding4
  },
  InactivRightBtn:{
    paddingHorizontal:Dimension.padding8,
    backgroundColor:"#FFFFFF",
    paddingVertical:Dimension.padding4
  },
  filterbtn:{
    flexDirection:"row",
    borderWidth:1,
    borderColor:colors.CtaColor,
    borderRadius:50,
    paddingHorizontal:Dimension.padding20,
    paddingVertical:Dimension.padding5,
    alignSelf:'center',
    marginTop:Dimension.margin10
  },
  filtertxt:{ fontFamily:Dimension.CustomMediumFont,
    fontSize:Dimension.font16,
    color:colors.CtaColor,
    marginLeft:Dimension.margin6
  }
});

export default styles;
