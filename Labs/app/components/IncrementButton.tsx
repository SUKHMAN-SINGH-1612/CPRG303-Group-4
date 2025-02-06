import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface IncrementButtonProps {
  increment: () => void;
}

const IncrementButton: React.FC<IncrementButtonProps> = ({ increment }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={increment}>
      <Text style={styles.text}>Increment</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default IncrementButton;
