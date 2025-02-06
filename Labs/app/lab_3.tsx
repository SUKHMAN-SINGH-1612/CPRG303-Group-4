import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IncrementButton from './components/IncrementButton';
import DecrementButton from './components/DecrementButton';

const Lab3 = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Counter: {counter}</Text>
      <View style={styles.buttonContainer}>
        <IncrementButton increment={increment} />
        <DecrementButton decrement={decrement} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});

export default Lab3;
