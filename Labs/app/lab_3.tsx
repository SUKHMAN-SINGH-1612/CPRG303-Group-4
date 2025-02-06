import React, { useState } from 'react';
import { View, Text } from 'react-native';
import IncrementButton from './components/IncrementButton';
import DecrementButton from './components/DecrementButton';

const Lab3 = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);

  return (
    <View>
      <Text>Counter: {counter}</Text>
      <IncrementButton increment={increment} />
      <DecrementButton decrement={decrement} />
    </View>
  );
};

export default Lab3;
