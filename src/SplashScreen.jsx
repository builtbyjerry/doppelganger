import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

const SplashScreenComponent = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
      navigation.replace('Landing');
    }, 5000); 
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash.jpg')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAB8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SplashScreenComponent;
