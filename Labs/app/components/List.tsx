import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const items = ['apple', 'orange', 'mango'];

const List = () => {
  const router = useRouter();

  return (
    <View>
      {items.map((item) => (
        <TouchableOpacity key={item} onPress={() => router.push(`/${item}`)}>
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default List;
