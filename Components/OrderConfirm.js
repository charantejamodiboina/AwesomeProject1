import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {NavigationContainer, useFocusEffect, useNavigation}  from '@react-navigation/native';
import Success from "react-native-vector-icons/Feather"
import { useTheme } from "./Color";
const ConfirmedPage = ({route}) => {
    const navigation= useNavigation()
    const {order}=route.params
    const colors = useTheme()
    return(
        <View style={styles.container}>
            <Success name="check-circle" size={100} color={colors.Primary}/>
            <Text style={{fontSize : 20, color : colors.Primary, textAlign:"center" }}>Order {order} has been delivered Successfully</Text>
            <Pressable style= {[styles.button, {borderColor:colors.Primary}]} onPress={() => navigation.navigate("HomeScreen")}>
                <Text style={{fontSize:20, fontWeight:"bold", color:colors.Primary}}>Okay</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        gap:20
    },
    button : {
        borderWidth : 3,
        borderRadius : 5,
        width : 70,
        alignItems : "center",
        justifyContent : "center",
        height : 50
    }
})
export default ConfirmedPage