import React from 'react';

interface IncrementButtonProps {
  increment: () => void;
}

const IncrementButton: React.FC<IncrementButtonProps> = ({ increment }) => {
  return <button onClick={increment}>Increment</button>;
};

export default IncrementButton;
