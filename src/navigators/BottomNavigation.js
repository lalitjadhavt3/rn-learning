import React, {useState} from 'react';
import {SCREEN_NAMES} from './screenNames';
import Join from '../scenes/join';
import Meeting from '../scenes/meeting';
import TimeTable from '../scenes/TimeTable';
import {
 VideoOn,
 VideoOff,
 Person,
 Participants,
 Calendar,
 Home,
} from '../assets/icons';
import Login from '../scenes/Login';
import Register from '../scenes/register';
import UserAccountSection from '../scenes/account';
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../styles/colors';
import {
 createBottomTabNavigator,
 BottomTabBar,
 BottomNavigationItem,
} from '@react-navigation/bottom-tabs';

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

const BottomNavigation = () => {
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
   <Tab.Navigator screenOptions={{tabBarVisible: getTabBarVisible}}>
    <Tab.Screen
     name='Register'
     component={Register}
     options={{
      title: 'Home',
      tabBarLabel: 'Home',
      tabBarIcon: ({color, size}) => (
       <Home width={20} height={20} fill={color} />
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
