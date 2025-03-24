import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, FlatList, Pressable} from "react-native";
import { useAuth } from "./Auth";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from "./Color";
import ShowMap from "./Maps";
import {
    createStaticNavigation,
    useNavigation,
  } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Status = ({shippingstatus, updateShipping, buttonLabel, ShowButton=true}) => {
    const { Logout, token } = useAuth();
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [showComp, setShowComp] = useState({})
    const colors = useTheme()
    const navigation = useNavigation();

// const fetchCoordinates= async (address) => {
//     const API_KEY = "AIzaSyBwyUWzedpphw9uXUDp9rHGuJD35ZVMYws"
//     try {
//         const res = await axios.get(
//             `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
//         );
//         if (res.data.status === "OK" ) {
//             const location = res.data.results[0].geometry.location;
//             return location; 
//           } else {
//             console.log("Error: Geocode API returned no results or status not OK");
//           }
//         } catch (error) {
//           console.log("Error fetching coordinates", error);
//         }
//       };
    
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
    }, [token]);
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
        } catch (error) {
            
        }
    };
    // const navigateToMapScreen = async (shippingaddress) => {
    //     const address = JSON.parse(shippingaddress).address1;
    //     const coordinates = await fetchCoordinates(address);
    //     if (coordinates) {
    //         navigation.navigate('Map', {
    //             latitude: coordinates.lat,
    //             longitude: coordinates.lng,
    //         });
    //     }
    // };
    
    return (
        <View style={styles.sectionContainer}>
            {items.length > 0 ? (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer} >
                            <View style={styles.TextContainer}>
                            <Text style={styles.listText}><AntDesign name="user" color= {colors.Primary} size={20}/> {item.customer_name}</Text>
                            <Text style={styles.listText}><Feather name="box" color= {colors.Primary} size={20}/> {item.orderno}</Text>
                            <Pressable onPress={() => navigation.navigate("Map")}><Text style={styles.listText}><Ionicons name="location-outline" color= {colors.Primary} size={20}/> {JSON.parse(item.shippingaddress)?.city} {JSON.parse(item.shippingaddress)?.pincode}</Text></Pressable>
                            {showComp[item.id] && <ShowMap />}
                            </View>
                            
                            <View>
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
    borderRadius:4
    }
});

export default Status;
