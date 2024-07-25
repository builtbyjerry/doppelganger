import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Camera, CameraType, CameraView } from 'expo-camera'
import { ENDPOINT, SIGNUP_ENDPOINT } from '../constants'

const FaceScanScreen = () => {
	const [hasPermission, setHasPermission] = useState(null)
	const cameraRef = useRef(null)
	const [isScanned, setIsScanned] = useState(false)

	useEffect(() => {
		;(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync()
			setHasPermission(status === 'granted')
		})()
	}, [])

	const handleScanFace = async () => {
		if (cameraRef.current) {
			setIsScanned(true)

			try {
				/**
				 * @type {{base64: string}}
				 */
				const photo = await cameraRef.current.takePictureAsync({ quality: 1, base64: true })
				const imageData = photo.base64.replaceAll(' ', '+')

				const response = await fetch(SIGNUP_ENDPOINT, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ person: imageData }),
				})

				if (response.ok) {
					Alert.alert('Success', 'Image saved successfully!')
				} else {
					Alert.alert('Error', 'Failed to save the image!')
				}
			} catch (error) {
				console.log(error)
				Alert.alert('Error', 'Something went wrong!')
			}

			setIsScanned(false)
		}
	}

	if (hasPermission === null) {
		return <View />
	}

	if (hasPermission === false) {
		return <Text>No access to camera</Text>
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Face Scan</Text>
			<CameraView
				style={styles.camera}
				facing='front'
				ref={cameraRef}
			>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={handleScanFace}
						disabled={isScanned}
					>
						<Text style={styles.buttonText}>{isScanned ? 'Scanning...' : 'Scan Face'}</Text>
					</TouchableOpacity>
				</View>
			</CameraView>
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
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
	},
	camera: {
		flex: 1,
		width: '100%',
	},
	buttonContainer: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'row',
		margin: 20,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
		backgroundColor: '#000',
		paddingVertical: 15,
		borderRadius: 5,
		marginBottom: 20,
	},
	buttonText: {
		color: '#FFF',
		fontSize: 16,
		textAlign: 'center',
	},
})

export default FaceScanScreen
