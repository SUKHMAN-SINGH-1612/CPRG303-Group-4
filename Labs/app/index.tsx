import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import List from './components/List';

const Index = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the app!</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/lab_3')}>
        <Text style={styles.buttonText}>Go to Lab 3</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/lab_4')}>
        <Text style={styles.buttonText}>Go to Lab 4</Text>
      </TouchableOpacity>
      <List />
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
