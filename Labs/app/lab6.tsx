import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import supabase from '../lib/supabase';

const Lab6 = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('sampledatabase') // Replace with your table name
        .select('*');

      if (error) {
        console.error(error);
      } else {
        setData(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sample Database Records</Text>
      <ScrollView>
        {data.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            {Object.entries(item).map(([key, value]) => (
              <Text key={key} style={styles.itemText}>{`${key}: ${value}`}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa', // Light cyan background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b', // Teal color
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#00796b', // Teal accent
  },
  itemText: {
    fontSize: 16,
    color: '#004d40', // Dark teal color
    marginBottom: 5,
  },
});

export default Lab6;