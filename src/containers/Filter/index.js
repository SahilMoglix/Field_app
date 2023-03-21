import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Contacts from 'react-native-contacts';
import Modal from 'react-native-modal';
import Dimension from '../../Theme/Dimension';
import styles from './style';
import CustomeIcon from '../../component/CustomeIcon';

import {useNavigation} from '@react-navigation/native';
import MyInput from '../../component/floatingInput';
import DotCheckbox from '../../component/Checkbox';
import CustomeDatePicker from '../../component/Datepicker';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const FilterModal = props => {
  const navigation = useNavigation();
  const [filterFromDate, setfilterFromDate] = useState(new Date());
  const [filterToDate, setFilterToDate] = useState(new Date());
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [designation, setDesignation] = useState(props.designation);
  const [company, setCompany] = useState(props.company);
  const [plant, setPlant] = useState(props.plant);
  const [startDate, setStartDate] = useState(new Date(props.startDate));
  const [endDate, setEndDate] = useState(new Date(props.endDate));

  useEffect(() => {}, []);
  const filterRadioBtnData = [
    {
      title: 'All',
      label: 'All',
      key: 'all',
    },
    {
      title: 'Procurement Manager',
      label: 'Procurement Manager',
      key: 'Procurement Manager',
    },
    {
      title: 'CEO',
      label: 'CEO',
      key: 'CEO',
    },
    {
      title: 'User',
      label: 'User',
      key: 'User',
    },
  ];
  const CompanyData = [
    {
      title: 'All',
      label: 'All',
      key: 'All',
    },
    {
      title: 'Moglix',
      label: 'Moglix',
      key: '1',
    },
    {
      title: 'TCS',
      label: 'TCS',
      key: '2',
    },
    {
      title: 'Infosys',
      label: 'Infosys',
      key: '3',
    },
  ];
  const PlantData = [
    {
      title: 'plant1',
      label: 'plant1',
      key: '1',
    },
    {
      title: 'plant2',
      label: 'plant2',
      key: '2',
    },
    {
      title: 'plant3',
      label: 'plant3',
      key: '3',
    },
    {
      title: 'plant4',
      label: 'plant4',
      key: '4',
    },
  ];
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
            value: designation,
            onCheck: text => setDesignation(text),
            component: DotCheckbox,
            data: filterRadioBtnData,
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
            value: company,
            onCheck: text => setCompany(text),
            component: DotCheckbox,
            data: CompanyData,
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
            value: plant,
            onCheck: text => setPlant(text),
            component: DotCheckbox,
            data: PlantData,
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
            value: startDate,
            onChange: date => setStartDate(date),
            component: CustomeDatePicker,
          },
          {
            title: 'to Date',
            label: 'to Date',
            placeholder: '',
            value: endDate,
            onChange: date => setEndDate(date),
            component: CustomeDatePicker,
          },
        ],
      },
    ],
  };

  const dateConverter = (paramDate, dateType, fromTo) => {
    if (paramDate) {
      let updatedparams =
        typeof paramDate == 'string' ? paramDate : paramDate.toDateString();
      let date =
        String(updatedparams.split('-')[0]).length > 2
          ? updatedparams
          : updatedparams.split('-')[1] +
            '-' +
            updatedparams.split('-')[0] +
            '-' +
            updatedparams.split('-')[2];
      let month =
        String(new Date(date).getMonth() + 1).length > 1
          ? String(new Date(date).getMonth() + 1)
          : 0 + String(new Date(date).getMonth() + 1);
      let day =
        String(new Date(date).getDate()).length > 1
          ? String(new Date(date).getDate())
          : 0 + String(new Date(date).getDate());
      if (dateType == 'datetime') {
        return `${new Date(date).getFullYear()}-${month}-${day} ${
          fromTo == 'from' ? '00:00:00' : '23:59:59'
        }`;
      } else {
        return `${new Date(date).getFullYear()}-${month}-${day}`;
      }
    }
    return '';
  };

  const applyFilters = fromReset => {
    console.log(typeof startDate, typeof endDate);
    if (fromReset) {
      props.onApplyFilter({
        designation: 'all',
        company: '',
        plant: '',
        startDate: new Date(new Date().toDateString() + ' 00:00:00').getTime(),
        endDate: new Date(new Date().toDateString() + ' 23:59:59').getTime(),
      });
    } else {
      props.onApplyFilter({
        designation,
        company,
        plant,
        startDate: new Date(
          dateConverter(startDate, 'datetime', 'from'),
        ).getTime(),
        endDate: new Date(dateConverter(startDate, 'datetime', 'to')).getTime(),
      });
    }
  };

  return (
    <Modal
      overlayPointerEvents={'auto'}
      isVisible={props.filtersModal}
      onTouchOutside={() => {
        props.setFiltersModal(false);
      }}
      onDismiss={() => {
        props.setFiltersModal(false);
      }}
      coverScreen={true}
      style={{padding: 0, margin: 0, width: '100%', height: '100%'}}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      hasBackdrop={true}
      onBackdropPress={() => props.setFiltersModal(false)}
      onBackButtonPress={() => props.setFiltersModal(false)}>
      <View
        style={{
          height: deviceHeight,
          width: deviceWidth,
          backgroundColor: '#fff',
        }}>
        <View style={styles.headerWrap}>
          <View style={styles.TopHeader}>
            <TouchableOpacity onPress={() => props.setFiltersModal(false)}>
              <CustomeIcon
                name={'Back-black'}
                color={'#272727'}
                size={20}></CustomeIcon>
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
          </View>
          <View style={styles.rightPart}>
            {FILTERS_DATA.tabs[selectedTabIndex].fields.map((_, k) => (
              <View key={k} style={{paddingHorizontal: Dimension.padding15}}>
                <_.component {..._} />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.bottomAction}>
          <TouchableOpacity
            onPress={() => applyFilters(true)}
            style={styles.cancelBtn}>
            <Text style={styles.canceltxt}>RESET</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => applyFilters()}
            style={styles.acceptCtabtn}>
            <Text style={styles.acceptCtaTxt}>APPLY FILTERS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
