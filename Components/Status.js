import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, FlatList, Pressable, ActivityIndicator} from "react-native";
import { useAuth } from "./Auth";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from "./Color";
import ShowMap from "./Maps";
import {
    useFocusEffect,
    useNavigation,
  } from '@react-navigation/native';
import OrderDetails from "./OrderDetails";

const Status = ({shippingstatus, updateShipping, buttonLabel, ShowButton=true, ShowDirections=true, ShowODButton=true}) => {
    const { Logout, token } = useAuth();
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [refreshData, setRefreshData] = useState(null)
    const [loading, setLoading]= useState(false)
    const colors = useTheme()
    const navigation = useNavigation();

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await axios.post(
                "https://admin.shopersbay.com/asapi/getAssignedlist",
                { shipping_status: shippingstatus },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            console.log(res.data.data)
            setItems(res.data.data);
        } catch (error) {
            setError("Something went wrong");
        }finally{
            setLoading(false)
        }
    };
    useFocusEffect(
        useCallback(() => {
        
        fetchData();
    }, [shippingstatus, token, refreshData]));
    const handleUpdateStatus = async(id) => {
        
        try {
            const res = await axios.post(
                "https://admin.shopersbay.com/asapi/updateShippingStatus",
                { 
                    shipping_status: updateShipping,
                    orderid : id
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
    };
    
    const fetchCoordinates = async(address) => {
        try {
            const addressString = JSON.parse(address).address1
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    address: addressString,
                    key: "AIzaSyBEhoXegQdZgL1z5vZc4gD0I_Q4MLnnsII",
                },
            });
            console.log(response.data)
            const location = response.data.results[0]?.geometry?.location;
            if (location) {
                navigation.navigate("Map", {coordinates : location});
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error);
        }
    } 
    return (
        <View style={styles.sectionContainer}>
            {items.length > 0 ? (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    refreshing={true}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer} >
                            <View style={styles.TextContainer}>
                            <Text style={styles.listText}><AntDesign name="user" color= {colors.Primary} size={20}/> {item.customer_name}</Text>
                            <Text style={styles.listText}><Feather name="box" color= {colors.Primary} size={20}/> {item.orderno}</Text>
                            <Text style={styles.listText}><Ionicons name="location-outline" color= {colors.Primary} size={20}/> {JSON.parse(item.shippingaddress)?.city} {JSON.parse(item.shippingaddress)?.pincode}</Text>
                            </View>
                            
                            <View style={styles.buttonContainer}>
                            {ShowDirections &&
                    <Pressable style={styles.directionButton} onPress={() => {
                        fetchCoordinates(item.shippingaddress)}}><FontAwesome5 name="directions" color={colors.Primary} size={25}/></Pressable>
            }
                            {ShowButton &&
                            <Pressable style={[styles.statusChangeBtn, {backgroundColor:colors.Primary}]} onPress={()=>handleUpdateStatus(item.id)}><Text style={{color:"white"}}>{buttonLabel}</Text></Pressable>}
                            {ShowODButton &&
                            <Pressable style={[styles.statusChangeBtn, {backgroundColor:colors.Primary}]} onPress={()=> {navigation.navigate("Order Details" , {order:item.id, address:JSON.parse(item.shippingaddress)?.city, adpincode:JSON.parse(item.shippingaddress)?.pincode, name:item.customer_name, price:item.amt})}}><Text style={{color:"white"}}>Deliver</Text></Pressable>}
                            </View>
                        </View>
                    )}
                />
            ) : (
                <Text>No data available</Text>
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {loading && <ActivityIndicator color={colors.Primary} size={"large"}/>}
        </View>
    );
};

export const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        padding: 16,
        backgroundColor : "rgb(255, 255, 255)"
    },
    errorText: {
        color: "red",
        marginTop: 10,
    },
    itemContainer :{
        flexDirection:"row",
        backgroundColor:"white",
        height:150,
        padding: 30,
        marginVertical: 8,
        marginHorizontal: 8,
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.5)", 
        justifyContent:"space-between"
    },
    TextContainer :{
        justifyContent:"space-between"
    },
    listText: {
        color: "black",
        fontSize : 15,
        justifyContent : "center",
    },
    statusChangeBtn : {
    width:110,
    height:30,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:4,
    },
    buttonContainer :{
        justifyContent:"space-between"
    },
    directionButton:{
        alignSelf: "flex-end"
    }
});

export default Status;
