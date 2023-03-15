import React, { useState} from 'react';
import {Text, ScrollView, View,Platform,TouchableOpacity} from 'react-native';
import {Card,Button, Icon,Avatar} from 'react-native-elements';
import styles from './style'
//import APPHeader from '../../component/common/APPHeader';
// import CreateEvent from '../../component/common/CreateEvent';
//import Camera  from '../../component/common/Camera'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import CustomeIcon from '../../component/common/CustomeIcon';
// import Dimension from '../../Theme/Dimension';  
// import colors from '../../Theme/Colors';  
//import {ContactService} from '../../services/ContactService';
import MyInput from "../../component/floatingInput"
// import { launchImageLibrary } from 'react-native-image-picker';
//import RNFetchBlob from 'rn-fetch-blob';
//import CONSTANTS from "../../services/constant";
//import SyncStorage from 'sync-storage';


const AddContact = props => {
    console.log(props)
    const [name, setName] = useState()
    const [company, setCompany] = useState()
    const [designation, setDesignation] = useState()
    const [profile, setProfile] = useState();
    const [number, setNumber] = useState();
    const [whatsapp, setWhatsapp] = useState();
    const [visibleCamera,setCamera] = useState(false);
    const [photo, setPhoto] = useState('https://www.rattanhospital.in/wp-content/uploads/2020/03/user-dummy-pic.png');
    const [photoObject,setObject] = useState([{type:'image/jpeg',filename:'dummy.jpg'}])

    const submitButton =() =>{
        let finalData=JSON.stringify({
            "name": name,
            "contactNumber": number,
            "designation": designation,
            "profileSynopsis": profile,
            "whatsAppNumber": whatsapp,
            "linkedInAccount": null,
            "company": {
                    "name": company
                  },
         });
         console.log(finalData)
        // ContactService.AddContact(finalData).then(response => {
        //     console.log("image uplaod response ",response)
        //     if(response.code==200 && response.success){
        //          alert(response.message)
        //          //handleImageUpload(response.data.id);
        //          props.navigation.goBack() 
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //    // throw alert(err);
        //   });
    }
    
 const handleImageUpload = (id) => {
  // const realPath = Platform.OS === 'ios' ? photoObject.uri.replace('file://', '') : photoObject.uri;
  // RNFetchBlob.fetch('POST', CONSTANTS.API_BASE_URL+'/api/contact/'+id+'/addImage', {
  //   'Authorization': SyncStorage.get('token'),
  //   'Content-Type' : 'multipart/form-data',
  //     }, [
  //       { name : 'image',type:photoObject.type, filename : photoObject.fileName, 
  //       data: RNFetchBlob.wrap(decodeURIComponent(realPath)),
  //       },
  //     ]).then((resp) => {
  //       console.log(resp.data)
  //     });
  };

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
        <>
        {/* <APPHeader showBack={true}  showText={'Add User'} /> */}
        <ScrollView style={styles.ScrollViewCss}> 
            
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

            <MyInput label="Contact"  keyboardType="phone-pad" IconName={'Call'} onChangeText={newText => setNumber(newText)}/>

            <MyInput label="Designation" keyboardType="default" IconName={'People'} onChangeText={newText => setDesignation(newText)}/>

            <MyInput label="Plant" keyboardType="default" IconName={'People'} onChangeText={newText => setDesignation(newText)}/>

            <MyInput label="Department" keyboardType="default" IconName={'People'} onChangeText={newText => setDesignation(newText)}/>
             
            <MyInput label="Profile Synopsis"  keyboardType="default" IconName={'Synopsis'} onChangeText={newText => setProfile(newText)}/>
            
            <MyInput label="Whatsapp Number"  keyboardType="phone-pad" IconName={'Whatsapp_icon'} onChangeText={newText => setWhatsapp(newText)}/>       
          
            <Button onPress={submitButton} title="Save"     
             buttonStyle={styles.btnStyle}
             titleStyle={styles.btntxt}
             containerStyle={styles.btnContainer} />
             {/* {visibleCamera && <Camera onSelectCamera={handleCamera} onSelectGallery={handleGallery}/>}  */}
        </View>
        </ScrollView>
        </>
    )
}

export default AddContact;
