import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import Calendars from '../../component/Calendars';
import EventList from '../../component/EventList';
import styles from './style';
import Dimension from '../../Theme/Dimension';
import CustomeIcon from '../../component/CustomeIcon';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../../Theme/Colors';
import {useNavigation} from '@react-navigation/native';
import FilterModal from '../Filter';
const CalendarScreen = () => {
  const [type, setType] = useState('cal');
  const [filtersModal, setFiltersModal] = useState(false);
  const navigation = useNavigation();
  const GotoFilter = () => {
    setFiltersModal(true);
    console.log('jskdjsd' + filtersModal);
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: Dimension.margin40,
        backgroundColor: '#fff',
      }}>
      <View style={styles.headerWrap}>
        <View style={styles.TopHeader}>
          <Text style={styles.headingTxt}>Calendar</Text>
        </View>
        <View style={styles.rightWrap}>
          <TouchableOpacity
            onPress={() => setType('cal')}
            style={
              type == 'cal' ? styles.activRightBtn : styles.InactivRightBtn
            }>
            <CustomeIcon
              name={'Calendar-black'}
              size={18}
              color={type == 'cal' ? '#1568E5' : '#3c3c3c'}></CustomeIcon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setType('list')}
            style={
              type == 'cal' ? styles.InactivRightBtn : styles.activRightBtn
            }>
            <CustomeIcon
              name={'List-black'}
              size={18}
              color={type != 'cal' ? '#1568E5' : '#3c3c3c'}></CustomeIcon>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {type == 'cal' ? (
          <Calendars></Calendars>
        ) : (
          <View>
            <TouchableOpacity style={styles.filterbtn} onPress={GotoFilter}>
              <CustomeIcon
                name={'Filter-blue'}
                color={Colors.CtaColor}
                size={20}></CustomeIcon>
              <Text style={styles.filtertxt}>Filter</Text>
            </TouchableOpacity>
          </View>
        )}
        <EventList></EventList>
      </ScrollView>
      {filtersModal && (
        <FilterModal
          setFiltersModal={setFiltersModal}
          filtersModal={filtersModal}
        />
      )}
    </View>
  );
};

export default CalendarScreen;
