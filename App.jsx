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
  return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>
  )
}
  return (
    <ColorProvider>
      <AuthProvider>
        <NavigationContainer>
          
            {isLoggedIn ? (
              <Stack.Navigator>
              <Stack.Screen
                name="Home"
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
              </Stack.Navigator>
            ) : (
              <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{
                  headerShown: false,
                }}
              />
              </Stack.Navigator>
            )}
          
        </NavigationContainer>
      </AuthProvider>
    </ColorProvider>
  );
}

export default App;
