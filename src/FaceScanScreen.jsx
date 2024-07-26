import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity,Modal } from 'react-native'
import { Camera, CameraType, CameraView } from 'expo-camera'
import { ENDPOINT, SIGNUP_ENDPOINT } from '../constants'
import { CheckCircle, Frown } from 'lucide-react-native';

const FaceScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const cameraRef = useRef(null)
  const [isScanned, setIsScanned] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);


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
				const photo = await cameraRef.current.takePictureAsync({ person: 1, base64: true })
				const imageData = photo.base64.replaceAll(' ', '+')

        const response = await fetch('https://5674-102-219-153-68.ngrok-free.app/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imageData }),
        })

        if (response.ok) {
          setIsSuccess(true);
          setModalMessage('Your face has been saved.');
        } else {
          setIsSuccess(false);
          setModalMessage('Ensure your face is visible and try again.');
        }
      } catch (error) {
        setIsSuccess(false);
        setModalMessage('Something went wrong!');
      } finally {
        setModalVisible(true);
        setIsScanned(false);
      }
    }
  };

  if (hasPermission === null) {
    return <View />
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.instructionText}>Take a clear picture of your face</Text>
      <CameraView
        style={styles.camera}
        facing='front'
        ref={cameraRef}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleScanFace}
          disabled={isScanned}
        >
          <Text style={styles.buttonText}>{isScanned ? 'Submitting...' : 'Submit Image'}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {isSuccess ? (
              <CheckCircle size={50} color="green" style={styles.icon} />
            ) : (
              <Frown size={50} color="red" style={styles.icon} />
            )}
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modalButtonText}>
                {isSuccess ? 'Sign Up' : 'Click here to try again'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  instructionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  camera: {
    height: '55%',
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    height: '35%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
    backgroundColor: '#FFFAB8',
  },
  modalText: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30,
  },
  modalButton: {
    backgroundColor: '#FFFAB8', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  modalButtonText: {
   color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
})

export default FaceScanScreen
