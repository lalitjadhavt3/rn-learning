import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Button, StyleSheet, AsyncStorage} from 'react-native';
import {AuthContext} from '../../components/Context/AuthContext';
import Login from '../Login';
import Register from '../register';
import useAuth from '../../utils/useAuth';
const UserAccountSection = ({navigation, route}) => {
 const {authenticated, username} = useAuth();
 const {authToken, removeAuthToken} = useContext(AuthContext);
 const [isLogin, setLogin] = useState(authToken);
 const handleLogout = async () => {
  try {
   await AsyncStorage.removeItem('username');
   await AsyncStorage.removeItem('authToken');
   removeAuthToken();
   setLogin(!isLogin);
  } catch (exception) {
   console.log(exception);
  }
 };

 return (
  <View style={styles.container}>
   {isLogin ? (
    <>
     <Text>Welcome, {username}!</Text>
     <Button title='Settings' onPress={() => console.log('Go to settings')} />
     <Button
      title='Logout'
      onPress={() => {
       handleLogout();
      }}
     />
    </>
   ) : (
    <>
     <Text>Welcome, Guest!</Text>
     <Button
      title='Login'
      onPress={() => {
       navigation.navigate('Login', Login);
      }}
     />
     <Button
      title='Register Now'
      onPress={() => navigation.navigate('Register', Register)}
     />
    </>
   )}
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
 },
});

export default UserAccountSection;
