import React, { useState, useEffect } from "react";
import { Text,  PermissionsAndroid, View,Platform, Alert,FlatList,TouchableOpacity,TextInput } from "react-native";
import CallLogs from "react-native-call-log";
import { FlashList } from "@shopify/flash-list";
import CustomeIcon from "../../component/CustomeIcon";
import Dimension from "../../Theme/Dimension";
import styles from "./style";
import DateConvert from "../../component/DateConvert";

const ActivityScreen = () => {
  const flatListRef = React.useRef();
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    if (Platform.OS === 'android'){
      checkPermission();
      //requestPermission();
    }else{
      //fetchLogs()
    }  
  
  }, []);
const setCallType = (type) =>{
  let IconName;
  if(type == "INCOMING"){
    IconName='phone-incoming-black'
  }
  else if( type =="MISSED") {
    IconName='phone-missed-red'
  }
  else if(type =="OUTGOING"){
    IconName='phone-outgoing-black' 
  }
  else{
    IconName='phone-disconnected-black' 
  }
  return(
    <CustomeIcon name={IconName} size={14} color={type =="MISSED"?'#D9232D':"#272727"} style={{marginTop:4}}></CustomeIcon>
  )
}
  const checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: "Call Log Example",
          message: "Access your call logs",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        CallLogs.load(99).then((c) =>{
          console.log(c)
          setContacts(c)
        }
        );
      } else {
        console.log("Call Log permission denied");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };

  const Contact = ({ contact }) => {
    return (
      <View style={styles.contactCon}>
        <View style={styles.placeholder}>
           <Text style={styles.txt}>{contact?.name ? contact?.name[0]:'Un'}</Text>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {contact?.name ? contact?.name:contact?.phoneNumber}
          </Text>
          <View style={{flexDirection:"row"}}>
          <Text style={styles.phoneNumber}>
            {setCallType(contact?.type)}
          </Text>
          <Text style={styles.datetxt}>
            <DateConvert date={contact?.dateTime} contactType={contact?.type}></DateConvert>
           {/* {contact?.type} */}
          </Text>  
          </View>
          {/* <Text style={styles.phoneNumber}>
            {contact?.dateTime}
          </Text> */}
        </View>
      </View>
    );
  };
  const renderItem = ({ item, index }) => {
    return <Contact contact={item} />;
  };

  return (
    <View
    style={{
      flex: 1,
      marginTop: Dimension.margin40,
      backgroundColor: "#fff",
    }}
  >
    <View style={styles.headerWrap}>
        <View style={styles.TopHeader}>
          <Text style={styles.headingTxt}>Communication</Text>
        </View>
        <View style={styles.HeaderForBtn}>
          <View style={styles.BtnWrap}>
            <TouchableOpacity style={styles.ActiveTopBtn}>
              <Text style={styles.ActiveBtnTxt}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.TopBtn}>
              <Text style={styles.BtnTxt}>Whatsapp</Text>
            </TouchableOpacity>
          </View>
          <View>
          {/* <TouchableOpacity onPress={addContactModal} style={{flexDirection:"row"}}>
            <CustomeIcon name={'Add-blue'} size={18} color={'#1568E5'}></CustomeIcon>
              <Text style={styles.addBtnTxt}> Add</Text>
            </TouchableOpacity> */}
        </View>
        </View>
      <View>
      
      </View>
        <View style={styles.searchWraper}>
        <CustomeIcon name={'search-grey'} size={20} color={'#8E8E93'} style={styles.searchIcon}></CustomeIcon>
          <View style={{ flex: 4 }}>
            <TextInput
              placeholder={"Search by name, company"}
              returnKeyType={"search"}
            //  onChangeText={(e)=>onSearchText(e)}
             // defaultValue={searchValue}
              ellipsizeMode="tail"
              placeholderTextColor={"#8E8E93"}
              numberOfLines={1}
              clearButtonMode="always"
              style={styles.SearchInputCss}
            ></TextInput>
          </View>
          {/* {searchValue.length > 0 && <>
          <TouchableOpacity onPress={()=>setSearch("")} activeOpacity={0.5} style={styles.crossIcon}>
            <CustomeIcon name={'Cancel'} size={20} color={'#1568E5'}></CustomeIcon>
            
           </TouchableOpacity>
          </>} */}
        </View>
      </View>
      <FlatList  
                    data={contacts}  
                  renderItem={renderItem}
                  style={styles.list}
                  keyExtractor={keyExtractor} 
                />  
    </View>
  );
 
};

export default ActivityScreen;
