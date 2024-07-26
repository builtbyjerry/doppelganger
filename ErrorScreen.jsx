import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const ErrorScreen = ({data}) => {
    return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Comparison Results</Text>
			<Text style={styles.subtitle}>
				The results {'\n'} are in...
			</Text>
            <View style={styles.imageContainer}>
                <Text style={styles.result}>
                    
                    Similarity score: {data.score}% 
                </Text>
                <Image
                    source={{uri: person1}}
                    style={styles.image} 
                    />
                
                <Image
					source={{ uri: person2 }}
					style={styles.image}
					/>
                <TouchableOpacity style={styles.shareButton}>
                    <Text style={styles.buttonText}>Share</Text>
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
   






