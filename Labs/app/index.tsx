import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import List from './components/List';

const Index = () => {
  const router = useRouter();

  return (
    <View>
      <Text>Welcome to the app!</Text>
      <Button title="Go to Lab 3" onPress={() => router.push('/lab_3')} />
      <List />
    </View>
  );
};

export default Index;