import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  View,
  Text,
  Platform,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Contacts from 'react-native-contacts';
import Modal from 'react-native-modal';
import Dimension from '../../Theme/Dimension';
import styles from './style';
import CustomeIcon from '../../component/CustomeIcon';
import {useNavigation} from '@react-navigation/native';
import MyInput from '../../component/floatingInput';

const ContactScreen = props => {
  const navigation = useNavigation();
  const flatListRef = React.useRef();
  const [contacts, setContacts] = useState([]);
  const [pagetype, setpageType] = useState('Focused');
  const [searchValue, setSearch] = useState('');
  const [FilterList, setFilter] = useState([]);
  const [syncPhone, setSyncPhone] = useState(false);
  const [contactsLoader, setContactsLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [contactNum, setContactNum] = useState();
  useEffect(() => {
    setContactsLoader(true);
    getPhoneContacts();
  }, []);

  const addContactModal = () => {
    setModalVisible(!isModalVisible);
  };
  const FocusedData = [
    {
      Name: 'Abhay Singh',
      Team: 'Finance team',
      CompanyDetail: 'Havells India Pvt. Ltd., Faridabad',
      Position: 'Promoter',
      backgroundColor: '#E2FCD0',
      Eid: '1',
    },
    {
      Name: 'Anees Gokhale',
      Team: 'CEO',
      CompanyDetail: '',
      Position: 'Neutral',
      backgroundColor: '#C1C1C1',
      Eid: '2',
    },
    {
      Name: 'Bahadur Saraf',
      Team: 'Finance team',
      CompanyDetail: 'Gupta & Sons Limited, Chandigarh',
      Position: 'Detractors',
      backgroundColor: '#FFD8D5',
      Eid: '3',
    },
    {
      Name: 'Abhay Singh',
      Team: 'Finance team',
      CompanyDetail: 'Havells India Pvt. Ltd., Faridabad',
      Position: 'Promoter',
      backgroundColor: '#E2FCD0',
      Eid: '4',
    },
    {
      Name: 'Abhay Singh',
      Team: 'Finance team',
      CompanyDetail: 'Havells India Pvt. Ltd., Faridabad',
      Position: 'Promoter',
      backgroundColor: '#E2FCD0',
      Eid: '1',
    },
    {
      Name: 'Anees Gokhale',
      Team: 'CEO',
      CompanyDetail: '',
      Position: 'Neutral',
      backgroundColor: '#C1C1C1',
      Eid: '2',
    },
    {
      Name: 'Bahadur Saraf',
      Team: 'Finance team',
      CompanyDetail: 'Gupta & Sons Limited, Chandigarh',
      Position: 'Detractors',
      backgroundColor: '#FFD8D5',
      Eid: '3',
    },
    {
      Name: 'Abhay Singh',
      Team: 'Finance team',
      CompanyDetail: 'Havells India Pvt. Ltd., Faridabad',
      Position: 'Promoter',
      backgroundColor: '#E2FCD0',
      Eid: '4',
    },
  ];

  const renderFocusedData = ({item, index}) => {
    return (
      <View style={styles.contactCon}>
        <View style={styles.placeholder}>
          <Text style={styles.txt}>{item?.Name[0]}</Text>
          {/* {contact?.hasThumbnail ? (
            <Image
              source={{uri: contact?.thumbnailPath}}
              style={{width: 48, height: 48, borderRadius: 48}}
            />
          ) : (
            <Text style={styles.txt}>{contact?.givenName[0]}</Text>
          )} */}
        </View>

        <View style={styles.contactDat}>
          <Text style={styles.name}>{item?.Name} </Text>
          <Text style={styles.phoneNumber}>{item?.Team}</Text>
          <Text style={styles.phoneNumber}>
            {item?.CompanyDetail == ''
              ? 'Company details missing'
              : item?.CompanyDetail}
          </Text>
          <Text
            style={[
              styles.PositionWrap,
              {backgroundColor: item?.backgroundColor},
            ]}>
            {item?.Position}
          </Text>
        </View>
      </View>
    );
  };

  const getPhoneContacts = () => {
    if (Platform.OS == 'android') {
      try {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
          .then(res => {
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

  const onSearchText = item => {
    console.log(searchValue);
    setSearch(item);
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
    let filteredData = contacts.filter(function (val) {
      console.log(searchValue);
      if (
        val.displayName.toLowerCase().includes(item.toLowerCase()) ||
        (val.company && val.company.toLowerCase().includes(item.toLowerCase()))
      ) {
        return val;
      }
    });
    setFilter(filteredData);
  };

  const Contact = ({contact}) => {
    return (
      <View style={styles.contactCon}>
        <View style={styles.placeholder}>
          {contact?.hasThumbnail ? (
            <Image
              source={{uri: contact?.thumbnailPath}}
              style={{width: 48, height: 48, borderRadius: 48}}
            />
          ) : (
            <Text style={styles.txt}>{contact?.givenName[0]}</Text>
          )}
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

  const AddContact = () => {
    navigation.navigate('AddContact');
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: Dimension.margin40,
        backgroundColor: '#fff',
      }}>
      <View style={styles.headerWrap}>
        <View style={styles.TopHeader}>
          <Text style={styles.headingTxt}>Contacts</Text>
        </View>
        <View style={styles.HeaderForBtn}>
          <View style={styles.BtnWrap}>
            <TouchableOpacity
              style={
                pagetype == 'Focused' ? styles.ActiveTopBtn : styles.TopBtn
              }
              onPress={() => setpageType('Focused')}>
              <Text
                style={
                  pagetype == 'Focused' ? styles.ActiveBtnTxt : styles.BtnTxt
                }>
                Focused
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={pagetype == 'Phone' ? styles.ActiveTopBtn : styles.TopBtn}
              onPress={() => setpageType('Phone')}>
              <Text
                style={
                  pagetype == 'Phone' ? styles.ActiveBtnTxt : styles.BtnTxt
                }>
                Phone
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={addContactModal}
              style={{flexDirection: 'row'}}>
              <CustomeIcon
                name={'Add-blue'}
                size={18}
                color={'#1568E5'}></CustomeIcon>
              <Text style={styles.addBtnTxt}> Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View></View>
        <View style={styles.searchWraper}>
          <CustomeIcon
            name={'search-grey'}
            size={20}
            color={'#8E8E93'}
            style={styles.searchIcon}></CustomeIcon>
          <View style={{flex: 4}}>
            <TextInput
              placeholder={'Search by name, company'}
              returnKeyType={'search'}
              onChangeText={e => onSearchText(e)}
              defaultValue={searchValue}
              ellipsizeMode="tail"
              placeholderTextColor={'#8E8E93'}
              numberOfLines={1}
              clearButtonMode="always"
              style={styles.SearchInputCss}></TextInput>
          </View>
          {searchValue.length > 0 && (
            <>
              <TouchableOpacity
                onPress={() => setSearch('')}
                activeOpacity={0.5}
                style={styles.crossIcon}>
                <CustomeIcon
                  name={'Cancel'}
                  size={20}
                  color={'#1568E5'}></CustomeIcon>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      {pagetype == 'Focused' ? (
        <FlashList
          // ref={flatListRef}
          data={FocusedData}
          renderItem={renderFocusedData}
          // keyExtractor={index}
          //style={styles.list}
        />
      ) : null}
      {pagetype == 'Phone' && contactsLoader ? (
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
      ) : pagetype == 'Phone' ? (
        <FlashList
          ref={flatListRef}
          data={
            searchValue && searchValue.length > 0
              ? FilterList
              : getContactsData()
          }
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          //style={styles.list}
        />
      ) : null}

      <Modal isVisible={isModalVisible} style={styles.ModalBg}>
        <View style={styles.ModalContainer}>
          <Text style={styles.ModalHeading}>Add Contact</Text>
          <View style={styles.InputWrap}>
            <MyInput
              label="Contact Number"
              keyboardType="number-pad"
              IconName={'call-grey'}
              RightIconName={'Go-blue'}
              onChangeText={newText => setContactNum(newText)}
            />
          </View>
          {/* disableBtn css */}
          <TouchableOpacity onPress={AddContact} style={styles.enableBtn}>
            <Text style={styles.disableBtnTxt}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ContactScreen;
