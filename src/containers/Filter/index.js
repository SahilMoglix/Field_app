import React, {isValidElement, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
  Keyboard,
} from 'react-native';
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
import {getRegion, getBranch, getUsers} from '../../services/filter';

const FilterModal = props => {
  const {width: deviceWidth, height: deviceHeight} = useWindowDimensions();

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

  const [filters, setFilters] = useState({
    salesPerson: props.salesPerson || [],
    region: props.region || [],
    branch: props.branch || [],
  });

  const [designation, setDesignation] = useState(props.designation);
  const [regions, setRegions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [users, setUser] = useState([]);
  const [company, setCompany] = useState(props.companyId || '');
  const [plant, setPlant] = useState(props.plantId || '');
  const [startDate, setStartDate] = useState(new Date(props.startDate));
  const [endDate, setEndDate] = useState(new Date(props.endDate));
  const [searchValue, setSearchValue] = useState('');
  const [footerHeight, setFooterHeight] = useState(0);

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
            fromFilterData: true,
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
            fromFilterData: true,
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
            fromFilterData: true,
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
            value:
              typeof startDate == 'string'
                ? startDate
                : startDate.getDate() +
                  '-' +
                  (startDate.getMonth() + 1) +
                  '-' +
                  startDate.getFullYear(),
            onChange: date => setStartDate(date),
            component: CustomeDatePicker,
          },
          {
            title: 'To Date',
            label: 'To Date',
            placeholder: '',
            value:
              typeof endDate == 'string'
                ? endDate
                : endDate.getDate() +
                  '-' +
                  (endDate.getMonth() + 1) +
                  '-' +
                  endDate.getFullYear(),
            onChange: date => setEndDate(date),
            component: CustomeDatePicker,
          },
        ],
      },
    ],
  };

  const COMM_FILTER_DATA = {
    tabs: [
      {
        name: 'Region',
        key: 'region',
        fields: [
          {
            title: 'Region',
            label: 'Region',
            placeholder: '',
            value: 'region',
            onCheck: text => handleCheck('region', text),
            component: DotCheckbox,
            data: regions.map(location => ({
              key: location,
              title: location,
              label: location,
            })),
          },
        ],
      },
      {
        name: 'Branch',
        key: 'branch',
        fields: [
          {
            title: 'Branch',
            label: 'Branch',
            placeholder: '',
            value: 'branch',
            onCheck: text => handleCheck('branch', text),
            component: DotCheckbox,
            data: branches.map(loc => ({
              key: loc,
              title: loc,
              label: loc,
            })),
          },
        ],
      },
      {
        name: 'Sales Person',
        key: 'salesPerson',
        fields: [
          {
            title: 'Sales Person',
            label: 'Sales Person',
            placeholder: '',
            value: 'salesPerson',
            onCheck: text => handleCheck('salesPerson', text),
            component: DotCheckbox,
            data: users.map(user => ({
              key: user,
              title: user,
              label: user,
            })),
          },
        ],
      },
    ],
  };

  useEffect(() => {
    showRegions();
  }, []);

  const showRegions = async () => {
    const {data} = await getRegion();
    setRegions(data?.result);
  };

  const showBranches = async () => {
    const {data} = await getBranch(filters.region);
    setBranches(data?.result);
  };

  const showUsers = async () => {
    const {data} = await getUsers(filters.branch);
    setUser(data?.result?.map(_ => _.name));
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
      let date_today = new Date();
      let first_day_of_the_week = new Date(
        date_today.setDate(date_today.getDate() - date_today.getDay()),
      );
      let last_day_of_the_week = new Date(
        date_today.setDate(date_today.getDate() - date_today.getDay() + 6),
      );
      props.onApplyFilter({
        designation: undefined,
        companyId: undefined,
        plantId: undefined,
        startDate: new Date(
          new Date(first_day_of_the_week).toDateString() + ' 00:00:00',
        ).getTime(),
        endDate: new Date(
          new Date(last_day_of_the_week).toDateString() + ' 23:59:59',
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
            companyId: company || undefined,
            plantId: plant ? String(plant) : undefined,
            startDate: new Date(
              dateConverter(startDate, 'datetime', 'from'),
            ).getTime(),
            endDate: new Date(
              dateConverter(endDate, 'datetime', 'to'),
            ).getTime(),
          });
        }
      } else if (
        filters.branch.length &&
        filters.region.length &&
        filters.salesPerson.length
      ) {
        props.onApplyFilter({
          region: regions,
          branch: branches,
          salesPerson: users,
        });
      }
    }
  };

  const onSearchText = text => {
    setSearchValue(text);
  };
  const handleCheck = (filterType, value) => {
    let filterData = COMM_FILTER_DATA?.tabs?.find(tab => tab.key === filterType)
      ?.fields[0].data;
    if (!filterData) return;
    let key = filterType;
    let currentFilterValues = filters?.[key] || [];
    if (value === 'All') {
      let isAllSelected =
        currentFilterValues?.length === filterData?.length - 1;
      if (isAllSelected) {
        setFilters(prev => ({...prev, [key]: []}));
      } else {
        let allItems = filterData
          .map(item => item.key)
          .filter(key => key !== 'All');
        setFilters(prev => ({...prev, [key]: allItems}));
      }
    } else if (value === 'None') {
      setFilters(prev => ({...prev, [key]: []}));
    } else if (currentFilterValues.includes(value)) {
      setFilters(prev => ({
        ...prev,
        [key]: prev[key].filter(item => item !== value),
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: [...prev[key], value],
      }));
    }
  };
  console.log('FILTERSSSS', filters);

  const renderMutatedFilters = () => {
    //Adding the "All" key to every list
    COMM_FILTER_DATA.tabs.forEach(tab => {
      tab.fields.forEach(field => {
        field.data.unshift({key: 'All', title: 'All', label: 'All'});
      });
    });
    return COMM_FILTER_DATA.tabs[selectedTabIndex]?.fields.map((field, k) => {
      let key = field.value;
      return (
        <View key={k} style={{paddingHorizontal: Dimension.padding15}}>
          <field.component
            {...field}
            searchvalue={searchValue}
            onCheck={value => handleCheck(key, value)}
            selectedValues={filters[key] || []}
          />
        </View>
      );
    });
  };

  const renderApplyFilterView = () => {
    return (
      <TouchableOpacity
        onPress={() => applyFilters()}
        style={styles.acceptCtabtn}>
        <Text style={styles.acceptCtaTxt}>APPLY FILTERS</Text>
      </TouchableOpacity>
    );
  };

  const renderFilterView = () => {
    return (
      <TouchableOpacity
        disabled={
          filters.branch.length &&
          filters.region.length &&
          filters.salesPerson.length
            ? false
            : true
        }
        onPress={() => applyFilters()}
        style={
          filters.branch.length &&
          filters.region.length &&
          filters.salesPerson.length
            ? styles.acceptCtabtn
            : styles.disabledacceptCtabtn
        }>
        <Text style={styles.acceptCtaTxt}>APPLY</Text>
      </TouchableOpacity>
    );
  };

  const renderCorrespondingFilters = () => {
    return (
      <View style={styles.MidWrapper}>
        <View style={styles.leftPart}>
          {!props.fromCommunicationFilter
            ? FILTERS_DATA.tabs.map((_, k) => (
                <TouchableOpacity
                  onPress={() => setSelectedTabIndex(k)}
                  key={k}
                  style={[
                    styles.leftTextBg,
                    k == selectedTabIndex
                      ? styles.leftActiveBackground
                      : styles.leftInactiveBackground,
                  ]}>
                  <Text
                    style={[
                      styles.leftText,
                      k == selectedTabIndex
                        ? styles.LeftActiveTxt
                        : styles.LeftInActiveTxt,
                    ]}>
                    {_.name}
                  </Text>
                </TouchableOpacity>
              ))
            : COMM_FILTER_DATA.tabs.map((_, k) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedTabIndex(k);
                    if (_.name == 'Branch') {
                      showBranches();
                    } else if (_.name == 'Sales Person') {
                      showUsers();
                    }
                  }}
                  key={k}
                  style={[
                    styles.leftTextBg,
                    k == selectedTabIndex
                      ? {backgroundColor: Colors.CallingBgColor}
                      : {backgroundColor: '#fff'},
                  ]}>
                  <Text
                    style={[
                      styles.leftText,
                      k == selectedTabIndex
                        ? {color: Colors.CtaColor}
                        : {color: Colors.FontColor},
                    ]}>
                    {_.name}
                  </Text>
                </TouchableOpacity>
              ))}
        </View>
        <View style={styles.rightPart}>
          {props.fromCommunicationFilter ? (
            <View style={styles.searchWraper}>
              <CustomeIcon name={'search-grey'} size={20} color={'#8E8E93'} />
              <View style={{flex: 4}}>
                <TextInput
                  placeholder={'Search by name, company'}
                  returnKeyType={'search'}
                  onChangeText={onSearchText}
                  value={searchValue}
                  placeholderTextColor={'#8E8E93'}
                  numberOfLines={1}
                  style={styles.SearchInputCss}
                />
              </View>
            </View>
          ) : null}
          <ScrollView
            contentContainerStyle={{
              paddingTop: 20,
              paddingBottom: footerHeight + Dimension.height40,
            }}>
            {!props.fromCommunicationFilter
              ? FILTERS_DATA.tabs[selectedTabIndex].fields.map((_, k) =>
                  _.title == 'Plant' && !company ? (
                    <Text
                      style={{
                        fontSize: Dimension.font14,
                        color: Colors.FontColor,
                        margin: Dimension.margin8,
                        fontFamily: Dimension.CustomMediumFont,
                      }}>
                      Please select company to view plants
                    </Text>
                  ) : (
                    <View
                      key={k}
                      style={{paddingHorizontal: Dimension.padding15}}>
                      <_.component {..._} />
                    </View>
                  ),
                )
              : renderMutatedFilters()}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <Modal
      isVisible={props.filtersModal}
      onTouchOutside={() => {
        props.setFiltersModal(false);
      }}
      onDismiss={() => {
        props.setFiltersModal(false);
      }}
      deviceWidth={deviceWidth}
      style={{padding: 0, margin: 0, flex: 1}}
      onBackdropPress={() => props.setFiltersModal(false)}
      onBackButtonPress={() => props.setFiltersModal(false)}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingTop: Platform.OS == 'android' ? 0 : Dimension.padding40,
          height: deviceHeight,
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
        {renderCorrespondingFilters()}
        <View
          onLayout={event => setFooterHeight(event.nativeEvent.layout.height)}
          style={styles.bottomAction}>
          <TouchableOpacity
            onPress={() => applyFilters(true)}
            style={styles.cancelBtn}>
            <Text style={styles.canceltxt}>RESET</Text>
          </TouchableOpacity>

          {props.fromCommunicationFilter
            ? renderFilterView()
            : renderApplyFilterView()}
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
