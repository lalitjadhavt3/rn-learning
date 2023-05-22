import React, {
 useRef,
 useCallback,
 useState,
 useEffect,
 useContext,
} from 'react';
import Login from '../Login';
import {
 StyleSheet,
 View,
 Text,
 TouchableOpacity,
 Image,
 Button,
 Platform,
 AsyncStorage,
} from 'react-native';
import {Images} from 'app-assets';
import useAuth from '../../utils/useAuth';
import {AuthContext} from '../../components/Context/AuthContext';
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
import api from '../../utils/api';
const leftArrowIcon = require('../../assets/img/previous.png');
const rightArrowIcon = require('../../assets/img/next.png');
const ITEMS = agendaItems;
const weekView = true;
const TimeTable = ({t, navigation, props}) => {
 const {authenticated, loading, username} = useAuth();
 const {authToken} = useContext(AuthContext);
 const [isLogin, setLogin] = useState(authToken);
 const onDateChanged = useCallback((date, updateSource) => {
  try {
   const response = api.get('/get_schedule.php', {
    params: {
     date: date,
    },
   });
   console.log(response);
  } catch (error) {
   // Handle the error
   console.error(error);
  }
 }, []);

 const mock = [
  {
   data: [
    {
     duration: '1h',
     hour: '12am',
     title: 'First Yoga',
     link: '1234-1234',
     username: username,
    },
   ],
   title: '2023-05-14',
  },
 ];
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
    usernameAuth={username}
   />
  );
 }, []);

 return (
  <View style={styles.container}>
   {isLogin ? (
    <>
     <View style={styles.header}>
      <View style={styles.header1}>
       <Text style={styles.title}>TimeTable</Text>
      </View>
     </View>
     <CalendarProvider
      date={ITEMS[1]?.title}
      onDateChanged={onDateChanged}
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
       sections={mock}
       renderItem={renderItem}
       // scrollToNextEvent
       sectionStyle={styles.section}
       // dayFormat={'yyyy-MM-d'}
      />
     </CalendarProvider>
    </>
   ) : (
    <View style={styles.container2}>
     <Text>Welcome, Guest!</Text>
     <Text>Please Login to View Content!</Text>
     <Button
      title='Login'
      onPress={() => {
       navigation.navigate('Login', Login);
      }}
     />
    </View>
   )}
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
 container2: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
 },
 header1: {
  flexDirection: 'row',
  alignItems: 'center',
  // justifyContent: 'space-between',
 },
});