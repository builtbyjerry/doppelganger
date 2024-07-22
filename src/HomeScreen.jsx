import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHalf}>
        <Text style={styles.title}>Doppelgänger Detective🕵🏿‍♂️</Text>
      </View>
      <View style={styles.bottomHalf}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.ghostButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAB8',
  },
  bottomHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFFAB8',
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  ghostButton: {
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 15,
    borderColor: '#999',
    borderWidth: 2,     
    marginBottom: 10,
  },
  ghostButtonText: {
    color: '#000', 
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
