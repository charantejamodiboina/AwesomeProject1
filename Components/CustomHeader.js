import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Pressable, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import { useTheme } from "./Color";
const Header = ({title}) =>{
    const navigation = useNavigation()
    const colors = useTheme()
    return (
        <View style={[styles.header, {backgroundColor: colors.Primary}]}>
            <Pressable style={styles.icon} onPress={()=> navigation.goBack()}><Ionicons name="chevron-back" color={colors.TextInPrimary} size={25}/></Pressable>
            <Text style={[styles.title, {color:colors.TextInPrimary}]}>{title}</Text></View>
            
       
    )
    
}
const styles = StyleSheet.create({
    header: {
        height:70,
        flexDirection : "row",
        alignItems :"center",
        justifyContent : "center",
        gap:20,
    },
    icon :{
        position : "absolute",
        left :20
    },
    title:{
        fontWeight:"bold",
        fontSize: 18,
        
    }
})
export default Header