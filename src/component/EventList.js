import React, { useState } from "react";
import {StyleSheet, View,Text,Modal, Platform} from "react-native";
import CustomeIcon from './CustomeIcon';
import Dimension from '../Theme/Dimension';  
import colors from '../Theme/Colors'; 

const EventList = (props) => {
    return (
        <>
        <View style={styles.dateWrap}>
            <Text style={styles.dateTxt}>9 January 2022</Text>
        </View>
        <View style={styles.EventWrap}>
            <Text style={styles.eventTitle}>Follow up call with Jindal Steel</Text>
            <View style={{flexDirection:"row"}}>
                    <Text style={styles.eventEmail}>Ajit.gupta@jindalsteel.com</Text>  
                    <Text style={styles.bluetxt}>{' '}+ 2 More{' '}</Text> 
                    <CustomeIcon name={'icon_Below'} color={colors.CtaColor} size={Dimension.font14} style={{marginTop:1}}></CustomeIcon>
            </View>
           
            <View style={styles.meetingWrap}>
                    <Text style={styles.meetingheading}>Meeting Agenda</Text>
                    <Text style={styles.meetingval}>Lorem ipsum dollar sit amet</Text>

            </View>
        </View>
        </>
    )
}
const styles = StyleSheet.create({
    EventWrap: {
        borderWidth: 1,
        borderColor: colors.borderColor,
        paddingHorizontal: Dimension.padding25,
        paddingVertical:Dimension.padding15,
        position:"relative",
        marginBottom:Dimension.margin10
      },
      eventTitle:{
        fontSize:Dimension.font16,
        fontFamily:Dimension.CustomMediumFont,
        color:colors.FontColor, 
      },
      eventEmail:{
        fontSize:Dimension.font12,
        fontFamily:Dimension.CustomRegularFont,
        color:colors.DateBgColor,
      },
      meetingheading:{
        fontSize:Dimension.font14,
        fontFamily:Dimension.CustomRegularFont,
        color:colors.DateBgColor,
      },
      meetingval:{
        fontSize:Dimension.font14,
        fontFamily:Dimension.CustomRegularFont,
        color:colors.FontColor,
      },
      meetingWrap:{
        paddingTop:Dimension.padding12
      },
      bluetxt:{
        fontSize:Dimension.font12,
        fontFamily:Dimension.CustomSemiBoldFont, 
        color:colors.CtaColor
      },
      dateTxt:{
        fontSize:Dimension.font12,
        fontFamily:Dimension.CustomMediumFont, 
        color:colors.FontColor
      },
      dateWrap:{
        paddingVertical:Dimension.padding10,
        paddingHorizontal:Dimension.padding20,
      },

})
export default EventList;