import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import CallAPI from './components/CallAPI';

const Lab5 = () => {
  const [showAPI, setShowAPI] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Toggle API Call" onPress={() => setShowAPI(!showAPI)} />
      {showAPI && <CallAPI />}
      <Button title="Go to Home" onPress={() => router.push('/')} color="#FF6347" />
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
});

export default Lab5;
