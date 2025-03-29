import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Brokebot!</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/sign-up')}>
        <Text style={styles.buttonText}>Proceed to Sign Up!</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/login')}>
        <Text style={styles.buttonText}>Go to Lab 4</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/menu')}>
        <Text style={styles.buttonText}>Go to Lab 5</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/history')}>
        <Text style={styles.buttonText}>Go to Lab 6</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1330bf', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Index;
