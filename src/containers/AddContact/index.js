import React, {useState} from 'react';
import {Text, ScrollView, View, Platform, TouchableOpacity} from 'react-native';
import {Card, Button, Icon, Avatar} from 'react-native-elements';
import styles from './style';
//import APPHeader from '../../component/common/APPHeader';
// import CreateEvent from '../../component/common/CreateEvent';
//import Camera  from '../../component/common/Camera'
// import DateTimePicker from '@react-native-community/datetimepicker';
import CustomeIcon from '../../component/CustomeIcon';
import Dimension from '../../Theme/Dimension';
import colors from '../../Theme/Colors';
//import {ContactService} from '../../services/ContactService';
import MyInput from '../../component/floatingInput';
import DropDown from '../../component/DropDown';
import {useNavigation} from '@react-navigation/native';
import DotCheckbox from '../../component/Checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {createContact} from '../../services/contacts';
import {fetchContacts} from '../../redux/actions/contacts';
import {deleteContact} from 'react-native-contacts';
// import { launchImageLibrary } from 'react-native-image-picker';
//import RNFetchBlob from 'rn-fetch-blob';
//import CONSTANTS from "../../services/constant";
//import SyncStorage from 'sync-storage';

const AddContact = props => {
  const disptch = useDispatch();
  const {params} = props.route;

  const Designations = useSelector(state =>
    state.homepageReducer.get('designations'),
  );
  const DepartmentData = useSelector(state =>
    state.homepageReducer.get('departments'),
  );
  const PlantsData = useSelector(state =>
    state.homepageReducer.get('companyPlant'),
  );
  const CompanyData = useSelector(state =>
    state.homepageReducer.get('company'),
  );

  const [name, setName] = useState(params.name);
  const [phone, setPhone] = useState(params.phone);
  const [email, setEmail] = useState(params.email);
  const [inclination, setInclination] = useState(props.inclination);
  const [company, setCompany] = useState(params.company);
  const [plant, setPlant] = useState(params.plant);
  const [designation, setDesignation] = useState(params.designation);
  const [department, setDepartment] = useState(params.department);
  const [whatsappContact, setWhatsappContact] = useState(
    params.whatsappContact,
  );
  const [visibleCamera, setCamera] = useState(false);
  const [loading, setLoading] = useState(false);

  const InclinationData = [
    {
      title: 'Promoter',
      label: 'Promoter',
      key: 'Promoter',
    },
    {
      title: 'Detractor',
      label: 'Detractor',
      key: 'Detractor',
    },
    {
      title: 'Neutral',
      label: 'Neutral',
      key: 'Neutral',
    },
  ];

  const FIELDS = [
    {
      component: MyInput,
      label: 'Name',
      RightIconName: '',
      defaultValue: name,
      value: name,
      onChangeText: text => setName(text),
      keyboardType: 'qwerty',
      editable: true,
      maxLength: null,
      onSubmitEditing: () => {},
      Placeholder: 'Name',
      IconName: 'Name-Icon-Grey',
      RightIconView: () => null,
    },
    {
      component: MyInput,
      label: 'Contact',
      RightIconName: '',
      defaultValue: phone,
      value: phone,
      onChangeText: text => setPhone(text),
      keyboardType: 'number-pad',
      editable: true,
      maxLength: null,
      onSubmitEditing: () => {},
      Placeholder: 'Contact',
      IconName: 'call-grey',
      RightIconView: () => null,
    },
    {
      component: MyInput,
      label: 'Email',
      RightIconName: '',
      defaultValue: email,
      value: email,
      onChangeText: text => setEmail(text),
      keyboardType: 'qwerty',
      editable: true,
      maxLength: null,
      onSubmitEditing: () => {},
      Placeholder: 'Email',
      IconName: 'Mail-grey',
      RightIconView: () => null,
    },
    {
      component: DotCheckbox,
      IconName: 'Inclination-grey',
      label: 'Inclination',
      from: 'addContact',
      data: InclinationData,
      horizontalView: false,
      onCheck: val => setInclination(val),
      value: inclination,
    },
    {
      component: DropDown,
      onValueChange: val => setDesignation(val),
      IconName: 'Designation-grey',
      label: 'Designation',
      options: Designations.toArray().map(_ => ({
        value: _,
        label: _,
      })),
      value: designation,
    },
    {
      component: DropDown,
      onValueChange: val => {
        setCompany(val);
        setPlant('');
      },
      IconName: 'company-grey',
      label: 'Company',
      options: CompanyData.toArray().map(_ => ({
        value: _.key,
        label: _.value,
      })),
      value: (
        CompanyData.toArray()
          .map(_ => ({
            value: _.key,
            label: _.value,
          }))
          .find(_ => _.value == company) || {}
      ).label,
    },
    {
      component: DropDown,
      onValueChange: val => setPlant(val),
      IconName: 'Plant-grey',
      label: 'Plant',
      options: (PlantsData.get(company) || []).map(_ => ({
        value: _.key,
        label: _.value,
      })),
      value: (
        (PlantsData.get(company) || [])
          .map(_ => ({
            value: _.key,
            label: _.value,
          }))
          .find(_ => _.value == plant) || {}
      ).label,
    },
    {
      component: DropDown,
      onValueChange: val => setDepartment(val),
      IconName: 'Department-grey',
      label: 'Department',
      options: DepartmentData.toArray().map(_ => ({
        value: _._id,
        label: _.departmentName,
      })),
      value: (DepartmentData.toArray().find(_ => _._id == department) || {})
        .departmentName,
    },
    {
      component: MyInput,
      label: 'WhatsApp Number',
      RightIconName: '',
      defaultValue: whatsappContact,
      value: whatsappContact,
      onChangeText: text => setWhatsappContact(text),
      keyboardType: 'qwerty',
      editable: true,
      maxLength: null,
      onSubmitEditing: () => {},
      Placeholder: 'WhatsApp Number',
      IconName: 'Whatsaap-grey',
      RightIconView: () => null,
    },
  ];

  const [photo, setPhoto] = useState(
    'https://www.rattanhospital.in/wp-content/uploads/2020/03/user-dummy-pic.png',
  );

  const [photoObject, setObject] = useState([
    {type: 'image/jpeg', filename: 'dummy.jpg'},
  ]);

  const navigation = useNavigation();

  const submitButton = async () => {
    setLoading(true);
    const {data} = await createContact({
      name,
      phone,
      email,
      inclination,
      company,
      plant,
      designation,
      department,
      whatsappContact,
    });
    console.log(data);
    if (data.status) {
      props.navigation.goBack();
      disptch(fetchContacts());
    }
    setLoading(false);
    // ContactService.AddContact(finalData).then(response => {
    //     console.log("image uplaod response ",response)
    //     if(response.code==200 && response.success){
    //          alert(response.message)
    //          //handleImageUpload(response.data.id);
    //          props.navigation.goBack()
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //    // throw alert(err);
    //   });
  };

  const handleImageUpload = id => {
    // const realPath = Platform.OS === 'ios' ? photoObject.uri.replace('file://', '') : photoObject.uri;
    // RNFetchBlob.fetch('POST', CONSTANTS.API_BASE_URL+'/api/contact/'+id+'/addImage', {
    //   'Authorization': SyncStorage.get('token'),
    //   'Content-Type' : 'multipart/form-data',
    //     }, [
    //       { name : 'image',type:photoObject.type, filename : photoObject.fileName,
    //       data: RNFetchBlob.wrap(decodeURIComponent(realPath)),
    //       },
    //     ]).then((resp) => {
    //       console.log(resp.data)
    //     });
  };

  const handleCamera = cam => {
    setPhoto(cam.assets[0].uri);
    setObject(cam.assets[0]);
    setCamera(visibleCamera => !visibleCamera);
  };

  const handleGallery = camDetail => {
    setPhoto(camDetail.assets[0].uri);
    setObject(camDetail.assets[0]);
    setCamera(visibleCamera => !visibleCamera);
  };

  const onRemove = async () => {
    const {data} = await deleteContact(props.route.params.id);
    if (data.success) {
      disptch(fetchContacts());
      props.navigation.goBack();
    } else {
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          // marginTop: Dimension.margin40,
          backgroundColor: '#fff',
        }}>
        <View style={styles.headerWrap}>
          <View style={styles.TopHeader}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginTop: 2}}>
              <CustomeIcon
                name={'Back-black'}
                color={colors.FontColor}
                size={Dimension.font20}></CustomeIcon>
            </TouchableOpacity>
            <Text style={styles.headingTxt}>
              {props.route.params.hasOwnProperty('newContact') ? 'Add' : 'Edit'}{' '}
              Contact
            </Text>
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
              <TouchableOpacity
                onPress={() => setCamera(visibleCamera => !visibleCamera)}
                style={styles.addPhotoBtn}>
                <Text style={styles.addPhotoText}>
                  {props.route.params.hasOwnProperty('newContact')
                    ? 'Add'
                    : 'Update'}{' '}
                  Photo
                </Text>
              </TouchableOpacity>
            </Card>
            {/* <DotCheckbox
              IconName={'Inclination-grey'}
              label={'Inclination'}
              from={'addContact'}
              data={InclinationData}
              horizontalView={true}></DotCheckbox>
             */}

            {FIELDS.map((field, fieldKey) => (
              <field.component {...field} key={fieldKey} />
            ))}
            {/* {visibleCamera && <Camera onSelectCamera={handleCamera} onSelectGallery={handleGallery}/>}  */}
          </View>
          {!props.route.params.hasOwnProperty('newContact') ? (
            <TouchableOpacity
              onPress={onRemove}
              style={{alignSelf: 'center', marginTop: Dimension.margin20}}>
              <Text style={{color: 'red'}}>Remove</Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
        {props.route.params.hasOwnProperty('newContact') ? (
          <View style={styles.BtnWrapper}>
            <View style={{flex: 1}}>
              <Button
                onPress={() => props.navigation.goBack()}
                title="Cancel"
                disabled={loading}
                buttonStyle={styles.CancelbtnStyle}
                titleStyle={styles.Cancelbtntxt}
                containerStyle={styles.btnContainer}
              />
            </View>
            <View style={{flex: 1}}>
              <Button
                onPress={submitButton}
                title="Save"
                loading={loading}
                disabled={loading}
                buttonStyle={styles.btnStyle}
                titleStyle={styles.btntxt}
                containerStyle={styles.btnContainer}
              />
            </View>
          </View>
        ) : null}
      </View>
    </>
  );
};

export default AddContact;
