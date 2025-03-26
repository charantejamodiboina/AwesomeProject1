import React, {useState} from "react";
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet, ActivityIndicator, Button, Alert, ImageBackground, Image} from "react-native";
import axios from "axios";
import { useAuth } from "./Auth";
import { useTheme } from "./Color";
import FontAwesome from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import {Background} from '../assests/images/gradient-neon.jpg'
const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const {Login} = useAuth()
    const colors = useTheme()
    const navigation = useNavigation();
    const handleLogin = async() => {
        setLoading(true);
        setError(null)
        try {
            if(!username || !password){
                setError("Please enter both email and password")
                setLoading(false)
                return;
            }
            
            const res = await axios.post("https://admin.shopersbay.com/asapi/authlogin",
            {username : username, password : password},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authentication": "4c2231bb8bb71e74cca71d45b5a1a710"
                },
            })
            console.log(res.data)
            if (res.data.status==="success"){
                const {jwt_token} = res.data
                Login(jwt_token)
                setLoading(false)
                navigation.navigate("Home")
                
            }else{
                setError("Invalid username or Password")
                setLoading(false);
            }
            setLoading(false);
        }catch (error) {
            setError("Something Went wrong")
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }
    return(
        
        <View style= {styles.container}>
            <View style= {styles.section_container}>
            <Text style={[styles.title, {color:colors.Primary}]}>Shopersbay</Text>
            <Text style={[styles.greet, {color:colors.Primary}]}>Welcome back </Text>
            <Text style={styles.text}>Please enter your Email id and Password to Sign in</Text>
            <View style={[styles.inputContainer, {borderColor:colors.Primary}]}>
            <FontAwesome name ="mail" marginLeft= {10} color={colors.Primary} size={20}/>
            <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                    placeholderTextColor={"rgb(110, 110, 110)"}
                    
                />
            </View>
                <View style={[styles.inputContainer, {borderColor:colors.Primary}]}>
                <FontAwesome name ="lock" marginLeft= {10} color={colors.Primary} size={20}/>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword} 
                        placeholder="Password"
                        placeholderTextColor={"rgb(110, 110, 110)"}
                    />
                    <Pressable style= {styles.showPassBtn} onPress={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FontAwesome name ="eye" color={colors.Primary} size={20}/> : <FontAwesome name ="eye-off" color="black" size={20}/>}
                    </Pressable>
            </View>
            <Pressable><Text style={styles.fPButton}>Forgot Password</Text></Pressable>
            <Pressable style={[styles.btn, {borderColor:colors.Primary}]} onPress= {handleLogin}><Text style={[styles.btntext, {color:colors.Primary}]}>Sign in</Text></Pressable>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {loading &&  <ActivityIndicator size="large" color={colors.Primary} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        margin : "auto",
        justifyContent : "center",
        alignItems : "center",
        fontFamily : 'sans-serif',
        fontWeight : 1000,
        
    },
    section_container : {
        flex: 1,
        gap : 30,
        width: 350,
        borderRadius:6,
        marginTop:100,
        marginBottom:300,
        height:10,
    },
    title:{
        fontSize:50,
        fontWeight :"bold",
        // marginLeft :20,
        textAlign:"center"
    },
    greet:{
        fontSize:25,
        // marginLeft :20,
        fontWeight :"bold",
        textAlign:"center"
    },
    text:{
        fontSize:17,
        textAlign:"center",
        color: "rgb(110, 110, 110)"
        // marginLeft :20,
    },
    errorText:{
        fontSize:18,
        color:"red",
        textAlign : "center"
    },
    fPButton:{
        color :"rgb(8, 112, 247)",
        textAlign : "right"
    },
    btn:{
        height:50,
        borderRadius : 30,
        borderWidth : 2,
        justifyContent : 'center',
        alignItems:'center',
        width:"60%",
        margin:"auto"
    },
    btntext:{
        fontSize:16,
        fontWeight :"bold"
    },
    inputContainer: {
        flexDirection: "row",
        // position: "relative",
        borderWidth : 2,
        gap : 5,
        borderRadius:10,
        width: "100%",
        height:50,
        alignItems : "center",
        backgroundColor : "white",
    },
    input : {
        fontSize:18,
        color:"black",
    },
    showPassBtn :{
        position : "absolute",
        right: 10
    },
    toggleText: {
        position: "absolute",
        right: 10,
        top: 10,
        color: "blue",
    },
    background:{
        flex: 1,
        justifyContent: 'center',
      }

})

export default LoginPage