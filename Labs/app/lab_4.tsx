import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import vacationDestinations from '../constants/list_item';

const Lab4 = () => {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Toggle selection based on destination ID
  const toggleSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Destination</Text>

      <FlatList
        data={vacationDestinations}
        keyExtractor={(item) => item.id.toString()} // Use ID as key
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => toggleSelection(item.id)}>
            <Text style={styles.itemText}>
              {item.location} - ${item.price} - {item.average_yearly_temperature}{" "}
              {selectedItems.includes(item.id) ? '✅' : ''}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
  },
  itemText: {
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#001F54',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Lab4;
