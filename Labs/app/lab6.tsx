import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getAnimals } from '../libs/supabase_crud';

const SampledatabaseDB = () => {
  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const animalsData = await getAnimals();
        setAnimals(animalsData);
      } catch (error) {
        console.error('Error fetching animals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : animals.length > 0 ? (
        animals.map((animal) => (
          <Text key={animal.id} style={styles.animal}>
            {animal.name} - {animal.breed} - {animal.age} years old
          </Text>
        ))
      ) : (
        <Text>No animals found.</Text>
      )}
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
  animal: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default SampledatabaseDB;
