import React, { useEffect, useState } from "react";
import Status from "./Status";
import { Pressable, Text, View } from "react-native";


const Profile = () => {
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
                    <AntDesign name="logout" size={20} color="white" />
                  </Pressable>
        </View>
    )
}

export default Profile;