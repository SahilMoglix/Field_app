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
    marginBottom:Dimension.margin10,
    paddingVertical:Dimension.padding10,
    backgroundColor:"#fff"
  },
});

export default styles;
