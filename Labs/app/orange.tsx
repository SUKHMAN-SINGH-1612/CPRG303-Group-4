import React from 'react';
import { View, Text, Image } from 'react-native';

const Orange = () => {
  return (
    <View>
      <Text>Orange</Text>
      <Image source={{ uri: 'https://t3.ftcdn.net/jpg/02/01/79/54/360_F_201795443_a16jojvPRiobPC96uO7ePHSNzGVoBLbc.jpg' }} style={{ width: 100, height: 100 }} />
    </View>
  );
};

export default Orange;
