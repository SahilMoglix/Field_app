
import React, { useState, useRef, useEffect } from "react";
import { TextInput, Text, StyleSheet, View, Animated } from "react-native";
import CustomeIcon from './CustomeIcon';
import Dimension from '../../Theme/Dimension';  
import colors from '../../Theme/Colors';  
const styles = StyleSheet.create({
    WrapperStyle: {
      borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 5,
        paddingHorizontal: Dimension.padding20,
        paddingVertical:Dimension.padding12,
        height: Dimension.height70,
        //backgroundColor:'#aaa',
        marginBottom:Dimension.margin10,
        position:"relative"
      },
      labelStyle: {
        fontSize: Dimension.font16,
        color: colors.DateBgColor,
        fontFamily: Dimension.CustomMediumFont,
       // fontWeight:(Platform.OS === 'ios') ? "500" : "",
        marginLeft: Dimension.margin8,
       // marginBottom: Dimension.margin5,
        fontWeight: 'normal',
        position:"absolute",
        top:Dimension.padding30,
        
      },
      inputContainerStyle: {
         paddingBottom: 0,
         borderBottomWidth:0,
          marginBottom:0,
         paddingVertical:0,
         paddingTop:0,
      },
     
      inputStyle: {
        fontSize: Dimension.font16,
        color: colors.FontColor,
        fontFamily: Dimension.CustomMediumFont,
       // fontWeight:(Platform.OS === 'ios') ? "500" : "",
        paddingLeft: 0,
        marginBottom:0,
        
        //backgroundColor:"#000",
        marginTop:Dimension.margin10
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
        //fontWeight:(Platform.OS === 'ios') ? "500" : "",
      },
      iconCss:{position:"absolute",top:Dimension.padding30,left:Dimension.padding15},
 
});

const MyInput = (props) => {
  const inEditing = useState(false);
  const labelAnim = useRef(new Animated.Value(0)).current;
  const onFocus = (e) => {
    Animated.spring(labelAnim, {
      toValue: 1,
      duration: 500
    }).start();
  };
  const onBlur = (test) => {
    console.log(test)
    Animated.spring(labelAnim, {
      toValue: 0
    }).start();
  };

  return (
    <View style={styles.WrapperStyle}>
      <Animated.Text
        style={[
          styles.labelStyle,
        
          {
            transform: [
              {
                translateY: labelAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -30]
                })
              }
            ]
          },
        //   {
        //     fontSize: labelAnim.interpolate({
        //       inputRange: [0, 1],
        //       outputRange: [10, 20]
        //     })
        //   }
        props.IconName ?{left:Dimension.padding30}:{left:Dimension.padding10}
        ]}
      >
        {props.label}
      </Animated.Text>
      
        <TextInput
          style={[styles.inputStyle,props.IconName ?{paddingLeft:Dimension.padding20}:{paddingLeft:0}]}
          autoCapitalize="none"
          defaultValue={props.defaultValue}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          editable={props.editable}
          onFocus={onFocus}
          //onBlur={(e)=>onBlur(e.target.value)}
          placeholder={props.Placeholder}
        />
        {props.IconName ?
        <CustomeIcon name={props.IconName} size={Dimension.font18} color={colors.DateBgColor} style={styles.iconCss}></CustomeIcon>
     :null}
    </View>
  );
};
export default MyInput;