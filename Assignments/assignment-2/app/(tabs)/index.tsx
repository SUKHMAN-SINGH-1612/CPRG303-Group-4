import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { signIn } from '../../lib/supabase_auth'; // Import the signIn function

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Navigation via expo-router

  const validateInput = async () => {
    if (username.trim().length < 5) {
      Alert.alert('Validation Error', 'Username must be at least 5 characters long.');
      return false;
    }

    // Removed password validation logic

    try {
      // Attempt to sign in with Supabase credentials
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
      console.log('Username:', username);
      console.log('Password:', password);
      router.replace('/tabs/landingScreen'); // Restored navigation to landing screen with bottom nav
    }
  };

  return (
    <View style={styles.container}>
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
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
});

export default SignInScreen;
