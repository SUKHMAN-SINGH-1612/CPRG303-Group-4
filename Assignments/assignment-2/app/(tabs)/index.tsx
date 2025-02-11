import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<{ username: string; password: string }[]>([]);

  // Load credentials.json when the app starts
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const fileUri = FileSystem.documentDirectory + 'credentials.json';
        const fileExists = await FileSystem.getInfoAsync(fileUri);

        if (!fileExists.exists) {
          Alert.alert('Error', 'Credentials file not found.');
          return;
        }

        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        const jsonData = JSON.parse(fileContent);

        if (jsonData.users) {
          setUsers(jsonData.users);
        } else {
          Alert.alert('Error', 'Invalid credentials file format.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load credentials.');
      }
    };

    loadCredentials();
  }, []);

  // Corrected password validation regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

  const handleSubmit = () => {
    if (!validateInput()) {
      return;
    }

    // Find user in credentials.json
    const user = users.find((u) => u.username === username);

    if (!user) {
      Alert.alert('Login Failed', 'Username not found.');
      return;
    }

    if (user.password !== password) {
      Alert.alert('Login Failed', 'Incorrect password.');
      return;
    }

    Alert.alert('Login Successful', `Welcome, ${username}!`);
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
