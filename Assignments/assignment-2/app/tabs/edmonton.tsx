import React from 'react';
import { View, Text, StyleSheet, Button, Image, Linking } from 'react-native';

export default function EdmontonScreen() {
  return (
    <View style={styles.cityContainer}>
      <Text style={styles.cityTitle}>Edmonton</Text>
      <Image
        source={{ uri: 'https://www.edmonton.ca/sites/default/files/styles/hero_image/public/images/2021-06/edmonton-skyline.jpg' }}
        style={styles.cityImage}
      />
      <Button title="Go to city page" onPress={() => Linking.openURL('https://www.edmonton.ca/')} />
      <Text style={styles.cityInfo}>
        Edmonton is famous for its vibrant arts scene, numerous festivals, and the River Valley.
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
