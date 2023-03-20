import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import {
  PermissionsAndroid,
  View,
  Text,
  Platform,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Contacts from "react-native-contacts";
import Modal from "react-native-modal";
import Dimension from "../../Theme/Dimension";
import styles from "./style";
import CustomeIcon from '../../component/CustomeIcon';

import { useNavigation } from "@react-navigation/native";
import MyInput from "../../component/floatingInput"
import DotCheckbox from "../../component/Checkbox";
import CustomeDatePicker from "../../component/Datepicker";

const FilterScreen = (props) => {
  const navigation = useNavigation();
  const [filterFromDate, setfilterFromDate] = useState(new Date());
  const [filterToDate, setFilterToDate] = useState(new Date());
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  useEffect(() => {
   
  }, []);
const filterRadioBtnData =[
  {
    title: 'All',
    label: 'All',
    key:'All'
    
  },
  {
    title: 'Procurement Manager',
    label: 'Procurement Manager',
    key:'Procurement Manager'
    
  },
  {
    title: 'CEO',
    label: 'CEO',
    key:'CEO'
    
  },
  {
    title: 'User',
    label: 'User',
    key:'User'
    
  },
]
const CompanyData =[
  {
    title: 'All',
    label: 'All',
    key:'All'
    
  },
  {
    title: 'Moglix',
    label: 'Moglix',
    key:'Moglix'
    
  },
  {
    title: 'TCS',
    label: 'TCS',
    key:'TCS'
    
  },
  {
    title: 'Infosys',
    label: 'Infosys',
    key:'Infosys'
    
  },
]
const PlantData =[
  {
    title: 'plant1',
    label: 'plant1',
    key:'plant1'
    
  },
  {
    title: 'plant2',
    label: 'plant2',
    key:'plant2'
    
  },
  {
    title: 'plant3',
    label: 'plant3',
    key:'plant3'
    
  },
  {
    title: 'plant4',
    label: 'plant4',
    key:'plant4'
    
  },
]
const FILTERS_DATA = {
   
    tabs: [
      {
        name: 'Designation',
        key: 'Designation',
        fields: [
          {
            title: 'Designation',
            label: 'Designation',
            placeholder: '',
           // onChangeText: text => setPoId(text),
            component: DotCheckbox,
            data:filterRadioBtnData
           
          },
        ],
      },
      {
        name: 'Company',
        key: 'Company',
        fields: [
          {
            title: 'Company',
            label: 'Company',
            placeholder: '',
           // value: invoiceFromDate,
           // onChange: date => setInvoiceFromDate(date),
           component: DotCheckbox,
           data:CompanyData
          },
          
        ],
      },
      {
        name: 'plant',
        key: 'plant',
        fields: [
          {
            title: 'Plant',
            label: 'Plant',
            placeholder: '',
           // value: invoiceFromDate,
           // onChange: date => setInvoiceFromDate(date),
           component: DotCheckbox,
           data:PlantData
          },
          
        ],
      },
      {
        name: 'Date',
        key: 'Date',
        fields: [
          {
            title: 'From Date',
            label: 'From Date',
            placeholder: '',
            value: filterFromDate,
            onChange : date => setfilterFromDate(date),
            component: CustomeDatePicker,
           
          },
          {
            title: 'to Date',
            label: 'to Date',
            placeholder: '',
            value: filterToDate,
            onChange : date => setFilterToDate(date),
            component: CustomeDatePicker,
           
          },
        ],
      },
    ],
  

};



const goBack = () =>{
  navigation.goBack();
}

  return (
    <View
      style={{
        flex: 1,
        marginTop: Dimension.margin40,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.headerWrap}>
        <View style={styles.TopHeader}>
          <TouchableOpacity onPress={goBack}>
          <CustomeIcon name={"Back-black"} color={"#272727"} size={20}></CustomeIcon>
          </TouchableOpacity>
          <Text style={styles.headingTxt}>Filter</Text>
        </View>
        </View>
        
      
      <View style={styles.MidWrapper}>
          <View style={styles.leftPart}>
          {FILTERS_DATA.tabs.map((_, k) => ( 
              <TouchableOpacity
                onPress={() => setSelectedTabIndex(k)}
               key={k}
                style={[
                  k == selectedTabIndex
                     ? styles.activeBackground
                    : styles.inactiveBackground,
                ]}>
                <Text
                  style={[
                    k == selectedTabIndex
                      ? styles.LeftActiveTxt
                      : styles.LeftInActiveTxt,
                  ]}>
                  {_.name}
                </Text>
              </TouchableOpacity>
          ))}
              {/* <TouchableOpacity
              
                style={[styles.inactiveBackground,]}>
                <Text
                  style={[styles.LeftInActiveTxt,
                  ]}>
                  Company
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
              
                style={[styles.inactiveBackground,]}>
                <Text
                  style={[styles.LeftInActiveTxt,
                  ]}>
                  Plant
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
              
                style={[styles.inactiveBackground,]}>
                <Text
                  style={[styles.LeftInActiveTxt,
                  ]}>
                  Date
                </Text>
              </TouchableOpacity> */}
         
          </View>
          <View style={styles.rightPart}>

          {FILTERS_DATA.tabs[selectedTabIndex].fields.map(
              (_, k) => (
                <View key={k} style={{paddingHorizontal: Dimension.padding15}}>
                  <_.component {..._} />
                </View>
              ),
            )}
                {/* <DotCheckbox data={filterRadioBtnData}></DotCheckbox>
                <DotCheckbox title={'Developer'}></DotCheckbox>
                <CustomeDatePicker title={'from Date'} label={'from Date'} value= {filterFromDate}
              onChange = {date => setfilterFromDate(date)}></CustomeDatePicker> */}
          </View>
        </View>
        <View style={styles.bottomAction}>
          <TouchableOpacity
            onPress={() => goBack()}
            style={styles.cancelBtn}>
            <Text style={styles.canceltxt}>RESET</Text>
          </TouchableOpacity>
          <TouchableOpacity
            //onPress={() => applyFilters()}
            style={styles.acceptCtabtn}>
            <Text style={styles.acceptCtaTxt}>APPLY FILTERS</Text>
          </TouchableOpacity>
        </View>

      
      
     
    </View>
  );
};

export default FilterScreen;
