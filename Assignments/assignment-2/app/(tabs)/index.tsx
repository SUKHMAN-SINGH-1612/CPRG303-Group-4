import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import credentials from '../../credentials.json';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Corrected regex for password validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Function to validate username and password
  const validateInput = () => {
    if (username.trim().length < 5) {
      Alert.alert('Validation Error', 'Username must be at least 5 characters long.');
      return false;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return false;
    }

    return true;
  };

  // Function to check if the credentials match
  const checkCredentials = () => {
    return credentials.users.some(
      (user) => user.username === username && user.password === password
    );
  };

  const handleSubmit = () => {
    if (validateInput()) {
      if (checkCredentials()) {
        Alert.alert('Sign In Successful', `Username: ${username}`);
      } else {
        Alert.alert('Sign In Failed', 'Invalid username or password.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Sign In" onPress={handleSubmit} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default App;