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
//import Contacts from 'react-native-contacts';
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
    salesPerson: props?.paramsData?.salesPerson || [],
    region: props?.paramsData?.region || [],
    branch: props?.paramsData?.branch || [],
  });

  const [designation, setDesignation] = useState(props.designation);
  const [regions, setRegions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [users, setUser] = useState([]);
  const [company, setCompany] = useState(props.companyId || '');
  const [plant, setPlant] = useState(props.plantId || '');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchValue, setSearchValue] = useState('');
  const [footerHeight, setFooterHeight] = useState(0);
  const [startReadbleDate, setStartReadbleDate] = useState('');
  const [endReadbleDate, setEndReadbleDate] = useState('');

  console.log('start date and end date', startDate, endDate);

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
            value: startDate,
            // value:
            //   typeof startDate == 'string'
            //     ? startDate
            //     : startDate.getDate() +
            //       '-' +
            //       (startDate.getMonth() + 1) +
            //       '-' +
            //       startDate.getFullYear(),
            onChange: date => setStartDate(date),
            component: CustomeDatePicker,
          },
          {
            title: 'To Date',
            label: 'To Date',
            placeholder: '',
            value: endDate,
            // value:
            //   typeof endDate == 'string'
            //     ? endDate
            //     : endDate.getDate() +
            //       '-' +
            //       (endDate.getMonth() + 1) +
            //       '-' +
            //       endDate.getFullYear(),
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
              key: user?.key,
              title: user?.label,
              label: user?.label,
            })),
          },
        ],
      },
    ],
  };

  useEffect(() => {
    if (props.fromCommunicationFilter) {
      showRegions();
    }
  }, [props.fromCommunicationFilter]);

  const showRegions = async () => {
    const {data} = await getRegion();
    setRegions(data?.result);
  };

  const showBranches = async () => {
    const {data} = await getBranch(
      filters?.region?.length ? filters?.region : regions,
    );
    setBranches(data?.result);
  };

  const showUsers = async () => {
    const {data} = await getUsers(
      filters?.branch?.length ? filters?.branch : branches,
    );
    setUser(data?.result?.map(_ => ({key: _.id, label: _.name})));
  };

  const dateConverter = (paramDate, dateType, fromTo) => {
    if (!paramDate) return new Date();

    // Convert input to string and trim whitespace
    let dateStr =
      typeof paramDate === 'string'
        ? paramDate.trim()
        : paramDate.toDateString();

    // Handle "dd-mm-yyyy" format specifically
    const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
    let match = dateStr.match(datePattern);

    if (match) {
      // Convert to "yyyy-mm-dd" format
      dateStr = `${match[3]}-${match[2]}-${match[1]}`;
    } else {
      // Handle other formats and default to ISO format
      try {
        let parsedDate = new Date(paramDate);
        if (isNaN(parsedDate.getTime())) throw new Error('Invalid date');
        dateStr = parsedDate.toISOString().split('T')[0];
      } catch (e) {
        console.error('Date parsing error:', e.message);
        return '';
      }
    }

    // Create a Date object
    let date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.error('Invalid date format:', dateStr);
      return '';
    }

    // Format the date components
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');

    if (dateType === 'datetime') {
      let time = fromTo === 'from' ? '00:00:00' : '23:59:59';
      // Construct ISO 8601 datetime string
      let dateTimeStr = `${year}-${month}-${day}T${time}`;
      try {
        let dateTime = new Date(dateTimeStr);
        if (isNaN(dateTime.getTime())) {
          console.error('Invalid time value:', dateTimeStr);
          return '';
        }
        return dateTimeStr; // Return in 'yyyy-mm-ddTHH:MM:SS' format
      } catch (error) {
        console.error('DateTime parsing error:', error.message);
        return '';
      }
    } else {
      return `${year}-${month}-${day}`;
    }
  };

  const applyCommFilter = fromResetFilter => {
    if (fromResetFilter) {
      let date_today = new Date();
      let first_day_of_the_week = new Date(
        date_today.setDate(date_today.getDate() - date_today.getDay()),
      );
      let last_day_of_the_week = new Date(
        date_today.setDate(date_today.getDate() - date_today.getDay() + 6),
      );
      props.onApplyFilter({
        region: [],
        branch: [],
        salesPerson: [],
        startDate: new Date(
          new Date(first_day_of_the_week).toDateString() + ' 00:00:00',
        ).getTime(),
        endDate: new Date(
          new Date(last_day_of_the_week).toDateString() + ' 23:59:59',
        ).getTime(),
      });
    } else if (
      filters.branch.length ||
      filters.region.length ||
      filters.salesPerson.length
    ) {
      props.onApplyFilter({
        region: filters.region,
        branch: filters.branch,
        salesPerson: filters.salesPerson,
        startDate: new Date(
          dateConverter(startDate, 'datetime', 'from'),
        ).getTime(),
        endDate: new Date(dateConverter(endDate, 'datetime', 'to')).getTime(),
      });
    }
  };

  const isValidDateFormat = dateStr => {
    console.log(dateStr, 'date str!!');
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(dateStr)) {
      return false;
    }
    const [day, month, year] = dateStr?.split('-').map(Number);
    if (
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1000 ||
      year > 9999
    ) {
      return false;
    }

    const date = new Date(year, month - 1, day);
    return (
      date.getDate() === day &&
      date.getMonth() === month - 1 &&
      date.getFullYear() === year
    );
  };

  const parseDate = dateStr => {
    const [day, month, year] = dateStr.split('-');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
      2,
      '0',
    )}`;

    return new Date(formattedDate);
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

        // startDate: new Date(
        //   startDate?.split('-').reverse().join('-') + 'T00:00:00Z',
        // ).getTime(),
        // endDate: new Date(
        //   endDate?.split('-').reverse().join('-') + 'T00:00:00Z',
        // ).getTime(),
        // fromDate: new Date(
        //   startDate?.split('-').reverse().join('-'),
        // ).toLocaleDateString('en-GB', {
        //   day: '2-digit',
        //   month: 'short',
        //   year: 'numeric',
        // }),
        // toDate: new Date(
        //   endDate?.split('-').reverse().join('-'),
        // ).toLocaleDateString('en-GB', {
        //   day: '2-digit',
        //   month: 'short',
        //   year: 'numeric',
        // }),
        // startDate: new Date(
        //   new Date(first_day_of_the_week).toDateString() + ' 00:00:00',
        // ).getTime(),
        // endDate: new Date(
        //   new Date(last_day_of_the_week).toDateString() + ' 23:59:59',
        // ).getTime(),
        // fromDate: startDate,
        // toDate: endDate,
        // start_date_format: new Date(
        //   new Date(
        //     new Date(first_day_of_the_week).toDateString() + ' 00:00:00',
        //   ).getTime(),
        // )?.toDateString(),

        // end_date_format: new Date(
        //   new Date(
        //     new Date(last_day_of_the_week).toDateString() + ' 23:59:59',
        //   ).getTime(),
        // )?.toDateString(),
      });
    } else {
      if (startDate && endDate) {
        // if (
        //   new Date(dateConverter(startDate, 'datetime', 'from')).getTime() >
        //   new Date(dateConverter(endDate, 'datetime', 'to')).getTime()
        // ) {
        //   Toast.show({
        //     type: 'error',
        //     text1: 'Selected start date must be less than end date',
        //   });
        // } else {
        let newStartDate =
          typeof startDate == 'object'
            ? startDate
                .toISOString()
                ?.split('T')[0]
                ?.split('-')
                .reverse()
                .join('-')
            : startDate;
        let newEndDate =
          typeof endDate == 'object'
            ? endDate
                .toISOString()
                ?.split('T')[0]
                ?.split('-')
                .reverse()
                .join('-')
            : endDate;
        console.log(
          'benedict cumberbatch',
          newStartDate,
          newEndDate,
          parseDate(newStartDate)?.getTime(),
          parseDate(newEndDate)?.getTime(),
        );

        props.onApplyFilter({
          designation,
          companyId: company || undefined,
          plantId: plant ? String(plant) : undefined,
          startDate: parseDate(newStartDate)?.getTime(),
          //  new Date(
          //   newStartDate?.split('-')?.reverse()?.join('-'),
          // )?.getTime(),
          endDate: parseDate(newEndDate)?.getTime(),
          // new Date(
          //   newEndDate?.split('-')?.reverse()?.join('-'),
          // )?.getTime(),
          fromDate: newStartDate,
          toDate: newEndDate,
        });
        // }
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

  const renderMutatedFilters = () => {
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
            fromCommunicationFilter={props.fromCommunicationFilter}
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
          filters.branch.length ||
          filters.region.length ||
          filters.salesPerson.length
            ? false
            : true
        }
        onPress={() => applyCommFilter()}
        style={
          filters.branch.length ||
          filters.region.length ||
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
                        : // : (!filters.region.length &&
                          //     (_.name === 'Branch' ||
                          //       _.name === 'Sales Person')) ||
                          //   (_.name === 'Sales Person' && !filters.branch.length)
                          // ? {color: Colors.graySahde1}
                          {color: Colors.FontColor},
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
                      <_.component {..._} searchValue={searchValue} />
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
            onPress={() =>
              props.fromCommunicationFilter
                ? applyCommFilter(true)
                : applyFilters(true)
            }
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
