import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Contacts from 'react-native-contacts';
import Modal from 'react-native-modal';
import Dimension from '../../Theme/Dimension';
import styles from './style';
import CustomeIcon from '../../component/CustomeIcon';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import DotCheckbox from '../../component/Checkbox';
import CustomeDatePicker from '../../component/Datepicker';
import {useSelector} from 'react-redux';
import Colors from '../../Theme/Colors';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const FilterModal = props => {
  const navigation = useNavigation();

  const Designations = useSelector(state =>
    state.homepageReducer.get('designations'),
  );
  const PlantsData = useSelector(state =>
    state.homepageReducer.get('companyPlant'),
  );
  const CompanyData = useSelector(state =>
    state.homepageReducer.get('company'),
  );

  const [filterFromDate, setfilterFromDate] = useState(new Date());
  const [filterToDate, setFilterToDate] = useState(new Date());
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [designation, setDesignation] = useState(props.designation);
  const [company, setCompany] = useState(props.company);
  const [plant, setPlant] = useState(props.plant);
  const [startDate, setStartDate] = useState(new Date(props.startDate));
  const [endDate, setEndDate] = useState(new Date(props.endDate));

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
            data: Designations.toArray().map(_ => ({
              key: _,
              title: _,
              label: _,
            })),
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
            data: CompanyData.toArray().map(_ => ({
              ..._,
              title: _.value,
              label: _.value,
            })),
          },
        ],
      },
      {
        name: 'Plant',
        key: 'Plant',
        fields: [
          {
            title: 'Plant',
            label: 'Plant',
            placeholder: '',
            value: plant,
            onCheck: text => setPlant(text),
            component: DotCheckbox,
            data: (PlantsData.get(company) || []).map(_ => ({
              ..._,
              title: _.value,
              label: _.value,
            })),
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
          : updatedparams.split('-')[2] +
            '-' +
            updatedparams.split('-')[1] +
            '-' +
            updatedparams.split('-')[0];
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
    if (fromReset) {
      let curr = new Date();
      let first = curr.getDate() - curr.getDay();
      let last = first + 6;
      props.onApplyFilter({
        designation: undefined,
        company: undefined,
        plant: undefined,
        startDate: new Date(
          new Date(curr.setDate(first)).toDateString() + ' 00:00:00',
        ).getTime(),
        endDate: new Date(
          new Date(curr.setDate(last)).toDateString() + ' 23:59:59',
        ).getTime(),
      });
    } else {
      if (startDate && endDate) {
        if (
          new Date(dateConverter(startDate, 'datetime', 'from')).getTime() >
          new Date(dateConverter(endDate, 'datetime', 'to')).getTime()
        ) {
          Toast.show({
            type: 'error',
            text1: 'Selected start date must be less than end date',
          });
        } else {
          props.onApplyFilter({
            designation,
            company,
            plant: String(plant),
            startDate: new Date(
              dateConverter(startDate, 'datetime', 'from'),
            ).getTime(),
            endDate: new Date(
              dateConverter(endDate, 'datetime', 'to'),
            ).getTime(),
          });
        }
      }
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
            {FILTERS_DATA.tabs[selectedTabIndex].fields.map((_, k) =>
              _.title == 'Plant' && !company ? (
                <Text
                  style={{
                    fontSize: Dimension.font14,
                    color: Colors.FontColor,
                    margin: Dimension.margin8,
                  }}>
                  Please select company to view plants
                </Text>
              ) : (
                <View key={k} style={{paddingHorizontal: Dimension.padding15}}>
                  <_.component {..._} />
                </View>
              ),
            )}
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
      <Toast />
    </Modal>
  );
};

export default FilterModal;
