import React, {useState} from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import  Modal  from "react-native-modal";
import { OtpInput } from "react-native-otp-entry";
import { useTheme } from "./Color";
import { useAuth } from "./Auth";
import axios from "axios";
import Entypo from "react-native-vector-icons/Entypo"
import {NavigationContainer, useFocusEffect, useNavigation}  from '@react-navigation/native';
const VerifyOTP = ({route, }) =>{
    const [modalVisible, setModalVisible] = useState(false)
    const [otp, setOtp] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] =  useState(false)
    const {token} =useAuth()
    const colors = useTheme()
    const navigation = useNavigation()
    const {order} = route.params
    const handleVerifyOTP = async() =>{
        setLoading(true)
        try {
            const res = await axios.post(`https://admin.shopersbay.com/asapi/verifyDeiveryOtp`, 
                { 
                    varification_id:562, 
                    otp : otp
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                })
                console.log(res.data)
                if(res.data.status === "success"){
                        try {
                            const res = await axios.post(
                                "https://admin.shopersbay.com/asapi/updateShippingStatus",
                                { 
                                    shipping_status: 5,
                                    orderid : order
                                 },
                                    {
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorization": `Bearer ${token}`,
                                        },
                                    }
                            )
                            console.log(res.data)
                            setRefreshData(!refreshData)
                        } catch (error) {
                            setError("error updating the data")
                        }
                        navigation.navigate("Order Confirmed", {order:order})
                    }else{
                        setError("Incorrect OTP")
                    }
                    setError(null)
                    setLoading(false)
                
        } catch (error) {
            setError("something went wrong")
        } finally {
            setLoading(false)
        }

    }
    return(
        <View style={[styles.container, modalVisible ?{ backgroundColor : "rgba(0,0,0,0.2)"} : {backgroundColor :"white"}]}>
            <Modal
            onBackDropPress={() => setModalVisible(false)}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible={modalVisible}
            avoidKeyboard={true}
            coverScreen= {true}
            >
                <View style={[styles.modal, {backgroundColor: "white"}]}>
                    <View style={styles.otpHeader}>
                    <Text style={{fontSize:16, fontWeight:"semibold", color:"rgba(0, 0, 0, 0.6)"}}>Confirm Order</Text>
                    <Pressable onPress={()=>setModalVisible(false)}><Entypo name="cross" size={25} color="rgba(0, 0, 0, 0.6)"/></Pressable>
                    </View>
                    <Text>Enter OTP</Text>
                    <OtpInput
                numberOfDigits={4}
                onTextChange={setOtp}
                theme={{
                    containerStyle:{marginVertical:20, alignItems:"center", justifyContent: "center", gap:20},
                    pinCodeContainerStyle : {borderColor: colors.Primary, height:50},
                    pinCodeTextStyle : {color : "rgba(0, 0, 0, 0.6)"},
                    focusedPinCodeContainerStyle : {borderColor : colors.Primary},
                    focusStickStyle : {backgroundColor: "rgba(0, 0, 0, 0.6)"}
                }}
                />
                <Pressable onPress={handleVerifyOTP} style={[styles.confirmBtn, {backgroundColor:colors.Primary}]}><Text style ={[styles.confText, {color:colors.TextInPrimary}]}>Confirm</Text></Pressable>
                {error && <Text>{error}</Text>}
                {loading && <ActivityIndicator size={"large"} color={colors.Primary}/> }
                </View>
                
            
            </Modal>
            <Pressable style={[styles.confirmBtn, {backgroundColor:colors.Primary}]} onPress={()=>{setModalVisible(!modalVisible)}}><Text style ={[styles.confText, {color:colors.TextInPrimary}]}>Enter OTP</Text></Pressable>
        </View>


    )
}
const styles= StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center"

    },
    modal:{
        flex:1,
        marginTop:180,
        maxHeight:400,
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
        justifyContent : "space-between",
        alignItems :"center",
        height : 50,
        width:"90%"
    }, 
    otpHeaderText : {
        flexDirection:"row",
        justifyContent : "space-evenly",

        alignItems :"center"
    }
})
export default VerifyOTP