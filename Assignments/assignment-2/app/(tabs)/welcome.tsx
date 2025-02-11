import React from 'react';
import { View, Text, StyleSheet, Image, Linking, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
const Tab = createBottomTabNavigator();
 
const CalgaryScreen = () => (
  <View style={styles.cityContainer}>
    <Text style={styles.cityTitle}>Calgary</Text>
    <Image source={{ uri: 'https://www.calgary.ca/content/dam/www/images/corporate-communications/calgary-skyline.jpg' }} style={styles.cityImage} />
    <Button title="Go to city page" onPress={() => Linking.openURL('https://www.calgary.ca/home.html')} />
    <Text style={styles.cityInfo}>Calgary is known for its high quality of life and beautiful landscapes.</Text>
  </View>
);
 
const EdmontonScreen = () => (
  <View style={styles.cityContainer}>
    <Text style={styles.cityTitle}>Edmonton</Text>
    <Image source={{ uri: 'https://www.edmonton.ca/sites/default/files/styles/hero_image/public/images/2021-06/edmonton-skyline.jpg' }} style={styles.cityImage} />
    <Button title="Go to city page" onPress={() => Linking.openURL('https://www.edmonton.ca/')} />
    <Text style={styles.cityInfo}>Edmonton is known for its vibrant arts scene and beautiful river valley.</Text>
  </View>
);
 
const WelcomeScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="Calgary" component={CalgaryScreen} />
    <Tab.Screen name="Edmonton" component={EdmontonScreen} />
  </Tab.Navigator>
);
 
const styles = StyleSheet.create({
  cityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cityImage: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  cityInfo: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
 
export default WelcomeScreen;