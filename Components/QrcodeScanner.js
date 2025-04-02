import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import { useTheme } from "./Color";
import axios from "axios";
import { useAuth } from "./Auth";

const QRScanner = () => {
    const navigation = useNavigation()
    const colors = useTheme()
    const [hasPermissions, setPermissions] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [value, setValue]= useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError]= useState(null)
    const {token} = useAuth()

    const verifyOrderId = (orderid) =>{
        try {
            const res = axios.post(`https://admin.shopersbay.com/asapi/verifyOrderDetail`, { orderid:orderid },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                })
                console.log(res.data)

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
            "code128",
            "code39", 
            "ean13", 
            "ean8", 
            "upc_a", 
            "upc_e"
        ],
        onCodeScanned : async (codes)=>{
            console.log("codescanned :", codes )
            const orderid = codes[0].value
            await verifyOrderId(orderid)
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
    return(
        <View style={styles.container}>
            {loading && <ActivityIndicator color= {colors.Primary} size={"large"}/>}
            {error && <Text>{error}</Text>}
            <Camera
            codeScanner={scanner}
            style={styles.camera}
            device={device}
            isActive={true}
            />
            <View style={styles.nestedContainer}>
               <Text style={{color:colors.Primary}}> {value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        position:"absolute",
        top : 0,
    height: "100%",
    width: "100%",
        alignItems: "center",
        justifyContent : "center"
    },
    nestedContainer:{
        backgroundcolor:"white",
        position:"absolute",
        bottom : 0,
        left : 0,
        right : 0,
        height: "20%",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    },
    camera:{
        width:"100%",
        height : "70%",
        position: "absolute",
        top:0,
        borderRadius : 20
    }
})
export default QRScanner;