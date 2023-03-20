import React, {useState} from 'react';
import {StyleSheet, View, Text, Modal, Platform} from 'react-native';
import CustomeIcon from './CustomeIcon';
import Dimension from '../Theme/Dimension';
import colors from '../Theme/Colors';

const EventList = props => {
  const {data} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  console.log('dwjbedubeuwdbwub');

  return (
    <>
      <View>
        <View style={styles.dateWrap}>
          <Text style={styles.dateTxt}>
            {new Date(data.start.dateTime).toDateString()}
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
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      onPress={() => setIsOpen(true)}
                      style={styles.bluetxt}>
                      {' '}
                      + {data.attendees.length - 1} More{' '}
                    </Text>
                    <CustomeIcon
                      name={'icon_Below'}
                      color={colors.CtaColor}
                      size={Dimension.font14}
                      style={{marginTop: 1}}></CustomeIcon>
                  </View>
                )
              ) : null}
            </View>
          ) : null}
          <View style={styles.meetingWrap}>
            <Text style={styles.meetingheading}>Meeting Agenda</Text>
            <View
              style={{
                flexDirection: 'column',
                // alignItems: 'center',
                // flex: 1,
                // width: '100%',
              }}>
              <Text
                style={styles.meetingval}
                numberOfLines={showMore ? null : 1}>
                {data.bodyPreview}
              </Text>
              {showMore ? null : (
                <Text onPress={() => setShowMore(true)} style={styles.bluetxt}>
                  ...More
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
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
