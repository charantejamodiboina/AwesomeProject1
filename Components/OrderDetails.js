import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Pressable, View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useAuth } from "./Auth";
import {NavigationContainer, useFocusEffect, useNavigation}  from '@react-navigation/native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useTheme } from "./Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
const OrderDetails = ({route}) => {
    const {order, address, adpincode, price, name} = route.params
    const {token} = useAuth()
    const [items, setItems] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [scannedStatus, setScannedStatus]= useState('')
    const colors =useTheme()
    const navigation = useNavigation()
    
    const fetchDetails = async() =>{
            setLoading(true)
            try {
                const res = await axios.get(`https://admin.shopersbay.com/asapi/getOrderDetail/${order}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                        "Authentication": "4c2231bb8bb71e74cca71d45b5a1a710"
                    },
                    })
                    console.log(order)
                    console.log(res.data)
                    setLoading(true)
                    setItems(res.data.data)
            } catch (error) {
                setError("something went wrong")
            } finally{
                setLoading(false)
            }
           
        }
        
    
    const checkScannedStatus = async() => {
        const status = await AsyncStorage.getItem(`scanned - ${order}`)
        setScannedStatus(status)
    }

    useFocusEffect(
        useCallback(()=>{
            checkScannedStatus();
            fetchDetails()
        }, [order, token])
    )
    return(
        <View style={styles.sectionContainer}>
            <View style={styles.itemContainer1}>
                <View style={[styles.userDetails, {borderBottomColor:"rgba(0,0,0,0.1)"}]}>
            <Text style={[styles.headingText, {color:colors.Primary}]}>{name}</Text>
                <View style={styles.iconView}><FontAwesome6 name="location-dot" color= {colors.Primary} size={16}/><Text>{address} {adpincode}</Text></View>
                <View style={styles.iconView}><FontAwesome6 name="indian-rupee-sign" color= {colors.Primary} size={16}/><Text>Price - {price}</Text></View>
                </View>
                <Pressable style={styles.callButton}><Ionicons name="call" color={colors.Primary} size={25}/><Text style={{color:colors.Primary, fontSize:16, fontWeight:"bold"}}>Call Customer</Text></Pressable>
                
            </View>
            <Text style={{fontSize:16, paddingVertical:5}}>Delivery Requests  ({items.length})</Text>
        {items.length > 0 ? 
        (<FlatList
            data = {items}
            keyExtractor={(item)=>item.orderid.toString()}
            renderItem={({item}) => (
                <View style= {styles.itemContainer}>
                    <View style={styles.buttonContainer}>
                        
                    <Text style={styles.titleText}> {item.orderid}</Text>
                    <Pressable onPress= {()=>{navigation.navigate("Scanner", {order:order})}} style={[styles.scanButton, {backgroundColor : colors.Primary}]}
                        disabled = {scannedStatus === "Scanned Successfully"}>{scannedStatus !== "Scanned Successfully" ?<MaterialCommunityIcons name="barcode-scan" color="white" size={20}/> : null}<Text style={styles.scanText}> {scannedStatus === "Scanned Successfully" ? "Scanned" : "Scan"}</Text></Pressable>                    
                    </View>
                    <Text style={[styles.listText]}>{JSON.parse(item.product_details)?.product_title}</Text>
                    <Text  style={[styles.boldText, {color:colors.Primary}]}>Qty : {item.quantity}  | Price : {item.amount}</Text>   
                </View>)}            
        /> 
    
    )
        : <Text>No orders</Text>}
        {scannedStatus === "Scanned Successfully" && <View style={{alignItems:"center"}}>
            <Pressable onPress={()=>navigation.navigate("Verify OTP")} style={[styles.confirmBtn, {backgroundColor:colors.Primary}]}><Text style ={[styles.confText, {color:colors.TextInPrimary}]}>Confirm</Text></Pressable>
        </View>}
        
        {loading && <ActivityIndicator size="large" color={colors.Primary} />}
        {error && <Text>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        padding: 16,
        backgroundColor : "rgb(255, 255, 255)",
        flexDirection : "column",
        
    },
    errorText: {
        color: "red",
        marginTop: 10,
    },
    itemContainer1 :{
        flexDirection:"column",
        backgroundColor:"white",
        height:220,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 2,
        boxShadow: "0px 0px 10px -5px rgba(0,0,0,0.5)", 
        justifyContent:"space-between",
        borderRadius:10
    },
    itemContainer :{
        flexDirection:"column",
        backgroundColor:"white",
        height:180,
        padding: 30,
        marginVertical: 8,
        marginHorizontal: 2,
        boxShadow: "0px 0px 10px -5px rgba(0,0,0,0.5)", 
        justifyContent:"space-evenly",
        borderRadius:10,
        gap:10
    },
    listText: {
        color: "rgba(0, 0, 0, 0.5)",
        fontSize : 15,
        justifyContent : "center",
    },
    titleText: {
        fontSize : 20,
        justifyContent : "center",
        fontWeight : "bold"
    },
    boldText: {
        fontSize : 16,
        justifyContent : "center",
        fontWeight : "bold"
    },
    buttonContainer :{
        justifyContent:"space-between",
        flexDirection : "row",
        alignItems : "center"
        
    },
    scanButton:{
        width:100,
        flexDirection: "row",
        alignItems : "center",
        justifyContent:"center",
        borderRadius :30,
        height : 40,
        gap:5
    },
    scanText:{
        color:"white"
    },
    headingText:{
        fontWeight:"bold",
        fontSize:25
    },
    userDetails:{
        justifyContent:"space-evenly",
        height:130,
        borderBottomWidth : 1,
        paddingTop:0
    },
    iconView:{
        flexDirection:"row",
        gap:20
    },
    callButton:{
        flexDirection:"row",
        gap:10,
        alignItems:"center"
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
    }
    
});
export default OrderDetails