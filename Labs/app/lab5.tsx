import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import CallAPI from './components/CallAPI';

const Lab5 = () => {
  const [showAPI, setShowAPI] = useState(false);

  return (
    <View style={styles.container}>
      <Button title="Toggle API Call" onPress={() => setShowAPI(!showAPI)} />
      {showAPI && <CallAPI />}
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
