import React, {useContext, createContext, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext()
export const useAuth = () =>{
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {
const [token, setToken] = useState(AsyncStorage.getItem('token') || null)

const Login = (newToken) =>{
    AsyncStorage.setItem('token', newToken)
    AsyncStorage.setItem('IsLoggedIn', JSON.stringify(true))
    setToken(newToken)
}

const Logout = () =>{
    AsyncStorage.removeItem('token')
    setToken(null)
}

return(
    <AuthContext.Provider value={{token, Login, Logout}}>{children}</AuthContext.Provider>
)
}
