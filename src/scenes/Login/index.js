import React, {useContext, useState} from 'react';
import {
 Text,
 StyleSheet,
 View,
 Image,
 TextInput,
 KeyboardAvoidingView,
 Platform,
 TouchableOpacity,
 SafeAreaView,
 Dimensions,
 Alert,
 AsyncStorage,
} from 'react-native';
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
   console.log(params);
   const str = JSON.stringify(data);
   const response = await axios.post(
    'http://192.168.1.4/nexus/auth.php',
    JSON.parse(str)
   );
   console.log(response);
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
  <KeyboardAvoidingView
   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
   style={styles.container}
  >
   <View style={styles.header}>
    <Text style={styles.title}>Login</Text>
   </View>
   <View style={styles.content}>
    <Text style={styles.description}>
     Use your mobile number and password for login purpose!
    </Text>
   </View>
   <View style={styles.formContainer}>
    <TextInput
     placeholder='Enter Mobile Number'
     style={styles.inputField}
     value={username}
     keyboardType={'numeric'}
     onChangeText={setUsername}
    />
    <TextInput
     placeholder='Enter Password'
     secureTextEntry={true}
     style={styles.inputField}
     onChangeText={setPassword}
     value={password}
    />
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
     <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
   </View>
   {/* <TouchableOpacity style={styles.forgotPasswordButton}>
    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
   </TouchableOpacity> */}
  </KeyboardAvoidingView>
 );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
 },
 header: {
  marginTop: 50,
 },
 title: {
  fontSize: 24,
  fontWeight: '700',
  color: 'black',
 },
 content: {
  alignItems: 'center',
  marginVertical: 20,
  paddingHorizontal: 20,
 },
 description: {
  textAlign: 'center',
  color: 'black',
  fontSize: 14,
 },
 formContainer: {
  width: width * 0.8,
  alignItems: 'center',
 },
 inputField: {
  width: '100%',
  height: 40,
  borderColor: '#969696',
  borderWidth: 1,
  borderRadius: 5,
  marginTop: 10,
  paddingHorizontal: 10,
 },
 button: {
  backgroundColor: '#185DCF',
  width: '100%',
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  marginTop: 10,
 },
 buttonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: '600',
 },
 buttonByGoogle: {
  flexDirection: 'row',
  alignItems: 'center',

  width: '100%',
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  marginTop: 10,
  borderColor: 'black',
  borderWidth: 2,
 },
 googleIconWrapper: {
  marginRight: 10,
 },
 googleIcon: {
  width: 20,
  height: 20,
 },
 googleText: {
  color: 'black',
  fontSize: 16,
  fontWeight: '600',
 },
 backButton: {
  position: 'absolute',
  top: 20,
  left: 10,
 },
 backIcon: {
  width: 20,
  height: 20,
 },
 forgotPasswordButton: {
  marginTop: 20,
 },
 forgotPasswordText: {
  color: 'blue',
  fontSize: 13,
 },
});

export default Login;
