import React, {useState} from 'react';
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
// import { launchImageLibrary } from 'react-native-image-picker';
//import RNFetchBlob from 'rn-fetch-blob';
//import CONSTANTS from "../../services/constant";
//import SyncStorage from 'sync-storage';

const ContactDetail = props => {
  const [name, setName] = useState();
  const [company, setCompany] = useState();
  const [designation, setDesignation] = useState();
  const [profile, setProfile] = useState();
  const [number, setNumber] = useState();
  const [whatsapp, setWhatsapp] = useState();
  const [visibleCamera, setCamera] = useState(false);
  const [photo, setPhoto] = useState(
    'https://www.rattanhospital.in/wp-content/uploads/2020/03/user-dummy-pic.png',
  );
  const [photoObject, setObject] = useState([
    {type: 'image/jpeg', filename: 'dummy.jpg'},
  ]);
  const navigation = useNavigation();
  const detailData = {
    name: 'Shashikant',
    email: 'shashikant.baghel@moglix.com',
    phone: '9540753012',
    inclination: 'Neutral',
    designation: 'CFO',
    plant: 'dummyplant',
    company: 'dummycompany',
    department: 'dummydepartment',
    whatsappContact: '9540753012',
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          marginTop: Dimension.margin40,
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
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <CustomeIcon
                  name={'Edit-blue'}
                  color={colors.CtaColor}
                  size={Dimension.font20}></CustomeIcon>
                <Text style={styles.headingTxt}>Edit</Text>
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
            <MyInput
              label="Name"
              keyboardType="default"
              IconName={'Name-Icon-Grey'}
              onChangeText={newText => setName(newText)}
            />

            {Object.keys(detailData).map((key, index) => (
              <ContactData label={key} value={detailData[key]}></ContactData>
            ))}
          </View>
        </ScrollView>
        <View style={styles.BtnWrapper}>
          <View style={{flex: 1}}>
            <Button
              //onPress={submitButton}
              title="Cancel"
              buttonStyle={styles.CancelbtnStyle}
              titleStyle={styles.Cancelbtntxt}
              containerStyle={styles.btnContainer}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              // onPress={submitButton}
              title="Save"
              buttonStyle={styles.btnStyle}
              titleStyle={styles.btntxt}
              containerStyle={styles.btnContainer}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ContactDetail;
