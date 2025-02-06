import React from 'react';

interface DecrementButtonProps {
  decrement: () => void;
}

const DecrementButton: React.FC<DecrementButtonProps> = ({ decrement }) => {
  return <button onClick={decrement}>Decrement</button>;
};

export default DecrementButton;
