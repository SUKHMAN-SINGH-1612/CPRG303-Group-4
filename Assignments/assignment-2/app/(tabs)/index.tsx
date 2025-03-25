import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { signIn } from '../../lib/supabase_auth';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const validateInput = async () => {
    if (username.trim().length < 5) {
      Alert.alert('Validation Error', 'Username must be at least 5 characters long.');
      return false;
    }

    try {
      const user = await signIn(username, password);
      if (!user) {
        Alert.alert('Validation Error', 'Invalid username or password.');
        return false;
      }
    } catch (error) {
      Alert.alert('Validation Error', 'Error signing in: ' + error);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (await validateInput()) {
      router.replace('/tabs/landingScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <Button title="Sign In" onPress={handleSubmit} color="#4CAF50" />
      <Button
        title="Sign Up"
        onPress={() => router.push('/tabs/signup')}
        color="#2196F3"
        style={styles.signUpButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  signUpButton: {
    marginTop: 10,
  },
});

export default SignInScreen;
