import React from 'react';
import { View, Text, Image } from 'react-native';

const Orange = () => {
  return (
    <View>
      <Text>Orange</Text>
      <Image source={{ uri: 'https://example.com/orange.jpg' }} style={{ width: 100, height: 100 }} />
    </View>
  );
};

export default Orange;
