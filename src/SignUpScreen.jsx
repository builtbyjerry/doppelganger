import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ScanFace } from 'lucide-react-native'

const SignUpScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.box}>
				<View style={styles.iconContainer}>
					<ScanFace
						size={50}
						color='#000'
						style={styles.icon}
					/>
				</View>
				<Text style={styles.text}>Let's scan your face to sign you up</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate('FaceScan')}
				>
					<Text style={styles.buttonText}>Launch your camera</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFAB8',
	},
	box: {
		width: '88%',
		height: 'auto',
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		// justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 52,
		paddingHorizontal: 24,
	},
	iconContainer: {
		backgroundColor: '#FFFAB8',
		marginBottom: 10,
	},
	text: {
		fontSize: 28,
		textAlign: 'center',
		marginTop: 16,
		marginBottom: 28,
	},
	button: {
		backgroundColor: '#FFFAB8',
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 5,
	},
	buttonText: {
		color: '#000',
		fontSize: 16,
		textAlign: 'center',
	},
})

export default SignUpScreen
