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
  Keyboard,
  Linking,
  KeyboardAvoidingView,
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
import NoDataFound from '../../component/NoDataFound';
import logAnalytics from '../../services/analytics';
import CallDetectorManager from 'react-native-call-detection';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {createAllContacts} from '../../services/communication';
import {updateLogs} from '../../redux/actions/communication';

const ContactScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const flatListRef = React.useRef();

  const contactsData = useSelector(state => state.contactsReducer.get('data'));
  const contactsStatus = useSelector(state =>
    state.contactsReducer.get('status'),
  );
  const logsStatus = useSelector(state =>
    state.communicationReducer.get('status'),
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
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

  let callDetector = null;
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    setContactsLoader(true);
    getPhoneContacts();
    pullToRefresh();
  }, []);

  useEffect(() => {
    setSelectContact(false);
    setSelectedContacts([]);
  }, [pagetype]);

  useEffect(() => {
    if (logsStatus == STATE_STATUS.FETCHING && callDetector) {
      callDetector && callDetector.dispose();
    }
  }, [logsStatus]);

  useEffect(() => {
    if (contactNum.length == 10) {
      checkExistance();
    }
  }, [contactNum]);

  useEffect(() => {
    if (selectedContacts && selectedContacts.length) {
      setSelectedContacts([]);
    }
  }, [selectContact]);

  useEffect(() => {
    setContactNum('');
  }, [isModalVisible]);

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

  const INCLINATION_COLORS = {
    Promoter: '#E2FCD0',
    Detractor: '#FFD8D5',
    Neutral: '#F0DDA8',
  };

  const renderFocusedData = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ContactDetail', {phone: item.phone})
        }
        style={index == 0 ? styles.contactConWrap : styles.contactCon}>
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
          {item?.name ? <Text style={styles.name}>{item?.name} </Text> : null}
          {item?.designation ? (
            <Text style={styles.phoneNumber}>{item?.designation}</Text>
          ) : null}

          <Text style={item.company ? styles.phoneNumber : styles.redtxt}>
            {!item.company
              ? 'Company and other details missing'
              : item?.company}
          </Text>
          {item?.inclination ? (
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  styles.PositionWrap,
                  {
                    backgroundColor:
                      INCLINATION_COLORS[item?.inclination || ''],
                  },
                ]}>
                {item?.inclination}
              </Text>

              <CustomeIcon
                name={'Arrow-black'}
                color={Colors.FontColor}
                size={18}
                style={{marginTop: Dimension.margin8}}></CustomeIcon>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.PositionWrap, {backgroundColor: '#E0E0E0'}]}>
                Info missing
              </Text>
              <CustomeIcon
                name={'Arrow-black'}
                color={Colors.FontColor}
                size={18}
                style={{marginTop: Dimension.margin8}}></CustomeIcon>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.arrowBtn}
          onPress={async () => {
            await logAnalytics('Open_Dialer', {
              Contact: item.phone,
              Screen_Name: 'Contacts',
            });
            phoneCallDetector(item);
            Linking.openURL(
              `${Platform.OS == 'android' ? 'tel' : 'telprompt'}:${item.phone}`,
            );
          }}>
          <CustomeIcon
            name={'Call-blue'}
            color={Colors.CtaColor}
            size={20}></CustomeIcon>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const pullToRefreshContacts = () => {
    getPhoneContacts();
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
      try {
        readContacts();
      } catch (e) {
        console.error('Permission error: ', e);
      }
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
    return <Contact contact={item} index={index} />;
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

  const Contact = ({contact, index}) => {
    return (
      <View style={index == 0 ? styles.contactConWrap : styles.contactCon}>
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
          {contact?.phoneNumbers?.[0]?.number ? (
            <Text style={styles.phoneNumber}>
              {contact?.phoneNumbers?.[0]?.number}
            </Text>
          ) : null}
          {selectContact ? null : (
            <TouchableOpacity
              onPress={() => onSyncContacts(true, contact)}
              style={{
                flexDirection: 'row',
                marginLeft: -2,
              }}>
              <CustomeIcon
                name={'Add-blue'}
                size={18}
                color={'#1568E5'}></CustomeIcon>
              <Text style={styles.addBtnTxt}> Add</Text>
            </TouchableOpacity>
          )}
          {contact?.company ? (
            <Text style={styles.name}>{contact?.company}</Text>
          ) : null}
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
      Toast.show({
        type: 'info',
        text1: 'Syncing Contacts...',
      });
      setSyncLoading(true);
      let body = [];
      if (isSingleContact) {
        body = [contact];
      } else {
        body = selectedContacts;
      }
      body = body.map(_ => ({
        name: _.displayName || `${_.givenName} ${_.middleName} ${_.familyName}`,
        email: (_.emailAddresses.find(__ => __.email) || {}).email || '',
        phone: ((_.phoneNumbers.find(__ => __.number) || {}).number || '')
          .replace(/\D/g, '')
          .slice(-10),
      }));

      isSingleContact;
      await logAnalytics(
        isSingleContact ? 'Add_SingleContact' : 'Add_BulkContact',
        isSingleContact
          ? {
              Name: body[0].name,
              Contact: body[0].phone,
            }
          : {
              Contacts: JSON.stringify(body),
            },
      );

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
        text1: e?.response?.data?.message || 'Something went wrong!',
      });
      setSyncLoading(false);
    }
  };

  let phoneList = [];
  if (pagetype == 'Phone') {
    phoneList = getContactsData().filter(function (val) {
      if (
        val.displayName?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
        (val.company &&
          val.company?.toLowerCase()?.includes(searchValue?.toLowerCase()))
      ) {
        return val;
      }
    });
  }

  useEffect(() => {
    if (searchValue && searchValue.length && searchValue.length > 4) {
      logEvents();
    }
  }, [searchValue]);

  const logEvents = async () => {
    await logAnalytics('Search', {
      Search_Field: searchValue,
      Screen_Name: `Contacts-${pagetype}`,
    });
  };

  const phoneCallDetector = async userData => {
    if (Platform.OS == 'ios') {
      callDetector = new CallDetectorManager(
        async (event, phoneNumber) => {
          if (event == 'Disconnected') {
            let date = new Date();
            let callData = [
              {
                rawType: 2,
                type: 'OUTGOING',
                dateTime: date.toGMTString(),
                phoneNumber: userData.phone,
                duration: 0,
                timestamp: date.getTime(),
                name: userData.name,
                userPhoneNumber: userData.phone,
                createdAt: date.getTime(),
              },
            ];
            const {data} = await createAllContacts(callData);
            if (data?.result && data?.result?.length) {
              dispatch(updateLogs(0, data?.result, data.total));
            }
          }
        },
        false, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
        () => {}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
        {
          title: 'Phone State Permission',
          message:
            'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
        },
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
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
              onPress={() => {
                setSearch('');
                setpageType('Focused');
              }}>
              <Text
                style={
                  pagetype == 'Focused' ? styles.ActiveBtnTxt : styles.BtnTxt
                }>
                Focused
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={pagetype == 'Phone' ? styles.ActiveTopBtn : styles.TopBtn}
              onPress={() => {
                setSearch('');
                setpageType('Phone');
              }}>
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
              //clearButtonMode="always"
              style={styles.SearchInputCss}></TextInput>
          </View>
          {searchValue.length > 0 && (
            <>
              <TouchableOpacity
                onPress={() => setSearch('')}
                activeOpacity={0.5}
                style={styles.crossIcon}>
                <Icon name={'close-circle'} size={20} color={'#1568E5'}></Icon>
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
                <NoDataFound text={'No Contact Found'}></NoDataFound>
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
          data={phoneList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshing={contactsLoader}
          onRefresh={pullToRefreshContacts}
          ListEmptyComponent={
            <NoDataFound text={'No Contact Found'}></NoDataFound>
          }
          //style={styles.list}
        />
      ) : null}
      <Modal
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        style={[
          styles.ModalBg,
          isKeyboardVisible
            ? {justifyContent: 'center'}
            : {justifyContent: 'flex-end'},
        ]}>
        <View style={styles.ModalContainer}>
          <Text style={styles.ModalHeading}>Add Contact</Text>
          <View style={styles.InputWrap}>
            <MyInput
              label="Contact Number"
              keyboardType="number-pad"
              maxLength={10}
              prefix={'+91'}
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
              setContactNum('');
              setModalVisible(false);
            }}
            disabled={
              contactExists || contactNum.length != 10 || contactLoading
            }
            style={
              !contactExists && contactNum.length == 10 && !contactLoading
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
              disabledStyle={styles.disabledBtn}
              disabledTitleStyle={styles.btntxt}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ContactScreen;
