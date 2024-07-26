import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Upload } from 'lucide-react-native';

const SuccessScreen = ({ route }) => {
  const { data, person1, person2 }= route.params;
  useEffect(() => {
    if (person1 && person2) {
      console.log(`Image URIs: Person1 - ${person1}, Person2 - ${person2}`);
    }
  }, [person1, person2]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Here's the Verdict!</Text>
      <LinearGradient
        colors={['#FFFFFF', '#FFFAB8']}
        style={styles.bodyBox}
      >
        <Text style={styles.subtitle}>
			{
				data.alike ? "Mirror, mirror on the wall, who's the twinliest of them all? These two! 🥳 🥳" : "Guess they're from different planets! No resemblance found here.🤣🤣"
			}
          
        </Text>
        <Text style={styles.score}>
          Similarity score: {data?.score}%
        </Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: person1 }} style={styles.image} />
          <Image source={{ uri: person2 }} style={styles.image} />
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.buttonText}>Share</Text>
          <Upload width={24} height={24} color='#FFF' />
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAB8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  bodyBox: {
    width: '90%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  shareButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 10,
  },
});

export default SuccessScreen;
