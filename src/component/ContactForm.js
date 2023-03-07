import React, { useState } from "react";
import {StyleSheet, Text, TextInput, View,Platform} from "react-native";
import { Button,CheckBox } from 'react-native-elements';
import Modal from "react-native-modal";
import colors from '../../Theme/Colors';
import Dimension from '../../Theme/Dimension';
import CustomeIcon from './CustomeIcon';
import MyInput from "./floatingInput"

const ContactForm = (props) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [name, setName]= useState('');
    const [company, setCompany] = useState()
    const [designation, setDesignation] = useState()
    const [profile, setProfile] = useState();
    const [number, setNumber] = useState();
    const [whatsapp, setWhatsapp] = useState();
    const [visibleCamera,setCamera] = useState(false);
    const [photo, setPhoto] = useState('https://www.rattanhospital.in/wp-content/uploads/2020/03/user-dummy-pic.png');
    //const [relation, setRelation]= useState('');
    const [check1, setCheck1] = useState(true);
    const [check2, setCheck2] = useState(false);

    const Pressed=()=>{
      setCheck1(!check1),
      setCheck2(!check2);
    }

    const handleCamera =(cam) => {
        console.log(cam)
        setPhoto(cam.assets[0].uri);
        setObject(cam.assets[0])
        setCamera(visibleCamera => !visibleCamera)
      }
    
      const handleGallery= (camDetail) =>{
        console.log(camDetail)
        setPhoto(camDetail.assets[0].uri);
        setObject(camDetail.assets[0])
        setCamera(visibleCamera => !visibleCamera)
        }

  return (
    <View>
    <Card containerStyle={styles.UserDeatilCardWrapper}>
    <Avatar
      //size={64}
      rounded
      source={{uri: photo }}
      avatarStyle={styles.UserImgIcon}
      containerStyle={styles.UserimgContainer}
    />
      <TouchableOpacity onPress={()=> setCamera(visibleCamera => !visibleCamera)} style={styles.addPhotoBtn}>
      <Text style={styles.addPhotoText}>
          Add Photo
      </Text>
      </TouchableOpacity>

  </Card>
  <MyInput label="Name"  keyboardType="default" IconName={'People_2'} onChangeText={newText => setName(newText)}/>
  <MyInput label="Company"  IconName={'Company'} onChangeText={newText => setCompany(newText)}/>
  <MyInput label="Plant" keyboardType="default" IconName={'People'} onChangeText={newText => setDesignation(newText)}/>
  <MyInput label="Location" keyboardType="default" IconName={'People'} onChangeText={newText => setDesignation(newText)}/>
  <MyInput label="Designation" keyboardType="default" IconName={'People'} onChangeText={newText => setDesignation(newText)}/>
  <MyInput label="Profile Synopsis"  keyboardType="default" IconName={'Synopsis'} onChangeText={newText => setProfile(newText)}/>
  <MyInput label="Contact"  keyboardType="phone-pad" IconName={'Call'} onChangeText={newText => setNumber(newText)}/>
  <MyInput label="Whatsapp Number"  keyboardType="phone-pad" IconName={'Whatsapp_icon'} onChangeText={newText => setWhatsapp(newText)}/>
  <Button onPress={submitButton} title="Save"     
   buttonStyle={styles.btnStyle}
   titleStyle={styles.btntxt}
   containerStyle={styles.btnContainer} />
   {visibleCamera && <Camera onSelectCamera={handleCamera} onSelectGallery={handleGallery}/>} 
</View> 

  );
};

const styles = StyleSheet.create({
  modalContainer:{
    backgroundColor:colors.WhiteColor,
    borderRadius:35,
    borderWidth:.5,
    borderColor:"#D0D0D0",
    width:"100%",
    position:"absolute",
    bottom:0,
    paddingTop:Dimension.padding30,
    paddingHorizontal:Dimension.padding8

  },
    headerText: {
        color: colors.FontColor,
        fontSize: Dimension.font16,
        fontFamily:Dimension.CustomMediumFont,
        textAlign:"center",
        paddingBottom:Dimension.padding20,
        //fontWeight:(Platform.OS === 'ios') ? "500" : "",
      },
      cardWrap:{
        borderColor:"#D3D3D3",
        borderRadius:10,
        borderWidth:.5,
        padding:Dimension.padding15
      },
      DatetimecardWrap:{
        borderColor:"#D3D3D3",
        borderRadius:10,
        borderWidth:.5,
        flexDirection:"row",
        marginVertical:Dimension.margin10
      },
      titleHeading:{
        color: colors.DateBgColor,
        fontSize: Dimension.font14,
        fontFamily:Dimension.CustomMediumFont,
        //fontWeight:(Platform.OS === 'ios') ? "500" : "",
        
      },
      titleTxt:{
        color: colors.FontColor,
        fontSize: Dimension.font14,
        fontFamily:Dimension.CustomMediumFont,
        //fontWeight:(Platform.OS === 'ios') ? "500" : "",
        marginTop:Dimension.margin5
      },
      innerLeft:{
        flex:1,
        borderRightColor:'#D3D3D3',
        borderRightWidth:.5,
        paddingHorizontal:Dimension.padding20,
        paddingVertical:Dimension.padding10
      },
      innerRight:{
        flex:1,
        paddingHorizontal:Dimension.padding20,
        paddingVertical:Dimension.padding10
      },
      MultillineInput:{
        color: colors.DateBgColor,
        fontSize: Dimension.font14,
        fontFamily:Dimension.CustomMediumFont,
        height:100
      },
      btntxt:{
        color: colors.WhiteColor,
        fontSize: Dimension.font14,
        fontFamily:Dimension.CustomBoldFont,
        //fontWeight:(Platform.OS === 'ios') ? "700" : "",
      },
      btnStyle:{backgroundColor:colors.CtaColor,borderRadius:50,paddingHorizontal:Dimension.padding30, alignItems:"center",justifyContent:"center",alignContent:"center"},
      btnContainer:{
        justifyContent:"center",
        alignItems:"center"
      },
      checkboxTitle:{
        fontSize:Dimension.font16,
        color:colors.FontColor,
        fontWeight:"normal",
        marginLeft:Dimension.margin5,
        //fontWeight:(Platform.OS === 'ios') ? "500" : "",
        
      },
      checkboxwrapper:{
        backgroundColor:colors.transparent,
        
      },
      checkboxContainer:{
        backgroundColor:colors.transparent,
        paddingVertical:0,
        paddingHorizontal:0,
        borderWidth:0,
        borderColor:colors.WhiteColor,
        width:"auto"
      },
      MedimumFont:
        Platform.OS === 'ios' ? {
          fontFamily: Dimension.CustomMediumFont,
          fontWeight: '500'
        } : {
         fontFamily: Dimension.CustomMediumFont
        },
      
      boldFont:
      Platform.OS === 'ios' ? {
        fontFamily: Dimension.CustomBoldFont,
        fontWeight: '700'
      } : {
       fontFamily: Dimension.CustomBoldFont,
      },
});

export default ContactForm;