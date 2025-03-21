import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  SafeAreaView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import LoginPage from './Components/Login';
import Home from './Components/HomePage';
import { AuthProvider, useAuth } from './Components/Auth';
import { ColorProvider, useTheme } from './Components/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const getData = async() => {
    const data = await AsyncStorage.getItem('IsLoggedIn')
    setIsLoggedIn(data)
  }

  useEffect(()=>{
    getData()
  }, [])
  return (
    <ColorProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
          {isLoggedIn ? (
              <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerBackVisible: false,
                headerStyle: {
                  backgroundColor: 'rgb(72, 99, 255)',
                },
                headerTintColor: 'white',
                headerRight: () => (
                  <Pressable onPress={() => {
                    Logout();
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                      })
                    );
                  }}>
                    <AntDesign name="logout" size={20} color="white" />
                  </Pressable>
                ),
              }}
            />
            ) : (
              <Stack.Screen name="Login" component={LogInNavigator} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ColorProvider>
  );
}

function HomeNavigator() {
  const navigation = useNavigation(); 
  const { Logout } = useAuth();
  

  return (
    <Stack.Navigator>
      
      </Stack.Navigator>
  );
}
function LogInNavigator() {
  return (
    <Stack.Navigator>
      
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  btn: {
    
  },
});

export default App;
