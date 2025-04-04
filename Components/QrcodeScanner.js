import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Success from "react-native-vector-icons/Feather"
import Error from "react-native-vector-icons/MaterialIcons"
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import { useTheme } from "./Color";
import axios from "axios";
import { useAuth } from "./Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QRScanner = ({route}) => {
    const {order} = route.params
    const navigation = useNavigation()
    const colors = useTheme()
    const [verification_id, setVerification_id] = useState("")
    const [hasPermissions, setPermissions] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [value, setValue]= useState("")
    const [loading, setLoading] = useState(false)
    const [isScanned, setIsScanned] = useState(true)
    const [error, setError]= useState(null)
    const {token} = useAuth()

    const verifyOrderId = async(orderid) =>{
        try {
            const res = await axios.post(`https://admin.shopersbay.com/asapi/verifyOrderDetail`, { orderid:orderid },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                })
                console.log(res.data.data.varification_id)
                id = res.data.data.varification_id
                setVerification_id(id)
                if(order===orderid){
                    setValue("Scanned Successfully")
                    await AsyncStorage.setItem(`scanned - ${order}`, "Scanned Successfully")
                }else{
                    setValue("Not Recognized")
                }

        } catch (error) {
            setError("something went Wrong")
        }finally {
            setLoading(false)
        }
    }
    const device = useCameraDevice("back")
    const scanner = useCodeScanner({
        codeTypes : [
            "qr",
            "codabar",
            "code-128",
            "code-39",
            "ean-13", 
            "ean-8", 
            "upc-a", 
            "upc-e"
        ],
        onCodeScanned : async (codes)=>{
            console.log("codescanned :", codes )
            const orderid = codes[0].value
            await verifyOrderId(orderid)
            setIsScanned(false)

        }
    })
    useEffect(()=>{
        setRefresh(!refresh)
    }, [device, hasPermissions])

    useEffect(()=>{
        const requestCameraPermission = async () =>{
            const permission = await Camera.requestCameraPermission()
            setPermissions(permission==="granted")
        }
        requestCameraPermission()
    }, [])

    if (device == null || !hasPermissions){
        return(
        <View>
            <Text>
                Camera not supported or not Permitted
            </Text>

        </View>
        )
    }
    console.log(verification_id)
    return(
        <View style={styles.container}>
            {loading && <ActivityIndicator color= {colors.Primary} size={"large"}/>}
            {error && <Text>{error}</Text>}
            {isScanned && <Camera
            codeScanner={scanner}
            style={styles.camera}
            device={device}
            isActive={true}
            />}
            { !isScanned &&
            <View style={styles.nestedContainer}>
                
               
               {value==="Scanned Successfully" ? 
                <View style={styles.result}>
                    <Success name="check-circle" size={100} color={colors.success}/>
                    <Text style={[styles.resultText, {color:colors.success}]}> {value}</Text>
                    <Pressable style={[styles.resultBtn, {borderColor : colors.success}]} onPress={async() =>{await AsyncStorage.setItem(`scanned - ${order}`, "Scanned Successfully")
                    navigation.goBack()}}>
                        <Text style={[styles.resultBtnText, {color:colors.success}]}>Ok</Text>
                    </Pressable>
                </View> : 
                <View style={styles.result}>
                    <Error name="error-outline" size={100} color={colors.error}/> 
                    <Text style={[styles.resultText, {color:colors.error}]}>{value}</Text>
                    <Pressable style={[styles.resultBtn, {borderColor :colors.error}]} onPress={()=>setIsScanned(true)}>
                        <Text style={[styles.resultBtnText, {color:colors.error}]}>Scan Again</Text>
                    </Pressable>
                </View>}
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        position:"relative",
        alignItems: "center",
        justifyContent : "center"
    },
    nestedContainer:{
        backgroundcolor:"white",
    alignItems: "center",
    justifyContent: "center",
    
    },
    camera:{
        width:"100%",
        height : "100%",
        overflow:"hidden",
        borderRadius : 10
    },
    resultText : {
        fontSize:40,
        alignItems: "baseline",
        justifyContent : "center",
        textAlign:"center",
        margin:"auto"
    },
    result : {
        alignItems: "center",
        justifyContent : "center",
        textAlign:"center",
        margin:"auto",
        gap:30
    },
    resultBtn:{
        height:50,
        width:100,
        borderWidth : 2,
        borderRadius : 10,
        alignItems : "center",
        justifyContent : "center"
    },
    resultBtnText:{
        fontWeight : "bold"
    }

})
export default QRScanner;