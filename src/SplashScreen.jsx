import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

const SplashScreenComponent = () => {
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(1));

  useEffect(() => {
    const zoomIn = Animated.timing(animation, {
      toValue: 1.5,
      duration: 3000, 
      useNativeDriver: true,
    });

    zoomIn.start();

    setTimeout(async () => {
      await SplashScreen.hideAsync();
      navigation.replace('Landing');
    }, 3000); 
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/splash.jpg')}
        style={[styles.image, { transform: [{ scale: animation }] }]}
      />
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
