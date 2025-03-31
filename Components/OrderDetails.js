import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pressable, View, Text, StyleSheet, FlatList } from "react-native";
import { useAuth } from "./Auth";
import {useNavigation}  from '@react-navigation/native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import { useTheme } from "./Color";
const OrderDetails = ({route}) => {
    const {token} = useAuth()
    const [items, setItems] = useState([])
    const [error, setError] = useState(null)
    const colors =useTheme()
    const navigation = useNavigation()
    const {order} = route.params
    useEffect(()=>{
        const fetchDetails = async() =>{
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
                    setItems(res.data.data)
            } catch (error) {
                setError("something went wrong")
            }
           
        }
        fetchDetails()
    }, [order, token])
    return(
        <View style={styles.sectionContainer}>

        {items.length > 0 ? 
        (<FlatList
            data = {items}
            keyExtractor={(item)=>item.orderid.toString()}
            renderItem={({item}) => (
                <View style= {styles.itemContainer}>
                    <Text style={[styles.titleText, {color:colors.Primary}]}>{JSON.parse(item.product_details)?.product_title}</Text>
                    <View style={{flexDirection : "row", justifyContent:"space-between"}}>
                    
                    <View style={styles.TextContainer}>
                    
                    <Text style={styles.listText}><Feather name="box" color= {colors.Primary} size={20}/> {item.orderid}</Text>
                    <Text style={styles.listText}><FontAwesome name="rupee" color= {colors.Primary} size={20} /> {item.amount}</Text>
                    <Text  style={styles.listText}><Text style = {{color: colors.Primary, fontWeight : "bold", fontSize: 18}}>Qty  </Text>{item.quantity}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                    <Pressable onPress= {()=>{navigation.navigate("Scanner")}} style={[styles.scanButton, {backgroundColor : colors.Primary}]}><MaterialCommunityIcons name="barcode-scan" color="white" size={20}/><Text style={styles.scanText}> Scan</Text></Pressable>
                    <Pressable style={[styles.scanButton, {backgroundColor : colors.Primary}]}><MaterialCommunityIcons name="qrcode-scan" color="white" size={20} /><Text style={styles.scanText}> Scan</Text></Pressable>
                    </View>
                    </View>
                    
                </View>)}

            
        /> )
        : <Text>No orders</Text>}
            
        {error && <Text>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        padding: 16,
        backgroundColor : "rgb(255, 255, 255)",
        flexDirection : "column"
    },
    errorText: {
        color: "red",
        marginTop: 10,
    },
    itemContainer :{
        flexDirection:"column",
        backgroundColor:"white",
        height:300,
        padding: 30,
        marginVertical: 8,
        marginHorizontal: 8,
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.5)", 
        justifyContent:"space-evenly"
    },
    TextContainer :{
        justifyContent:"space-between"
    },
    listText: {
        color: "black",
        fontSize : 15,
        justifyContent : "center",
    },
    titleText: {
        fontSize : 20,
        justifyContent : "center",
        fontWeight : "bold"
    },
    buttonContainer :{
        justifyContent:"flex-end",
        gap:20,
        
    },
    scanButton:{
        width:80,
        flexDirection: "row",
        alignItems : "center",
        justifyContent:"center",
        borderRadius :30,
        height : 40,
        gap:5
    },
    scanText:{
        color:"white"
    }
});
export default OrderDetails