import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Pressable } from 'react-native';
import LoginPage from './Components/Login';
import Home from './Components/HomePage';
import { AuthProvider, useAuth } from './Components/Auth';
import { ColorProvider, useTheme } from './Components/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowMap from './Components/Maps';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getData = async () => {
    const data = await AsyncStorage.getItem('IsLoggedIn');
    setIsLoggedIn(data === 'true');  // Ensure data is converted to boolean correctly
  };

  useEffect(() => {
    getData();
  }, []);

  // Wrap the Stack.Navigator in the NavigationContainer
  return (
    <ColorProvider>
      <AuthProvider>
        <NavigationContainer>
          
            {isLoggedIn ? (
              <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
              <Stack.Screen
                name="Home"
                component={Home}
                options={({ navigation }) => ({
                  headerBackVisible: false,
                  headerStyle: {
                    backgroundColor: 'rgb(72, 99, 255)',
                  },
                  headerTintColor: 'white',
                  headerRight: () => (
                    <Pressable
                      onPress={() => {
                        // Handle logout logic here
                        AsyncStorage.removeItem('IsLoggedIn');
                        setIsLoggedIn(false);

                        // Reset navigation stack to 'Login'
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'Login' }],
                        });
                      }}
                    >

                      <AntDesign name="logout" size={20} color="white" />
                    </Pressable>
                  ),
                })}
              />
              <Stack.Screen
              name ="Map"
              component={ShowMap}
              options={{
                headerVisible: false,
              }}
              />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{
                  headerVisible: false,
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
