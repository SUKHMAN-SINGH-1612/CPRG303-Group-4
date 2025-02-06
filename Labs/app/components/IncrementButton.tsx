import React from 'react';
import { Button } from 'react-native';

interface IncrementButtonProps {
  increment: () => void;
}

const IncrementButton: React.FC<IncrementButtonProps> = ({ increment }) => {
  return <Button title="Increment" onPress={increment} />;
};

export default IncrementButton;
