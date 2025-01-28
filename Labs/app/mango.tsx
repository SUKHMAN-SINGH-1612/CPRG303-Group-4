import React from 'react';
import { View, Text, Image } from 'react-native';

const Mango = () => {
  return (
    <View>
      <Text>Mango</Text>
      <Image source={{ uri: 'https://media.istockphoto.com/id/1019835828/photo/mango-and-leaf-isolated-white-background.jpg?s=612x612&w=0&k=20&c=_nmOBzO9mGEitT2rUvO1xAX9jwL5mHYI8AFRbYeyy-A=' }} style={{ width: 100, height: 100 }} />
    </View>
  );
};

export default Mango;
