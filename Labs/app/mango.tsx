import React from 'react';
import { View, Text, Image } from 'react-native';

const Mango = () => {
  return (
    <View>
      <Text>Mango</Text>
      <Image source={{ uri: 'https://example.com/mango.jpg' }} style={{ width: 100, height: 100 }} />
    </View>
  );
};

export default Mango;
