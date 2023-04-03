import React, {useEffect, useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Card, Button, Icon, Avatar} from 'react-native-elements';
import styles from './style';
//import APPHeader from '../../component/common/APPHeader';
// import CreateEvent from '../../component/common/CreateEvent';
//import Camera  from '../../component/common/Camera'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import CustomeIcon from '../../component/common/CustomeIcon';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
//import {ContactService} from '../../services/ContactService';
import MyInput from '../../component/floatingInput';
import CustomeIcon from '../../component/CustomeIcon';
import ContactData from '../../component/contactDetailView';
import {useNavigation} from '@react-navigation/native';
import {getNumberDetails} from '../../services/contacts';
// import { launchImageLibrary } from 'react-native-image-picker';
//import RNFetchBlob from 'rn-fetch-blob';
//import CONSTANTS from "../../services/constant";
//import SyncStorage from 'sync-storage';

const ContactDetail = props => {
  const [contactData, setContactData] = useState({});
  const photo =
    'https://www.rattanhospital.in/wp-content/uploads/2020/03/user-dummy-pic.png';

  const navigation = useNavigation();

  const FIELDS = [
    {
      name: 'Name',
      value: 'name',
    },
    {
      name: 'Contact',
      value: 'phone',
    },
    {
      name: 'Email',
      value: 'email',
    },
    {
      name: 'Inclination with Moglix',
      value: 'inclination',
    },
    {
      name: 'Designation',
      value: 'designation',
    },
    {
      name: 'Plant',
      value: 'plant',
    },
    {
      name: 'Department',
      value: 'department',
    },
    {
      name: 'Company',
      value: 'company',
    },
    {
      name: 'WhatsApp Number',
      value: 'whatsappContact',
    },
  ];

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      onContactFetch();
    });
    return unsubscribe;
  }, [props.navigation]);

  const onContactFetch = async () => {
    const {data} = await getNumberDetails(props.route.params.phone);
    if (data?.result?.length) {
      setContactData(data.result[0]);
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          marginTop: Dimension.margin28,
          backgroundColor: '#fff',
        }}>
        <View style={styles.headerWrap}>
          <View style={styles.TopHeader}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{marginTop: 2}}>
                <CustomeIcon
                  name={'Back-black'}
                  color={colors.FontColor}
                  size={Dimension.font20}></CustomeIcon>
              </TouchableOpacity>
              <Text style={styles.headingTxt}>Contact Detail</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('AddContact', {
                    ...contactData,
                  })
                }
                style={{flexDirection: 'row', marginTop: 5}}>
                <CustomeIcon
                  name={'Edit-blue'}
                  color={colors.CtaColor}
                  size={Dimension.font20}></CustomeIcon>
                <Text style={styles.blueHeadingtxt}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View></View>
        </View>
        <ScrollView
          style={styles.ScrollViewCss}
          contentContainerStyle={{paddingBottom: 180}}>
          <View>
            <Card containerStyle={styles.UserDeatilCardWrapper}>
              <Avatar
                //size={64}
                rounded
                source={{uri: photo}}
                avatarStyle={styles.UserImgIcon}
                containerStyle={styles.UserimgContainer}
              />
            </Card>
            {FIELDS.map((_, index) => (
              <ContactData
                key={index}
                icon={_.value}
                label={_.name}
                value={contactData[_.value]}></ContactData>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ContactDetail;
