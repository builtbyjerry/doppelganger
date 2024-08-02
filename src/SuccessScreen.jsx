import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Share2 } from 'lucide-react-native';

const SuccessScreen = ({ route }) => {
  const { data, person1, person2 }= route.params;
  useEffect(() => {
    if (person1 && person2) {
      console.log(`Image URIs: Person1 - ${person1}, Person2 - ${person2}`);
    }
  }, [person1, person2]);


  const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid,
) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity: shadowOpacity,
      shadowRadius: shadowRadius,
    };
  } else {
    return {
      elevation: elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};

  const imgBorderColor = data.alike ? '#28ED6B': '#ED28AA';
  const bodyBoxShadow = generateBoxShadowStyle(0, 5, '#171717', 0.4, 7, 10, '#171717')


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Here's the Verdict!</Text>
      <View style={[styles.bodyBox, bodyBoxShadow]}>
        <LinearGradient
        colors={['#FFFFFF', '#FFFAB8']}
        style={styles.bodyBoxGradient}
        start={{ x: 0.5, y:0.5 }}
     
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
          <Image source={{ uri: person1 }} style={[styles.image, {borderColor: imgBorderColor}]} />
          <Image source={{ uri: person2 }} style={[styles.image, {borderColor: imgBorderColor}]} />
        </View>
        <TouchableOpacity style={[styles.shareButton, styles.shareButtonShadow]}>
          <Share2 width={24} height={24} color='#FFF' />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </LinearGradient>
      </View>
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
    marginBottom: 30,
    color: '#505050'
  },
  bodyBox: {
  },
  bodyBoxGradient: {
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
    fontWeight: 800,
  },
  score: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    gap: 10,
  },
  image: {
    width: 150,
    height: 160,
    borderWidth: 1, 
    borderRadius: 10,
  },
  shareButton: {
    backgroundColor: '#171717',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  shareButtonShadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 15,
  },
});

export default SuccessScreen;
