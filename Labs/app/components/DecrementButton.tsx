import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface DecrementButtonProps {
  decrement: () => void;
}

const DecrementButton: React.FC<DecrementButtonProps> = ({ decrement }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={decrement}>
      <Text style={styles.text}>Decrement</Text>
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
    textAlign: 'center',
  },
});

export default DecrementButton;
