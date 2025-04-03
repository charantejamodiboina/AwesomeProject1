import React, {useState} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Modal } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useTheme } from "./Color";
const VeriftOTP = () =>{
    const [modalScreen, setModelScreen] = useState(false)
    const colors = useTheme()
    return(
        <View>
            <Modal
            animationType="slide"
            transparent={true}
          visible={modalScreen}
          st
            >
                <View style={[styles.modal, {backgroundColor: "white"}]}>
                    <View style={styles.otpHeader}>
                    <Text>Confirm Order</Text>
                    <Pressable onPress={()=>{setModelScreen(!modalScreen)}}><Text>X</Text></Pressable>
                    </View>
                
                    <OtpInput
                numberOfDigits={4}
                theme={{
                    containerStyle:{marginVertical:40, alignItems:"center", justifyContent: "center", gap:20},
                    pinCodeContainerStyle : {borderColor: colors.Primary, height:50},
                    pinCodeTextStyle : {color : "rgba(0, 0, 0, 0.6)"},
                    focusedPinCodeContainerStyle : {borderColor : colors.Primary},
                    focusStickStyle : {backgroundColor: "rgba(0, 0, 0, 0.6)"}
                }}
                />
                <Pressable onPress={()=>navigation.navigate("Verify OTP")} style={[styles.confirmBtn, {backgroundColor:colors.Primary}]}><Text style ={[styles.confText, {color:colors.TextInPrimary}]}>Confirm</Text></Pressable>
                
                </View>
            
            </Modal>
            <Pressable onPress={()=>{setModelScreen(!modalScreen)}}><Text>Enter OTP</Text></Pressable>
        </View>
    )
}
const styles= StyleSheet.create({
    modal:{
        flex:1,
        marginTop:"100%",
        borderRadius :30,
        alignItems : "center"
    },
    confirmBtn:{
        width:"70%",
        height:45,
        alignItems : "center",
        justifyContent : "center",
        borderRadius : 50
    },
    confText:{
        fontWeight:"bold",
        fontSize : 16
    }, 
    otpHeader : {
        flexDirection:"row",
        justifyContent : "space-evenly",
        alignItems :""
    }
})
export default VeriftOTP