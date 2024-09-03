import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import Calendars from '../../component/Calendars';
import EventList from '../../component/EventList';
import styles from './style';
import CustomeIcon from '../../component/CustomeIcon';
import Colors from '../../Theme/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCalendar,
  fetchCustomCalendar,
  fetchMonthCalendar,
} from '../../redux/actions/calendar';
import {STATE_STATUS} from '../../redux/constants';
import FilterModal from '../Filter';
import {
  fetchDepartments,
  fetchDesignations,
  fetchPlantCompanies,
} from '../../redux/actions/homepage';
import NoDataFound from '../../component/NoDataFound';
import logAnalytics from '../../services/analytics';

const CalendarScreen = () => {
  const meetingsData = useSelector(state =>
    state.calendarReducer.getIn(['day', 'data']),
  );
  const meetingsStatus = useSelector(state =>
    state.calendarReducer.getIn(['day', 'status']),
  );

  const meetingsCustomData = useSelector(state =>
    state.calendarReducer.getIn(['custom', 'data']),
  );
  const meetingsCustomParams = useSelector(
    state => state.calendarReducer.getIn(['custom', 'params']) || {},
  );
  const meetingsCustomStatus = useSelector(state =>
    state.calendarReducer.getIn(['custom', 'status']),
  );

  const meetingsMonthData = useSelector(state =>
    state.calendarReducer.getIn(['month', 'data']),
  );

  console.log(meetingsCustomParams, 'custom params!!');

  const dispatch = useDispatch();

  const [type, setType] = useState('list');
  const [filtersModal, setFiltersModal] = useState(false);
  const [monthYearData, setMonthYearData] = useState({});
  const [currentDate, setCurrentDate] = useState('');
  const [st, setSt] = useState('');

  const gotoFilter = () => {
    setFiltersModal(true);
  };

  const applyFilters = async params => {
    console.log('params', params);
    await logAnalytics('Calendar_ApplyFilter', {
      Selected_Fields: JSON.stringify(params),
    });
    setFiltersModal(false);
    dispatch(fetchCustomCalendar(params));
  };

  useEffect(() => {
    let date_today = new Date();
    let first_day_of_the_week = new Date(
      date_today.setDate(date_today.getDate() - date_today.getDay()),
    );
    let last_day_of_the_week = new Date(
      date_today.setDate(date_today.getDate() - date_today.getDay() + 6),
    );
    dispatch(
      fetchCustomCalendar({
        designation: undefined,
        companyId: undefined,
        plantId: undefined,
        startDate: new Date(
          new Date(first_day_of_the_week).toDateString() + ' 00:00:00',
        ).getTime(),
        endDate: new Date(
          new Date(last_day_of_the_week).toDateString() + ' 23:59:59',
        ).getTime(),
      }),
    );
    dispatch(fetchDesignations());
    dispatch(fetchPlantCompanies());
    dispatch(fetchDepartments());
  }, []);

  const updateDate = (date, onDemand) => {
    setCurrentDate(date);
    dispatch(
      fetchCalendar(
        new Date(date + ' 00:00:00').getTime(),
        new Date(date + ' 23:59:59').getTime(),
        onDemand,
      ),
    );
  };

  const updateMonthData = (monthYear, onDemand) => {
    setMonthYearData(monthYear);
    dispatch(
      fetchMonthCalendar({
        startDate: new Date(
          `${monthYear.year}-${monthYear.month}-01` + ' 00:00:00',
        ).getTime(),
        endDate: new Date(
          `${monthYear.year}-${monthYear.month}-${new Date(
            monthYear.year,
            monthYear.month,
            0,
          ).getDate()}` + ' 23:59:59',
        ).getTime(),
        pullFromAzure: onDemand,
      }),
    );
  };

  const timestampToFormattedDate = timestamp => {
    let milliseconds = timestamp > 10000000000 ? timestamp : timestamp * 1000;
    let date = new Date(milliseconds);
    if (isNaN(date.getTime())) {
      console.error('Invalid date', {timestamp, milliseconds, date});
      return 'Invalid date';
    }
    let day = String(date.getDate()).padStart(2, '0');
    let month = date.toLocaleString('en-US', {month: 'long'}); // Explicit locale
    let year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // const getStartReadbelDate = () => {
  //   return c;
  // };

  // const getEndReadableDate = () => {
  //   return new Date(meetingsCustomParams?.startDate).toDateString();
  // };

  // useEffect(() => {
  //   setSt(new Date(meetingsCustomParams?.startDate).toDateString());
  // }, [meetingsCustomParams?.startDate]);

  // alert(new Date(me`etingsCustomParams?.startDate).toDateString());
  // alert(meetingsCustomParams?.startDate);

  // const getRangeText = () => {
  //   console.log(
  //     'start date and end date',
  //     meetingsCustomParams?.fromDate,
  //     meetingsCustomParams,
  //   );
  //   alert(meetingsCustomParams?.fromDate);
  //   if (meetingsCustomParams?.fromDate && meetingsCustomParams?.toDate) {
  //     return `${meetingsCustomParams?.fromDate} to ${meetingsCustomParams?.toDate}`;
  //     // return `${new Date(
  //     //   (meetingsCustomParams?.fromDate || '22-08-2024')
  //     //     ?.split('-')
  //     //     .reverse()
  //     //     .join('-'),
  //     // ).toLocaleDateString('en-GB', {
  //     //   day: '2-digit',
  //     //   month: 'short',
  //     //   year: 'numeric',
  //     // })} to ${new Date(
  //     //   meetingsCustomParams?.toDate?.split('-').reverse().join('-'),
  //     // ).toLocaleDateString('en-GB', {
  //     //   day: '2-digit',
  //     //   month: 'short',
  //     //   year: 'numeric',
  //     // })} `;
  //   } else {
  //     return `${new Date()?.toLocaleDateString('en-GB', {
  //       day: '2-digit',
  //       month: 'short',
  //       year: 'numeric',
  //     })} to ${new Date()?.toLocaleDateString('en-GB', {
  //       day: '2-digit',
  //       month: 'short',
  //       year: 'numeric',
  //     })}`;
  //   }
  // };

  const getRangeText = () => {
    console.log(
      'show dates',
      meetingsCustomParams.fromDate,
      meetingsCustomParams?.toDate,
    );
    if (meetingsCustomParams?.fromDate && meetingsCustomParams?.toDate) {
      return `${formattedDate(
        meetingsCustomParams.fromDate,
      )} to ${formattedDate(meetingsCustomParams.toDate)}`;
    } else {
      const today = new Date();
      return `${formattedDate(
        today.toISOString().split('T')[0]?.split('-')?.reverse()?.join('-'),
      )} to ${formattedDate(
        today.toISOString().split('T')[0].split('-')?.reverse()?.join('-'),
      )}`;
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

  const formattedDate = dateStr => {
    console.log(dateStr, 'date Str is present!!');
    if (!dateStr) return '';
    const [day, month, year] = dateStr?.split('-').map(Number);
    return `${day} ${
      [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ][month - 1]
    } ${year}`;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View style={styles.headerWrap}>
        <Text style={styles.headingTxt}>Calendar</Text>
        <View style={styles.rightWrap}>
          <TouchableOpacity
            onPress={() => setType('list')}
            style={
              type == 'cal' ? styles.InactivRightBtn : styles.activRightBtn
            }>
            <CustomeIcon
              name={'List-black'}
              size={18}
              style={{marginTop: Platform.OS === 'ios' ? 2 : 0}}
              color={type != 'cal' ? '#1568E5' : '#3c3c3c'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setType('cal')}
            style={
              type == 'cal' ? styles.activRightBtn : styles.InactivRightBtn
            }>
            <CustomeIcon
              name={'Calendar-black'}
              size={18}
              style={{marginTop: Platform.OS === 'ios' ? 2 : 0}}
              color={type == 'cal' ? '#1568E5' : '#3c3c3c'}
            />
          </TouchableOpacity>
        </View>
      </View>
      {type == 'cal' ? (
        <>
          <FlatList
            data={meetingsData.toArray()}
            ListHeaderComponent={
              <Calendars
                meetingsMonthData={meetingsMonthData}
                updateDate={updateDate}
                updateMonthData={updateMonthData}
              />
            }
            keyExtractor={(item, index) => `item-${index}`}
            refreshing={[
              STATE_STATUS.FETCHING,
              STATE_STATUS.UNFETCHED,
            ].includes(meetingsStatus)}
            onRefresh={async () => {
              await logAnalytics('Calendar_Ondemand', {});
              updateDate(currentDate, true);
              updateMonthData(monthYearData, true);
            }}
            renderItem={({item, index}) => (
              <EventList data={item} key={index} />
            )}
            ListEmptyComponent={
              [STATE_STATUS.FETCHING, STATE_STATUS.UNFETCHED].includes(
                meetingsStatus,
              ) ? null : (
                <NoDataFound text={'No event found for the day'}></NoDataFound>
              )
            }
          />
        </>
      ) : (
        <>
          <View style={styles.row}>
            <Text style={styles.dateText}>
              {getRangeText()}
              {/* {meetingsCustomParams?.fromDate &&  meetingsCustomParams?.toDate ? }
              {meetingsCustomParams?.fromDate} to {meetingsCustomParams?.toDate} */}
              {/* {getStartReadbelDate()} - {getEndReadableDate()} */}
              {/* {convertDate()} */}
              {/* {timestampToFormattedDate(
                meetingsCustomParams?.startDate || '',
              )}-{' '}
              {timestampToFormattedDate(meetingsCustomParams?.endDate || '')} */}
              {/* {timestampToDate(meetingsCustomParams?.startDate || '')} */}
              {/* {meetingsCustomParams?.start_date_format} -{' '}
              {meetingsCustomParams?.end_date_format} */}
              {/* {new Date(meetingsCustomParams?.startDate || '')
                .toDateString()
                .split(' ')
                .slice(1, 5)
                .join(' ')}{' '}
              -{' '}
              {new Date(meetingsCustomParams?.endDate || '')
                .toDateString()
                .split(' ')
                .slice(1, 5)
                .join(' ')} */}
            </Text>
            <TouchableOpacity style={styles.filterbtn} onPress={gotoFilter}>
              <CustomeIcon
                name={'Filter-blue'}
                color={Colors.CtaColor}
                size={20}
              />
              <Text style={styles.filtertxt}>Filter</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={meetingsCustomData.toArray()}
            keyExtractor={(item, index) => `item-${index}`}
            refreshing={[
              STATE_STATUS.FETCHING,
              STATE_STATUS.UNFETCHED,
            ].includes(meetingsCustomStatus)}
            onRefresh={async () => {
              await logAnalytics('Calendar_Ondemand', {});
              dispatch(
                fetchCustomCalendar({
                  ...meetingsCustomParams,
                  pullFromAzure: true,
                }),
              );
            }}
            renderItem={({item, index}) => (
              <EventList data={item} key={index} />
            )}
            ListEmptyComponent={
              [STATE_STATUS.FETCHING, STATE_STATUS.UNFETCHED].includes(
                meetingsCustomStatus,
              ) ? null : (
                <NoDataFound text={'No event found for the day'}></NoDataFound>
              )
            }
          />
        </>
      )}
      {filtersModal && (
        <FilterModal
          setFiltersModal={setFiltersModal}
          filtersModal={filtersModal}
          onApplyFilter={applyFilters}
          {...meetingsCustomParams}
        />
      )}
    </View>
  );
};

export default CalendarScreen;
