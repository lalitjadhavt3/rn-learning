import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
 const [authToken, setAuthToken] = useState(null);
 const removeAuthToken = () => {
  setAuthToken(null);
 };

 return (
  <AuthContext.Provider value={{authToken, setAuthToken, removeAuthToken}}>
   {children}
  </AuthContext.Provider>
 );
};
