import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from "./Color";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "./Auth";
const Profile = () => {

  
  const colors =useTheme()
  const navigation =useNavigation()
  const {Logout} = useAuth()
    return(
        <View style={styles.container}>
            <Pressable 
            style={styles.button}
                    onPress={() => {
                      Logout()
                      navigation.reset(
                        {
                          index: 0,
                          routes: [{ name: 'Login' }],
                        }
                      );
                    }}
                  >
                    
                    <AntDesign name="logout" size={20} color={colors.Primary} />
                    <Text style={styles.text}>Logout</Text>
                </Pressable>
        </View>
    )
}

const styles= StyleSheet.create({
  container:{
    flex:1
  },
  button : {
    margin:20,
    flexDirection:"row",
    gap: 50,
    
  },
  text :{
    fontWeight:"bold",
    fontSize : 15
  }

})
export default Profile;