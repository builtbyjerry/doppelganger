import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './src/LandingScreen';
import HomeScreen from './src/HomeScreen'
import SignUpScreen from './src/SignUpScreen';
import LoginScreen from './src/LoginScreen';
import CompareScreen from './src/CompareScreen';
import FaceScanScreen from './src/FaceScanScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUpScreen} options={{headerShown:false}} />
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="Compare" component={CompareScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="FaceScan" component={FaceScanScreen} /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
