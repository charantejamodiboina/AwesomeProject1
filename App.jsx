
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import LoginPage from './Components/Login';
import Home from './Components/HomePage';
import { AuthProvider } from './Components/Auth';
import { ColorProvider, useTheme } from './Components/Color';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import customHeader from './Components/Header';


const Stack = createNativeStackNavigator()
function App() {
  
  const colors = useTheme();
  return(
    <ColorProvider>
      <AuthProvider>
        <NavigationContainer >
          <Stack.Navigator>
          
            <Stack.Screen
            name='Login'
            component={LoginPage}
            options={{header:()=>false}}
            />
            <Stack.Screen
            name='Home'
            component={Home}
            options={{headerBack:()=>false,
              // headerTitle: () => <customHeader name ="Home"/>,
              headerStyle: {
                  backgroundColor: "rgb(72, 99, 255)",
                  },
              headerTintColor : "white"
              }}
            
            
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ColorProvider>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  background : {
    backgroundGradient: "vertical",
    backgroundGradientTop: "#333333",
    backgroundGradientBottom: "#666666"
  }
});

export default App;
