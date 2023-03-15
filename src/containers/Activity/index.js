import React, { useState, useEffect } from "react";
import { Text,  PermissionsAndroid, View,Platform, Alert,FlatList } from "react-native";
import CallLogs from "react-native-call-log";
import { FlashList } from "@shopify/flash-list";
import styles from "./style";

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
           <Text style={styles.txt}>{contact?.name && contact?.name[0]}</Text>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {contact?.name}
          </Text>
          <Text style={styles.phoneNumber}>
            {contact?.phoneNumber} : {contact?.type}
          </Text>  
          <Text style={styles.phoneNumber}>
            {contact?.dateTime}
          </Text>
        </View>
      </View>
    );
  };
  const renderItem = ({ item, index }) => {
    return <Contact contact={item} />;
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: "flex-start" }}>
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
