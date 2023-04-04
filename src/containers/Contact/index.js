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
import {Button} from 'react-native-elements';
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
import {getNumberDetails, syncContacts} from '../../services/contacts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

const ContactScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const flatListRef = React.useRef();

  const contactsData = useSelector(state => state.contactsReducer.get('data'));
  const contactsStatus = useSelector(state =>
    state.contactsReducer.get('status'),
  );

  const [contacts, setContacts] = useState([]);
  const [syncLoading, setSyncLoading] = useState(false);
  const [pagetype, setpageType] = useState('Focused');
  const [searchValue, setSearch] = useState('');
  const [FilterList, setFilter] = useState([]);
  const [syncPhone, setSyncPhone] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
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
    if (contactNum.length == 10) {
      checkExistance();
    }
  }, [contactNum]);

  const checkExistance = async () => {
    try {
      setContactLoading(true);
      const {data} = await getNumberDetails(contactNum);
      setContactLoading(false);
      if (data?.result?.length) {
        setContactExists(true);
      } else {
        setContactExists(false);
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ContactDetail', {phone: item.phone})
        }
        style={styles.contactCon}>
        <View style={styles.placeholder}>
          <Text style={styles.txt}>{item?.name?.[0]}</Text>
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
          <Text style={item.company ? styles.phoneNumber : styles.redtxt}>
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
        <TouchableOpacity style={styles.arrowBtn}>
          <CustomeIcon
            name={'Arrow-black'}
            color={Colors.FontColor}
            size={20}></CustomeIcon>
        </TouchableOpacity>
      </TouchableOpacity>
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
      });
  };

  const onSelectDeselectContact = detail => {
    let currentData = [...selectedContacts];
    const exists = currentData.find(
      _ => _.recordID == detail.recordID,
    )?.recordID;
    if (exists) {
      currentData = [...currentData.filter(_ => _.recordID != detail.recordID)];
    } else {
      currentData = [...currentData, detail];
    }
    setSelectedContacts([...currentData]);
  };

  const renderItem = ({item, index}) => {
    return <Contact contact={item} />;
  };

  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };

  const onSearchText = item => {
    setSearch(item);
    // flatListRef.current.scrollToOffset({animated: true, offset: 0});
    let filteredData = contactsData.filter(function (val) {
      if (
        val.name?.toLowerCase()?.includes(item?.toLowerCase()) ||
        (val.company &&
          val.company?.toLowerCase()?.includes(item?.toLowerCase()))
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
            <Text style={styles.txt}>{contact?.givenName?.[0]}</Text>
          )}
        </View>

        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {contact?.givenName}{' '}
            {contact?.middleName && contact.middleName + ' '}
            {contact?.familyName}
          </Text>
          <Text style={styles.phoneNumber}>
            {contact?.phoneNumbers?.[0]?.number}
          </Text>
          {selectContact ? null : (
            <TouchableOpacity
              onPress={() => onSyncContacts(true, contact)}
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
              onPress={() => onSelectDeselectContact(contact)}
              checkedIcon={
                <CustomeIcon
                  name={'Check-blue'}
                  size={Dimension.font22}
                  color={Colors.CtaColor}
                />
              }
              uncheckedIcon={
                <Icon
                  name={'radiobox-blank'}
                  size={Dimension.font22}
                  color={Colors.FontColor}
                />
              }
              checked={selectedContacts
                .map(_ => _.recordID)
                .includes(contact.recordID)}
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

  const onSyncContacts = async (isSingleContact, contact) => {
    try {
      setSyncLoading(true);
      let body = [];
      if (isSingleContact) {
        body = [contact];
      } else {
        body = selectedContacts;
      }
      body = body.map(_ => ({
        name: _.displayName || '',
        email: (_.emailAddresses.find(__ => __.email) || {}).email || '',
        phone:
          ((_.phoneNumbers.find(__ => __.number) || {}).number || '')
            .split('-' || ' ')
            .join('') || '',
      }));
      const {data} = await syncContacts(body);
      if (data.status == 200) {
        dispatch(fetchContacts());
        setSelectContact(false);
        Toast.show({
          type: 'success',
          text1: data.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: data.errorMessage || 'Something went wrong!',
        });
      }
      setSyncLoading(false);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
      setSyncLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Dimension.padding30,
        // marginTop: Dimension.margin40,
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
            ref={flatListRef}
            estimatedItemSize={106}
            data={
              searchValue && searchValue.length
                ? FilterList.toArray()
                : contactsData.toArray()
            }
            renderItem={renderFocusedData}
            refreshing={[
              STATE_STATUS.FETCHING,
              STATE_STATUS.UNFETCHED,
            ].includes(contactsStatus)}
            onRefresh={pullToRefresh}
            ListEmptyComponent={
              contactsStatus == STATE_STATUS.FETCHED ? (
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: Dimension.margin10,
                    color: '#000',
                  }}>
                  No Contacts Found
                </Text>
              ) : null
            }
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
              onChangeText={newText => setContactNum(newText)}
              onSubmitEditing={() => {
                if (contactNum.length == 10) {
                  checkExistance();
                }
              }}
            />
          </View>
          {contactExists && contactNum.length == 10 ? (
            <Text style={styles.alreadyExistsTxt}>Contact already exists</Text>
          ) : null}
          {contactLoading && (
            <Text style={styles.searchingtxt}>Searching...</Text>
          )}
          {/* disableBtn css */}
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('AddContact', {
                phone: contactNum,
                newContact: true,
              });
              setModalVisible(false);
            }}
            disabled={contactExists || contactNum.length != 10}
            style={
              !contactExists && contactNum.length == 10
                ? styles.enableBtn
                : styles.disableBtn
            }>
            <Text style={styles.disableBtnTxt}>Add to my Contact</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {selectContact ? (
        <View style={styles.BtnWrapper}>
          <View style={{flex: 1}}>
            <Button
              onPress={() => setSelectContact(false)}
              title="Cancel"
              buttonStyle={styles.CancelbtnStyle}
              titleStyle={styles.Cancelbtntxt}
              containerStyle={styles.btnContainer}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              onPress={() => onSyncContacts()}
              title="Save"
              loading={syncLoading}
              disabled={!selectedContacts.length}
              buttonStyle={styles.btnStyle}
              titleStyle={styles.btntxt}
              containerStyle={styles.btnContainer}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ContactScreen;
