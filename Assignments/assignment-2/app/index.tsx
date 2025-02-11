import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import credentials from '../credentials.json'; // Import credentials

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Navigation via expo-router
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  const validateInput = () => {
    if (username.trim().length < 5) {
      Alert.alert('Validation Error', 'Username must be at least 5 characters long.');
      return false;
    }

    const user = credentials.users.find(
      (user) => user.username === username && user.password === password
    );
  if (!passwordRegex.test(password)) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return false;
    }
    if (!user) {
      Alert.alert('Validation Error', 'Invalid username or password.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateInput()) {
      console.log('Username:', username);
      console.log('Password:', password);
      router.replace('/tabs/calgary');
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