import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, View, StyleSheet, FlatList, Pressable} from "react-native";
import { useAuth } from "./Auth";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from "./Color";
import Geolocation from 'react-native-geolocation-service';


const Status = ({shippingstatus, updateShipping, buttonLabel, ShowButton=true}) => {
    const { Logout, token } = useAuth();
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const navigation = useNavigation()
    const colors = useTheme()

    
    
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
    
      const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
          },
          (error) => {
            console.error(error.message); 
          },
          {
            enableHighAccuracy: true, 
            timeout: 15000,            
            maximumAge: 10000          
          }
        );
      };
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
                            <Pressable onPress={getCurrentLocation}><Text style={styles.listText}><Ionicons name="location-outline" color= {colors.Primary} size={20}/> {JSON.parse(item.shippingaddress)?.city} {JSON.parse(item.shippingaddress)?.pincode}</Text></Pressable>
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
