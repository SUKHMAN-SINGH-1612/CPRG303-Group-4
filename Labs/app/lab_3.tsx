import React, { useState } from 'react';
import IncrementButton from './components/IncrementButton';
import DecrementButton from './components/DecrementButton';

const Lab3 = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <IncrementButton increment={increment} />
      <DecrementButton decrement={decrement} />
    </div>
  );
};

export default Lab3;
