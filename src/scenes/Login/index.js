import React, {useContext, useState} from 'react';
import {View, TextInput, Button, StyleSheet, AsyncStorage} from 'react-native';
import TimeTable from '../TimeTable';
import axios from 'axios';
import {AuthContext} from '../../components/Context/AuthContext';
const Login = ({route, navigation}) => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const {setAuthToken} = useContext(AuthContext);
 const handleLogin = async () => {
  try {
   var params = new URLSearchParams();
   const data = {username: username, password: password};
   params.append('username', username);
   params.append('password', password);
   const response = await axios.post('http://192.168.1.4/nexus/auth.php', data);
   if (response.data.token) {
    try {
     await AsyncStorage.setItem('username', username);
     await AsyncStorage.setItem('authToken', response.data.token);
     setAuthToken(response.data.token);
     navigation.navigate('TimeTable', TimeTable);
    } catch (error) {
     console.error('Error storing encrypted credentials:', error);
    }
   }
  } catch (error) {
   // Handle login error
   console.log(error);
  }
 };

 return (
  <View style={styles.container}>
   <TextInput
    style={styles.input}
    placeholder='Username'
    value={username}
    onChangeText={setUsername}
   />
   <TextInput
    style={styles.input}
    placeholder='Password'
    secureTextEntry
    value={password}
    onChangeText={setPassword}
   />
   <Button title='Login' onPress={handleLogin} />
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
 input: {
  width: '100%',
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  marginBottom: 12,
  paddingHorizontal: 8,
 },
});

export default Login;
