
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import CallAPI from './components/CallAPI';

const Lab5 = () => {
  const [showAPI, setShowAPI] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setShowAPI(!showAPI)}>
        <Text style={[styles.buttonText, { color: 'red' }]}>Toggle API Call</Text>
      </TouchableOpacity>

      {showAPI && <CallAPI />}

      <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
        <Text style={[styles.buttonText, { color: 'yellow' }]}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Lab5;
