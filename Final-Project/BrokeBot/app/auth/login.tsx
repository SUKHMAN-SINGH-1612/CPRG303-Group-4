



// Final Project/brokebot/app/auth/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../../components/BottomNavBar'; // Adjusted path

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>LOGIN</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} style={styles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        <Ionicons
          name={showPassword ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/menu')}
      >
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Footer Link */}
      <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
        <Text style={styles.footerText}>
          DON'T HAVE AN ACCOUNT? <Text style={styles.link}>SIGN UP</Text>
        </Text>
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  icon: {
    marginHorizontal: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#6B48FF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#000',
  },
  link: {
    color: '#6B48FF',
    fontSize: 14,
  },
});