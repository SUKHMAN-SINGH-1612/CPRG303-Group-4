// // Final Project/brokebot/app/auth/sign-up.tsx
// import React from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function SignUp() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
//       <Text style={styles.title}>SIGN UP</Text>
//       <Text style={styles.subtitle}>CREATE YOUR ACCOUNT</Text>
//       <TextInput style={styles.input} placeholder="Username" />
//       <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
//       <TextInput style={styles.input} placeholder="Password" secureTextEntry />
//       <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />
//       <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/menu')}>
//         <Text style={styles.buttonText}>SIGN UP</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => router.push('/auth/login')}>
//         <Text style={styles.link}>ALREADY HAVE AN ACCOUNT? LOGIN</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#FFFFFF',
//   },
//   logo: {
//     width: 60,
//     height: 60,
//     marginTop: 50,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000000',
//     marginTop: 20,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#000000',
//     marginBottom: 30,
//   },
//   input: {
//     width: '100%',
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#D3D3D3',
//     borderRadius: 8,
//     marginVertical: 10,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#6B48FF',
//     padding: 15,
//     borderRadius: 8,
//     width: '100%',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   link: {
//     color: '#6B48FF',
//     fontSize: 14,
//   },
// });





// Final Project/brokebot/app/auth/sign-up.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../../components/BottomNavBar'; // Adjusted path

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>SIGN UP</Text>
      <Text style={styles.subtitle}>CREATE YOUR ACCOUNT</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} style={styles.icon} />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
      </View>

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

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          style={styles.input}
        />
        <Ionicons
          name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          style={styles.icon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/(tabs)/menu')}
      >
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      {/* Footer Link */}
      <TouchableOpacity onPress={() => router.push('/auth/login')}>
        <Text style={styles.footerText}>
          ALREADY HAVE AN ACCOUNT? <Text style={styles.link}>LOGIN</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/login')}>
        <Text style={styles.link}>ALREADY HAVE AN ACCOUNT? LOGIN</Text>
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
  },
  subtitle: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 30,
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