import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import { useTheme } from "./Color";

const QRScanner = ({onRead}) => {
    const navigation = useNavigation()
    const colors = useTheme()
    const [hasPermissions, setPermissions] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [value, setValue]= useState("")
    
    const device = useCameraDevice("back")
    const scanner = useCodeScanner({
        codeTypes : ["qr", "codabar"],
        onCodeScanned : (codes)=>{
            console.log("codescanned :", codes )
            setValue(codes[0].value)
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