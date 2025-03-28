import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, FlatList, Pressable} from "react-native";
import { useAuth } from "./Auth";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from "./Color";
import ShowMap from "./Maps";
import {
    useNavigation,
  } from '@react-navigation/native';

const Status = ({shippingstatus, updateShipping, buttonLabel, ShowButton=true, ShowDirections=true}) => {
    const { Logout, token } = useAuth();
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const colors = useTheme()
    const navigation = useNavigation();

    
    useEffect(() => {
        const fetchData = async () => {
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
            }
        };
        fetchData();
    }, [shippingstatus, token]);
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
            fetchData()
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
                            <Pressable style={[styles.statusChangeBtn, {backgroundColor:colors.Primary}]} onPress={()=>handleUpdateStatus(item.id)}><Text style={{color:"white"}}>{buttonLabel}</Text></Pressable>
                    }
                    
                            </View>
                        </View>
                    )}
                />
            ) : (
                <Text>No data available</Text>
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
            
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
