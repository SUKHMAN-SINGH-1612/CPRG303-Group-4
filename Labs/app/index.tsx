import React from 'react';
import { View, Text, Button } from 'react-native';
import List from './components/List';

const Index = () => {
  return (
    <View>
      <Text>Welcome to the app!</Text>
      <Button title="Click me" onPress={() => alert('Button clicked!')} />
      <List />
    </View>
  );
};

export default Index;