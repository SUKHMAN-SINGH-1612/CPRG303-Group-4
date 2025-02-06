import React from 'react';
import { Button } from 'react-native';

interface DecrementButtonProps {
  decrement: () => void;
}

const DecrementButton: React.FC<DecrementButtonProps> = ({ decrement }) => {
  return <Button title="Decrement" onPress={decrement} />;
};

export default DecrementButton;
