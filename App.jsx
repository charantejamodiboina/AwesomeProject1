import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import LoginPage from './Components/Login';
import Home from './Components/HomePage';
import { AuthProvider, useAuth } from './Components/Auth';
import { ColorProvider, useTheme } from './Components/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowMap from './Components/Maps';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Components/profile';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getData = async () => {
    const data = await AsyncStorage.getItem('IsLoggedIn');
    setIsLoggedIn(data === 'true');
  };

  useEffect(() => {
    getData();
  }, []);

function TabNavigation(){
  const colors = useTheme()
  return(
    
    <Tab.Navigator
    screenOptions={{
      tabBarStyle : {
        backgroundColor: colors.Primary,
        paddingTop : 8,
        height : 90,
        activeTintColor : "white"
      }
    }}>
      <Tab.Screen name="Home" component={Home} options={{headerStyle :{
        backgroundColor : colors.Primary,
        },
        headerTintColor:"white",
        tabBarIcon : () => (
          <AntDesign name= "home" color = "white" size={25} />
        )
        }}/>
      <Tab.Screen name="Profile" component={Profile} options={{headerStyle :{
        backgroundColor : colors.Primary,
        },
        headerTintColor:"white",
        tabBarIcon : () => (
          <AntDesign name= "profile" color = "white" size={25} />
        )
        }}/>
    </Tab.Navigator>
  )
}
  return (
    <ColorProvider>
      <AuthProvider>
        <NavigationContainer>
          
            
              <Stack.Navigator>
              <Stack.Screen
                name="HomeScreen"
                component={TabNavigation}
                options={{
                  headerShown: false,
                }}
                />
                
                 
              <Stack.Screen
              name ="Map"
              component={ShowMap}
              options={{
                headerShown: false,
              }}
              />
              
              <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{
                  headerShown: false,
                }}
              />
              </Stack.Navigator>
          
          
        </NavigationContainer>
      </AuthProvider>
    </ColorProvider>
  );
}

export default App;
