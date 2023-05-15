import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_NAMES} from './src/navigators/screenNames';
import Join from './src/scenes/join';
import Meeting from './src/scenes/meeting';
import TimeTable from './src/scenes/TimeTable';
import Login from './src/scenes/Login';
import {LogBox} from 'react-native';
import ParticipantStatsViewer from './src/scenes/meeting/Components/ParticipantStatsViewer';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const RootStack = createStackNavigator();

export default function App() {
 return (
  <NavigationContainer>
   <RootStack.Navigator
    screenOptions={{
     animationEnabled: true,
     presentation: 'modal',
    }}
    initialRouteName={SCREEN_NAMES.Login}
   >
    <RootStack.Screen
     name={SCREEN_NAMES.TimeTable}
     component={TimeTable}
     options={{headerShown: false}}
    />
    <RootStack.Screen
     name={SCREEN_NAMES.Login}
     component={Login}
     options={{headerShown: false}}
    />
    <RootStack.Screen
     name={SCREEN_NAMES.Meeting}
     component={Meeting}
     options={{headerShown: false}}
    />
   </RootStack.Navigator>
  </NavigationContainer>
 );
}
