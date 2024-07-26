import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { Camera } from 'expo-camera'
import { Upload } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native';

const CompareScreen = () => {
	const [person1, setPerson1] = useState(null)
	const [person2, setPerson2] = useState(null)
	const [loading, setLoading] = useState(false)
	const [hasPermission, setHasPermission] = useState(null)
	const navigation = useNavigation()

	const selectPickType = ({ action }) => {
		Alert.alert(
			'Select Images',
			'Pick from gallery or camera',
			[
				{
					text: 'Take a picture',
					onPress: async () => await pickImage({ action, type: 'camera' }),
				},
				{
					text: 'Upload from gallery',
					onPress: async () => {
						await pickImage({ action, type: 'gallery' })
					},
				},
				{
					text: 'Close',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
			],
			{
				cancelable: true,
			}
		)
	}

	const pickImage = async ({ action, type }) => {
		/**
		 * @type {import('expo-image-picker').ImagePickerResult}
		 * **/
		let result = { canceled: false, assets: [] }

		if (type == 'gallery') {
			result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			})
			action(result.assets[0].uri)
		}

		if (type == 'camera') {
			if (hasPermission) {
				result = await ImagePicker.launchCameraAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				})

				action(result.assets[0].uri)
			} else {
				const { status } = await Camera.requestCameraPermissionsAsync()
				setHasPermission(status === 'granted')
				result = await ImagePicker.launchCameraAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 3],
					quality: 1,
				})
				action(result.assets[0].uri)
			}
		}
	}

	const convertToBase64 = async (uri) => {
		const base64 = await FileSystem.readAsStringAsync(uri, {
			encoding: FileSystem.EncodingType.Base64,
		})
		return base64
	}

	const handleCalculate = async () => {
		if (person1 && person2) {
			try {
				setLoading(true)
				const base64Person1 = await convertToBase64(person1)
				const base64Person2 = await convertToBase64(person2)

				const response = await fetch('https://5674-102-219-153-68.ngrok-free.app/compare2', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						person1: base64Person1,
						person2: base64Person2,
					}),
				})

				if (response.ok) {
					const apiResponse = await response.json()
					if (apiResponse.data) {
						navigation.navigate('Success', { 
							data: apiResponse.data, 
							person1,
							person2
						})
					} else {
						Alert.alert('Oh chim', 'The similarity percentage is missing')
					}
				} else {
					console.log(await response.text())
					Alert.alert('Failure', 'Not similar')
				}
			} catch (error) {
				console.log(error)
				Alert.alert('Error', 'Something went horribly wrong!')
			} finally {
				setLoading(false)
			}
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Who's your twin?</Text>
			<Text style={styles.subtitle}>
				Upload images of two people {'\n'} and see how much they look alike
			</Text>
			<View style={styles.imageContainer}>
				<TouchableOpacity
					style={styles.imageBox}
					onPress={() => selectPickType({ action: setPerson1 })}
				>
					{person1 ? (
						<Image
							source={{ uri: person1 }}
							style={styles.image}
						/>
					) : (
						<View style={styles.iconBackground}>
							<Upload
								width={50}
								height={30}
								color='#000'
							/>
						</View>
					)}
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.imageBox}
					onPress={() => selectPickType({ action: setPerson2 })}
				>
					{person2 ? (
						<Image
							source={{ uri: person2 }}
							style={styles.image}
						/>
					) : (
						<View style={styles.iconBackground}>
							<Upload
								width={50}
								height={30}
								color='#000'
							/>
						</View>
					)}
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={[styles.button, { opacity: person1 && person2 ? 1 : 0.5 }]}
				disabled={!person1 || !person2 || loading}
				onPress={handleCalculate}
			>
				<Text style={styles.buttonText}>Compar{loading ? 'ing' : 'e'} Faces</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FAF9F6',
	},
	title: {
		fontSize: 40,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 50,
	},
	imageContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		marginBottom: 50,
	},
	imageBox: {
		width: 180,
		height: 250,
		backgroundColor: '#D3D3D3',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#000',
	},
	iconBackground: {
		width: 150,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF',
		borderRadius: 15,
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
	},
	button: {
		backgroundColor: '#FFFAB8',
		paddingVertical: 15,
		paddingHorizontal: 70,
		borderRadius: 15,
	},
	buttonText: {
		fontSize: 16,
		textAlign: 'center',
	},
})

export default CompareScreen
