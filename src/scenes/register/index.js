import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

const API_URL = 'https://api.example.com';

const Register = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [email, setEmail] = useState('');

 const handleRegister = async () => {
  try {
   const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password, email}),
   });

   const data = await response.json();

   // Handle the registration response data
   console.log(data);
  } catch (error) {
   console.error(error);
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
   <TextInput
    style={styles.input}
    placeholder='Email'
    value={email}
    onChangeText={setEmail}
   />
   <Button title='Register' onPress={handleRegister} />
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

export default Register;
