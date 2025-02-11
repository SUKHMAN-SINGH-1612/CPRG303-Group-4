import React from 'react';
import { View, Text, StyleSheet, Button, Image, Linking } from 'react-native';
 
export default function CalgaryScreen() {
  return (
    <View style={styles.cityContainer}>
      <Text style={styles.cityTitle}>Calgary</Text>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Downtown_Calgary_2020-4.jpg/800px-Downtown_Calgary_2020-4.jpg' }}
        style={styles.cityImage}
      />
      <Button title="Go to city page" onPress={() => Linking.openURL('https://www.calgary.ca/home.html')} />
      <Text style={styles.cityInfo}>
        Calgary is known for its high quality of life, beautiful landscapes, and the annual Calgary Stampede.
      </Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  cityContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  cityTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  cityImage: { width: 300, height: 200, marginBottom: 20, borderRadius: 10 },
  cityInfo: { fontSize: 16, color: '#555', textAlign: 'center', marginTop: 10, paddingHorizontal: 20 },
});
 