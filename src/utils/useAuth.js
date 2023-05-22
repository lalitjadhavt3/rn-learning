import React, {useEffect, useState, useContext} from 'react';
import {AsyncStorage} from 'react-native';
import {AuthContext} from '../components/Context/AuthContext';
const useAuth = () => {
 const [authenticated, setAuthenticated] = useState(false);
 const [loading, setLoading] = useState(true);
 const [username, setUsername] = useState('');
 const {setAuthToken} = useContext(AuthContext);
 useEffect(() => {
  const checkAuthentication = async () => {
   try {
    // Check if user is authenticated in AsyncStorage
    //console.log('testuseAuth', await AsyncStorage.getItem('authToken'));
    const token = await AsyncStorage.getItem('authToken');
    const usernamestore = await AsyncStorage.getItem('username');
    if (token) {
     // User is authenticated
     setUsername(usernamestore);
     setAuthenticated(true);
     setAuthToken(token);
    } else {
     // User is not authenticated
     setAuthenticated(false);
    }
   } catch (error) {
    console.error('Error checking authentication:', error);
   } finally {
    setLoading(false);
   }
  };

  checkAuthentication();
 }, []);

 return {authenticated, loading, username};
};

export default useAuth;
