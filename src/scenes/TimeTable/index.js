import React, {useRef, useCallback} from 'react';

import {
 StyleSheet,
 View,
 Text,
 TouchableOpacity,
 Image,
 Platform,
} from 'react-native';
import {Images} from 'app-assets';
import {
 ExpandableCalendar,
 AgendaList,
 CalendarProvider,
 WeekCalendar,
} from 'react-native-calendars';
import {agendaItems, getMarkedDates} from '../mocks/agendaItems';
import AgendaItem from '../mocks/AgendaItem';
import {getTheme, themeColor, lightThemeColor} from '../mocks/theme';
import {getStatusBarHeight} from 'app-common';
const leftArrowIcon = require('../../assets/img/previous.png');
const rightArrowIcon = require('../../assets/img/next.png');
const ITEMS = agendaItems;
const mock = [
 {
  data: [
   {duration: '1h', hour: '12am', title: 'First Yoga', link: '1234-1234'},
  ],
  title: '2023-05-14',
 },
];
const weekView = true;

const TimeTable = ({t, navigation, props}) => {
 const marked = useRef(getMarkedDates());
 const theme = useRef(getTheme());
 const todayBtnTheme = useRef({
  todayButtonTextColor: themeColor,
 });

 const renderItem = useCallback(({item}) => {
  return (
   <AgendaItem
    item={item}
    navigationLink={item.link}
    navigationTest={navigation}
   />
  );
 }, []);

 return (
  <View style={styles.container}>
   <View style={styles.header}>
    <View style={styles.header1}>
     <Text style={styles.title}>TimeTable</Text>
    </View>
   </View>
   <CalendarProvider
    date={ITEMS[1]?.title}
    // onDateChanged={onDateChanged}
    // onMonthChange={onMonthChange}
    showTodayButton
    // disabledOpacity={0.6}
    theme={todayBtnTheme.current}
    // todayBottomMargin={16}
   >
    {weekView ? (
     <WeekCalendar firstDay={1} markedDates={marked.current} />
    ) : (
     <ExpandableCalendar
      theme={theme.current}
      firstDay={1}
      markedDates={marked.current}
      leftArrowImageSource={leftArrowIcon}
      rightArrowImageSource={rightArrowIcon}
      animateScroll
      // closeOnDayPress={false}
     />
    )}
    <AgendaList
     sections={ITEMS}
     renderItem={renderItem}
     // scrollToNextEvent
     sectionStyle={styles.section}
     // dayFormat={'yyyy-MM-d'}
    />
   </CalendarProvider>
  </View>
 );
};

export default TimeTable;

const styles = StyleSheet.create({
 calendar: {
  paddingLeft: 20,
  paddingRight: 20,
 },
 container: {
  backgroundColor: '#fff',
  flex: 1,
  zIndex: 1,
  paddingTop: Platform.OS !== 'ios' ? 10 : 0,
 },

 section: {
  backgroundColor: lightThemeColor,
  color: 'grey',
  textTransform: 'capitalize',
 },
 title: {
  fontFamily: 'Poppins-Medium',
  fontWeight: '500',
  fontSize: 24,
  lineHeight: 36,
  flex: 1,
  textAlign: 'center',
 },
 header: {
  paddingTop: Platform.OS === 'ios' ? 10 : 0,
  marginTop: 20,
  paddingHorizontal: 16,
 },
 header1: {
  flexDirection: 'row',
  alignItems: 'center',
  // justifyContent: 'space-between',
 },
});
