import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { signUp } from '../../lib/supabase_auth';

const SignUpScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const validateInput = () => {
    if (firstName.trim().length === 0) {
      Alert.alert('Validation Error', 'First name is required.');
      return false;
    }
    if (lastName.trim().length === 0) {
      Alert.alert('Validation Error', 'Last name is required.');
      return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (validateInput()) {
      try {
        const user = await signUp(email, password);
        Alert.alert('Success', 'Account created successfully!');
        router.replace('/');
      } catch (error) {
        Alert.alert('Error', 'There was an issue creating your account.');
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize="words"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="words"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <Button title="Sign Up" onPress={handleSignUp} color="#4CAF50" />
      <Button
        title="Back to Sign In"
        onPress={() => router.replace('/')}
        color="#2196F3"
        style={styles.backButton}
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
  backButton: {
    marginTop: 10,
  },
});

export default SignUpScreen;
