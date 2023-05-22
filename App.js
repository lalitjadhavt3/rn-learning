import React from 'react';
import 'react-native-gesture-handler';
import {LogBox} from 'react-native';
import BottomNavigation from './src/navigators/BottomNavigation';
import {AuthProvider} from './src/components/Context/AuthContext';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
export default function App() {
 return (
  <AuthProvider>
   <BottomNavigation />
  </AuthProvider>
 );
}
