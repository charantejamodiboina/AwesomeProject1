import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from "./Color";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = () => {
  
  const colors =useTheme()
  const navigation =useNavigation()
    return(
        <View>
            <Pressable
                    onPress={() => {
                      
                      AsyncStorage.removeItem('IsLoggedIn');
                      navigation.replace(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: 'Login' }],
                        })
                      );
                    }}
                  >
                    <AntDesign name="logout" size={20} color={colors.Primary} />
                </Pressable>
        </View>
    )
}

export default Profile;