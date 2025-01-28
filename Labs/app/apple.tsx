import React from 'react';
import { View, Text, Image } from 'react-native';

const Apple = () => {
  return (
    <View>
      <Text>Apple</Text>
      <Image source={{ uri: 'https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w=' }} style={{ width: 100, height: 100 }} />
    </View>
  );
};

export default Apple;
