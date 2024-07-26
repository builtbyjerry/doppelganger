import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from './src/SplashScreen'
import LandingScreen from './src/LandingScreen'
import HomeScreen from './src/HomeScreen'
import SignUpScreen from './src/SignUpScreen'
import LoginScreen from './src/LoginScreen'
import CompareScreen from './src/CompareScreen'
import FaceScanScreen from './src/FaceScanScreen'
import SuccessScreen from './src/SuccessScreen'
import LoginScanScreen from './src/LoginScanScreen'
const Stack = createNativeStackNavigator()

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Splash'>
			<Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
		  />
				<Stack.Screen
					name='Landing'
					component={LandingScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='SignUp'
					component={SignUpScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Login'
					component={LoginScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='LoginScan'
					component={LoginScanScreen}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name='Compare'
					component={CompareScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='FaceScan'
					component={FaceScanScreen}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name='Success'
					component={SuccessScreen}
					options={{modal: true, headerShown: false}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
