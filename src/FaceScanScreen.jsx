import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

const FaceScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isScanned, setIsScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleScanFace = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ quality: 1, base64: true });
      setIsScanned(true);

      try {
        const response = await fetch('', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: photo.base64 }),
        });

        if (response.ok) {
          const data = await response.json();
          Alert.alert('Success', 'Image saved successfully!');
        } else {
          Alert.alert('Error', 'Failed to save the image!');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong!');
      }

      setIsScanned(false);
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
      <Text style={styles.title}>Face Scan</Text>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        ref={(ref) => setCameraRef(ref)}
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
      </Camera>
    </SafeAreaView>
  );
};

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
});

export default FaceScanScreen;
