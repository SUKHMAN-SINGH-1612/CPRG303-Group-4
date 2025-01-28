import React from 'react';
import { View, Text, Image } from 'react-native';

const Apple = () => {
  return (
    <View>
      <Text>Apple</Text>
      <Image source={{ uri: 'https://example.com/apple.jpg' }} style={{ width: 100, height: 100 }} />
    </View>
  );
};

export default Apple;
