import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  View,
  Text,
  Platform,Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Contacts from 'react-native-contacts';
import Dimension from '../../Theme/Dimension';
import styles from './style';

const ContactScreen = props => {
  const [contacts, setContacts] = useState([]);
  const [syncPhone,setSyncPhone] = useState(false)
  const [contactsLoader, setContactsLoader] = useState(false);
  useEffect(() => {
    setContactsLoader(true);
    getPhoneContacts();
  }, []);

  const getPhoneContacts = () => {
    if (Platform.OS == 'android') {
      try {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
          .then(res => {
            console.log('Permission: ', res);
            readContacts();
          })
          .catch(error => {
            console.error('Permission error: ', error);
          });
      } catch (err) {
        setContactsLoader(false);
        console.log('err', err);
      }
    } else {
      readContacts();
    }
  };

  const readContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        console.log("all contacts list", contacts)
        setContacts(contacts);
        setContactsLoader(false);
      })
      .catch(e => {
        setContactsLoader(false);
        console.log(e);
      });
  };
  const renderItem = ({item, index}) => {
    return <Contact contact={item} />;
  };
  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };

  const Contact = ({contact}) => {
    return (
      <View style={styles.contactCon}>
        
          <View style={styles.placeholder}>
            {contact?.hasThumbnail?
            <Image source={{uri:contact?.thumbnailPath}}  style={{width: 48, height: 48,borderRadius:48}}/>
            :<Text style={styles.txt}>
              {contact?.givenName[0]}
              </Text>}
          </View>
        
        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {contact?.givenName}{' '}
            {contact?.middleName && contact.middleName + ' '}
            {contact?.familyName}
          </Text>
          <Text style={styles.phoneNumber}>
            {contact?.phoneNumbers[0]?.number}
          </Text>
          <Text style={styles.name}>{contact?.company}</Text>
         
          
        </View>
      </View>
    );
  };

  const getContactsData = () => {
    let mutateContacts = ([...contacts] || []).sort((a, b) => {
      if (a.displayName > b.displayName) {
        return 1;
      }
      if (a.displayName < b.displayName) {
        return -1;
      }
      return 0;
    });
    return mutateContacts;
  };

  return (
    <View style={{flex: 1,marginTop:Dimension.margin40,backgroundColor:"#fff"}}>
      <View style={styles.headerWrap}>
      <View style={styles.TopHeader}>
        <Text style={styles.headingTxt}>Contacts</Text>


      </View>
      <View style={styles.HeaderForBtn}>
      <View style={styles.BtnWrap}>
        <TouchableOpacity style={styles.TopBtn}>
          <Text style={styles.BtnTxt}>Focused</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ActiveTopBtn}>
          <Text style={styles.ActiveBtnTxt}>Phone</Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.searchWraper}>
      <TextInput
        placeholder={'Search by name, company'}
        returnKeyType={'search'}
        //onChangeText={onSearchText}
       // value={inputValue}
        ellipsizeMode="tail"
        placeholderTextColor={'#8E8E93'}
        numberOfLines={1}
        style={styles.SearchInputCss}>
     </TextInput>
    </View>
    </View>
      {contactsLoader ? (
        <ActivityIndicator
          color={'red'}
          size={'large'}
          style={{
            marginTop: 100,
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        />
      ) : (
        <FlashList
          data={getContactsData()}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.list}
        />
      )}
    </View>
  );
};



export default ContactScreen;
