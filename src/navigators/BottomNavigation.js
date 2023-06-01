import React, {useState} from 'react';
import Join from '../scenes/join';
import TimeTable from '../scenes/TimeTable';
import {Person, Calendar} from '../assets/icons';
import Login from '../scenes/Login';
import Register from '../scenes/register';
import UserAccountSection from '../scenes/account';
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import OfflineLecture from '../scenes/offline-lecture';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TestScreen from '../scenes/TestScreen';

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 },
 title: {
  fontSize: 24,
  fontWeight: 'bold',
 },
});

const BottomNavigation = (props) => {
 const {initialRouteName} = props;
 console.log(initialRouteName);
 const Tab = createBottomTabNavigator();
 const getTabBarVisible = (route) => {
  const routeName = route.state?.routes[route.state.index]?.name;

  // Hide the Login tab if the current route is the LoginScreen
  if (routeName === 'Login') {
   return false;
  }

  return true;
 };

 return (
  <NavigationContainer>
   <Tab.Navigator
    initialRouteName={initialRouteName}
    screenOptions={{tabBarVisible: getTabBarVisible}}
   >
    <Tab.Screen
     name='Register'
     component={Register}
     options={{
      headerShown: false,
      tabBarStyle: {
       display: 'none',
      },
      tabBarButton: () => null,
     }}
    />
    <Tab.Screen
     name='Join'
     component={Join}
     options={{
      tabBarStyle: {
       display: 'none',
      },
      tabBarButton: () => null,
     }}
    />
    <Tab.Screen
     name='TestScreen'
     component={TestScreen}
     options={{
      tabBarStyle: {
       display: 'none',
      },
      tabBarButton: () => null,
     }}
    />
    <Tab.Screen
     name='OfflineLecture'
     component={OfflineLecture}
     options={{
      tabBarStyle: {
       display: 'none',
      },
      tabBarButton: () => null,
     }}
    />
    <Tab.Screen
     name='TimeTable'
     component={TimeTable}
     options={{
      title: 'Time Table',
      initialParams: {joinLink: 'test'},
      tabBarLabel: 'Time Table',
      unmountOnBlur: true,
      tabBarIcon: ({color, size}) => (
       <Calendar width={20} height={20} fill={color} />
      ),
      tabBarVisible: false,
      tabBarBadgeStyle: {
       backgroundColor: 'red',
       color: 'white',
      },
      headerShown: false,
     }}
    />
    <Tab.Screen
     name='Login'
     component={Login}
     options={() => ({
      headerShown: false,
      tabBarStyle: {
       display: 'none',
      },
      tabBarButton: () => null,
     })}
    />

    <Tab.Screen
     name='Account'
     component={UserAccountSection}
     initialParams={{itemId: 1}}
     options={{
      title: 'Account',
      tabBarLabel: 'Account',
      unmountOnBlur: true,
      tabBarIcon: ({color, size}) => (
       <Person width={20} height={20} fill={color} />
      ),

      tabBarBadgeStyle: {
       backgroundColor: 'red',
       color: 'white',
      },
      headerShown: false,
     }}
    />
   </Tab.Navigator>
  </NavigationContainer>
 );
};

export default BottomNavigation;
