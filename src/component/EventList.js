import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';
import CustomeIcon from './CustomeIcon';
import Dimension from '../Theme/Dimension';
import colors from '../Theme/Colors';
import {Button} from 'react-native-elements';

const EventList = props => {
  const {data} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  let meetingLink = '';

  if (data?.body?.content) {
    meetingLink = (data?.body?.content || '')
      .split('"')
      .find(_ => _.includes('https://teams.microsoft.com/l/meetup-join/'));
  }

  return (
    <>
      <View>
        <View style={styles.dateWrap}>
          <Text style={styles.dateTxt}>
            {new Date(data.start.dateTime).toDateString()}{' '}
            {new Date(data.start.dateTime)
              .toLocaleTimeString()
              .split(':')
              .slice(0, 2)
              .join(':')}
          </Text>
        </View>
        <View style={styles.EventWrap}>
          <Text style={styles.eventTitle} numberOfLines={1}>
            {data.subject}
          </Text>
          {data.attendees && data.attendees.length ? (
            <View style={{flexDirection: isOpen ? 'column' : 'row'}}>
              <Text style={styles.eventEmail}>
                {data.attendees[0].emailAddress.address}
              </Text>
              {data.attendees.length > 1 ? (
                isOpen ? (
                  <View style={{flexDirection: 'column'}}>
                    {[...data.attendees]
                      .slice(1, data.attendees.length + 1)
                      .map((address, addressKey) => (
                        <Text key={addressKey} style={styles.eventEmail}>
                          {address.emailAddress.address}
                        </Text>
                      ))}
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        onPress={() => setIsOpen(false)}
                        style={styles.bluetxt}>
                        {' '}
                        Show Less{' '}
                      </Text>
                      <CustomeIcon
                        name={'icon_Below'}
                        color={colors.CtaColor}
                        size={Dimension.font14}
                        style={{
                          marginTop: -1,
                          transform: [{rotate: '180deg'}],
                        }}></CustomeIcon>
                    </View>
                    {/* add up icon here.... */}
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      onPress={() => setIsOpen(true)}
                      style={styles.bluetxt}>
                      {' '}
                      + {data.attendees.length - 1} Show more{' '}
                    </Text>
                    <CustomeIcon
                      name={'icon_Below'}
                      color={colors.CtaColor}
                      size={Dimension.font14}
                      style={{marginTop: 2}}></CustomeIcon>
                  </View>
                )
              ) : null}
            </View>
          ) : null}
          {!data.bodyPreview?.split('__________')?.[0] ? null : (
            <View style={styles.meetingWrap}>
              <Text style={styles.meetingheading}>Meeting Agenda</Text>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <Text
                  style={styles.meetingval}
                  numberOfLines={showMore ? null : 1}>
                  {data.bodyPreview?.split('__________')?.[0]}
                </Text>
                {showMore ? null : (
                  <Text
                    onPress={() => setShowMore(true)}
                    style={styles.bluetxt}>
                    ...More
                  </Text>
                )}
              </View>
            </View>
          )}
          {meetingLink ? (
            <Button
              disabled={
                new Date().toISOString().split('T')[0] != data.start.date
              }
              onPress={() => Linking.openURL(meetingLink)}
              title="Join Teams Meeting"
              buttonStyle={
                new Date().toISOString().split('T')[0] == data.start.date
                  ? styles.btnStyle
                  : styles.disableBtn
              }
              titleStyle={
                new Date().toISOString().split('T')[0] == data.start.date
                  ? styles.btntxt
                  : styles.disableBtnTxt
              }
              containerStyle={styles.btnContainer}
            />
          ) : null}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  btntxt:
    Platform.OS === 'ios'
      ? {
          color: colors.WhiteColor,
          fontSize: Dimension.font14,
          fontFamily: Dimension.CustomBoldFont,
          fontWeight: '700',
        }
      : {
          color: colors.WhiteColor,
          fontSize: Dimension.font14,
          fontFamily: Dimension.CustomBoldFont,
        },
  btnStyle: {
    backgroundColor: colors.CtaColor,
    borderRadius: 50,
    paddingHorizontal: Dimension.padding30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  disableBtn: {
    borderRadius: 50,
    paddingHorizontal: Dimension.padding30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#C1C1C1',
  },
  disableBtnTxt: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomBoldFont,
    color: colors.WhiteColor,
  },
  btnContainer: {
    marginTop: Dimension.margin10,
  },
  EventWrap: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    paddingHorizontal: Dimension.padding25,
    paddingVertical: Dimension.padding15,
    position: 'relative',
    marginBottom: Dimension.margin10,
  },
  eventTitle: {
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomMediumFont,
    color: colors.FontColor,
  },
  eventEmail: {
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomRegularFont,
    color: colors.DateBgColor,
  },
  meetingheading: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomRegularFont,
    color: colors.DateBgColor,
  },
  meetingval: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomRegularFont,
    color: colors.FontColor,
  },
  meetingWrap: {
    paddingTop: Dimension.padding12,
  },
  bluetxt: {
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: colors.CtaColor,
  },
  dateTxt: {
    fontSize: Dimension.font12,
    fontFamily: Dimension.CustomMediumFont,
    color: colors.FontColor,
  },
  dateWrap: {
    paddingVertical: Dimension.padding10,
    paddingHorizontal: Dimension.padding20,
  },
});
export default EventList;
