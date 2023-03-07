import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  View,
  Text,
  Platform,Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Contacts from 'react-native-contacts';

const ContactScreen = props => {
  const [contacts, setContacts] = useState([]);
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
        <View style={styles.imgCon}>
          <View style={styles.placeholder}>
            {contact?.hasThumbnail?
            <Image source={{uri:contact?.thumbnailPath}}  style={{width: 40, height: 40}}/>
            :<Text style={styles.txt}>
              {contact?.givenName[0]}
              </Text>}
          </View>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {contact?.givenName}{' '}
            {contact?.middleName && contact.middleName + ' '}
            {contact?.familyName}
          </Text>
          <Text style={styles.name}>{contact?.company}</Text>
          <Text style={styles.phoneNumber}>
            {contact?.phoneNumbers[0]?.number}
          </Text>
          
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
    <View style={{flex: 1}}>
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

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  phoneNumber: {
    color: '#888',
  },
});

export default ContactScreen;
