// app/welcome.tsx (Updated Welcome Screen with Light Theme)
import React from 'react';
import { View, Text, StyleSheet, Button, Image, Linking } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const CalgaryScreen = () => (
  <View style={styles.cityContainer}>
    <Text style={styles.cityTitle}>Calgary</Text>
    <Image
      source={{
        uri: 'https://www.calgary.ca/content/dam/www/images/corporate-communications/calgary-skyline.jpg',
      }}
      style={styles.cityImage}
    />
    <Button title="Go to city page" onPress={() => Linking.openURL('https://www.calgary.ca/home.html')} />
    <Text style={styles.cityInfo}>
      Calgary is known for its high quality of life, beautiful landscapes, and the annual Calgary Stampede. It
      boasts a mix of urban living and outdoor activities, including skiing in the winter and hiking in the summer.
    </Text>
  </View>
);

const EdmontonScreen = () => (
  <View style={styles.cityContainer}>
    <Text style={styles.cityTitle}>Edmonton</Text>
    <Image
      source={{
        uri: 'https://www.edmonton.ca/sites/default/files/styles/hero_image/public/images/2021-06/edmonton-skyline.jpg',
      }}
      style={styles.cityImage}
    />
    <Button title="Go to city page" onPress={() => Linking.openURL('https://www.edmonton.ca/')} />
    <Text style={styles.cityInfo}>
      Edmonton is famous for its vibrant arts scene, numerous festivals, and the largest urban park in North
      America, the River Valley. It’s also known for its historical significance and modern growth in business
      and technology.
    </Text>
  </View>
);

const WelcomeScreen = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#1e90ff', // Active tab color
      tabBarInactiveTintColor: '#a9a9a9', // Inactive tab color
      tabBarStyle: { backgroundColor: '#f0f0f0' }, // Light background for tab bar
    }}
  >
    <Tab.Screen name="Calgary" component={CalgaryScreen} />
    <Tab.Screen name="Edmonton" component={EdmontonScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  cityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background for the screens
    padding: 20,
  },
  cityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333', // Dark text for visibility
    marginBottom: 20,
  },
  cityImage: {
    width: 300,
    height: 200,
    marginBottom: 20,
    borderRadius: 10, // Soft rounded corners for images
  },
  cityInfo: {
    fontSize: 16,
    color: '#555555', // Lighter dark text for city info
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20, // Add padding for better text presentation
  },
});

export default WelcomeScreen;
