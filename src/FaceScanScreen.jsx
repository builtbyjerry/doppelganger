import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import  Camera  from 'expo-camera';
import * as FileSystem from 'expo-file-system';

const FaceScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef) {
      setLoading(true);
      const photo = await cameraRef.takePictureAsync({ quality: 1, base64: true });
      await savePictureToDatabase(photo.base64);
      setLoading(false);
    }
  };

  const savePictureToDatabase = async (base64Image) => {
    try {
      const response = await fetch('https://your-backend-url.com/saveImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Picture saved successfully!');
      } else {
        console.log(await response.text());
        Alert.alert('Error', 'Failed to save picture.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Doppelgänger Detective🕵🏿‍♂️</Text>
      <Text style={styles.title}>Scan your face to save it in the database</Text>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} ref={setCameraRef} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Take Picture</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAB8',
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  camera: {
    width: '90%',
    height: '70%',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FaceScanScreen;
