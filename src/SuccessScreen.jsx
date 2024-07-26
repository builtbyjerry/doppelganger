import React, {useState} from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Upload } from 'lucide-react-native'


const SuccessScreen = ({route}) => {
	console.log(route.params)
	const data = route.params?.data
	const [person1, setPerson1] = useState(null)
	const [person2, setPerson2] = useState(null)  

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Here's the Verdict!</Text>
				<Text style={styles.subtitle}>
					The results {'\n'} are in...
				</Text>
			</View>
            <View style={styles.bodyBox}>
				<View style={styles.imageText}>
					<Text style={styles.result}>
						Similarity score: {data?.score}% 
					</Text>
				</View>
				<View style={styles.imageContainer}>
					<Image
						source={{uri: person1}}
						style={styles.image} 
						/>
					
					<Image
						source={{ uri: person2 }}
						style={styles.image}
						/>
				</View>
                <TouchableOpacity style={styles.shareButton}>
                    <Text style={styles.buttonText}>Share</Text>
							<Upload
								width={50}
								height={30}
								color='##FFFAB8'
							/>
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
        backgroundColor: '#FFF78C',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		marginBottom: 50,
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
	},
	shareButton: {
		backgroundColor: '#000000',
		paddingVertical: 15,
		paddingHorizontal: 70,
		borderRadius: 15,
	},
	buttonText: {
		fontSize: 16,
		textAlign: 'center',
        color: '#FFFDFD',
	},
})


export default SuccessScreen;
