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
import {useDispatch, useSelector} from 'react-redux';
import {STATE_STATUS} from '../../redux/constants';
import {fetchContacts} from '../../redux/actions/contacts';
import Colors from '../../Theme/Colors';
import {CheckBox} from 'react-native-elements';
import {getNumberDetails} from '../../services/contacts';

const ContactScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const flatListRef = React.useRef();

  const contactsData = useSelector(state => state.contactsReducer.get('data'));
  const contactsStatus = useSelector(state =>
    state.contactsReducer.get('status'),
  );

  const [contacts, setContacts] = useState([]);
  const [pagetype, setpageType] = useState('Focused');
  const [searchValue, setSearch] = useState('');
  const [FilterList, setFilter] = useState([]);
  const [syncPhone, setSyncPhone] = useState(false);
  const [selectContact, setSelectContact] = useState(false);
  const [contactsLoader, setContactsLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [contactNum, setContactNum] = useState('');
  const [contactExists, setContactExists] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    setContactsLoader(true);
    getPhoneContacts();
    pullToRefresh();
  }, []);

  useEffect(() => {
    console.log('dwedwe', contactNum);
    if (contactNum.length == 10) {
      checkExistance();
    }
  }, [contactNum]);

  const checkExistance = async () => {
    try {
      setContactLoading(true);
      const {data} = await getNumberDetails(contactNum);
      if (data?.result?.data?.length) {
        setContactExists(true);
        setContactLoading(true);
      } else {
        setContactExists(false);
        setContactLoading(true);
      }
    } catch (e) {
      setContactExists(false);
      setContactLoading(false);
    }
  };

  const pullToRefresh = () => {
    dispatch(fetchContacts());
  };

  const addContactModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderFocusedData = ({item, index}) => {
    return (
      <View style={styles.contactCon}>
        <View style={styles.placeholder}>
          <Text style={styles.txt}>{item?.name[0]}</Text>
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
          <Text style={styles.name}>{item?.name} </Text>
          <Text style={styles.phoneNumber}>{item?.designation}</Text>
          <Text style={styles.phoneNumber}>
            {!item.company ? 'Company details missing' : item?.company}
          </Text>
          <Text
            style={[
              styles.PositionWrap,
              {backgroundColor: item?.backgroundColor},
            ]}>
            {item?.inclination}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.arrowBtn}
          onPress={() =>
            navigation.navigate('ContactDetail', {phone: contactNum})
          }>
          <CustomeIcon
            name={'Arrow-black'}
            color={Colors.FontColor}
            size={20}></CustomeIcon>
        </TouchableOpacity>
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
    setSearch(item);
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
    let filteredData = contacts.filter(function (val) {
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
          {selectContact ? null : (
            <TouchableOpacity
              onPress={addContactModal}
              style={{flexDirection: 'row'}}>
              <CustomeIcon
                name={'Add-blue'}
                size={18}
                color={'#1568E5'}></CustomeIcon>
              <Text style={styles.addBtnTxt}> Add</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.name}>{contact?.company}</Text>
        </View>
        {selectContact ? (
          <TouchableOpacity style={styles.selectWrap}>
            <CheckBox
              //title={'yes'}
              // onPress={() => onCheck(_.key)}
              checkedIcon={
                <CustomeIcon
                  name={'Check-blue'}
                  size={Dimension.font22}
                  color={Colors.CtaColor}
                />
              }
              uncheckedIcon={
                <CustomeIcon
                  name={'Check-blank'}
                  size={Dimension.font22}
                  color={Colors.FontColor}
                />
              }
              checked={true}
              textStyle={styles.checkboxTitle}
              fontFamily={Dimension.CustomMediumFont}
              wrapperStyle={styles.checkboxwrapper}
              containerStyle={styles.checkboxContainer}
            />
          </TouchableOpacity>
        ) : null}
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
            {pagetype == 'Focused' ? (
              <TouchableOpacity
                onPress={addContactModal}
                style={{flexDirection: 'row'}}>
                <CustomeIcon
                  name={'Add-blue'}
                  size={18}
                  color={'#1568E5'}></CustomeIcon>
                <Text style={styles.addBtnTxt}> Add</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setSelectContact(!selectContact)}
                style={{flexDirection: 'row'}}>
                <Text style={styles.addBtnTxt}>
                  {selectContact ? 'Cancel' : 'Select'}
                </Text>
              </TouchableOpacity>
            )}
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
        [STATE_STATUS.FETCHING, STATE_STATUS.UNFETCHED].includes(
          contactsStatus,
        ) ? (
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
            // ref={flatListRef}
            estimatedItemSize={106}
            data={contactsData.toArray()}
            renderItem={renderFocusedData}
            refreshing={[
              STATE_STATUS.FETCHING,
              STATE_STATUS.UNFETCHED,
            ].includes(contactsStatus)}
            onRefresh={pullToRefresh}
            // keyExtractor={index}
            //style={styles.list}
          />
        )
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
          estimatedItemSize={106}
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

      <Modal
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        style={styles.ModalBg}>
        <View style={styles.ModalContainer}>
          <Text style={styles.ModalHeading}>Add Contact</Text>
          <View style={styles.InputWrap}>
            <MyInput
              label="Contact Number"
              keyboardType="number-pad"
              maxLength={10}
              IconName={'call-grey'}
              defaultValue={contactNum}
              value={contactNum}
              RightIconName={'Go-blue'}
              onChangeText={newText => setContactNum(newText)}
              onSubmitEditing={() => {
                if (contactNum.length == 10) {
                  checkExistance();
                }
              }}
            />
          </View>
          {contactExists && contactNum.length == 10 ? (
            <Text>Contact already exists</Text>
          ) : null}
          {contactLoading && <Text>Searching...</Text>}
          {/* disableBtn css */}
          {!contactExists && contactNum.length == 10 ? (
            <TouchableOpacity onPress={AddContact} style={styles.enableBtn}>
              <Text style={styles.disableBtnTxt}>Continue</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </Modal>
    </View>
  );
};

export default ContactScreen;
