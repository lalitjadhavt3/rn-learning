import React from 'react';
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
} from 'react-native';

const TestScreen = () => {
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
     Contrary to popular belief, Lorem Ipsum is not simply random text. It has
     roots in a piece of classical Latin literature from 45 BC, making it over
    </Text>
   </View>
   <View style={styles.formContainer}>
    <TextInput placeholder='Enter Username' style={styles.inputField} />
    <TextInput
     placeholder='Enter Password'
     secureTextEntry={true}
     style={styles.inputField}
    />
    <TouchableOpacity style={styles.button}>
     <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity
     style={styles.buttonByGoogle}
     onPress={() => {
      Alert.alert('This feature will be released soon!');
     }}
    >
     <View style={styles.googleIconWrapper}>
      <Image
       style={styles.googleIcon}
       resizeMode='cover'
       source={require('../assets/image-1.png')}
      />
     </View>
     <Text style={styles.googleText}>Login using Google</Text>
    </TouchableOpacity>
   </View>
   <TouchableOpacity style={styles.forgotPasswordButton}>
    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
   </TouchableOpacity>
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

export default TestScreen;
