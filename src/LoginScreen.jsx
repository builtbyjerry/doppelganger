import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Welcome {'\n'}back!!!! {'\n'}🤪🤪🤪</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScan')}>
          <Text style={styles.buttonText}>Log in NOW!!!😡</Text>
        </TouchableOpacity>
      </View>
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
  box: {
    width: '80%',
    height: '40%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFFAB8',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
