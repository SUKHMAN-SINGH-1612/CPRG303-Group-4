// Final Project/brokebot/components/BottomNavBar.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

// Define the type for icon names
type IconName =
  | 'home-outline'
  | 'home'
  | 'grid-outline'
  | 'grid'
  | 'bar-chart-outline'
  | 'bar-chart'
  | 'person-outline'
  | 'person';

// Define the type for each tab
interface Tab {
  name: string;
  route: string; // We'll extract the specific route types from `tabs`
  iconOutline: IconName;
  iconFilled: IconName;
}

export default function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  // Define the routes for each tab with `as const` to make routes literal types
  const tabs = [
    { name: 'Home', route: '/auth/sign-up', iconOutline: 'home-outline', iconFilled: 'home' },
    { name: 'Menu', route: '/(tabs)/menu', iconOutline: 'grid-outline', iconFilled: 'grid' },
    { name: 'Stats', route: '/(tabs)/spending-insights', iconOutline: 'bar-chart-outline', iconFilled: 'bar-chart' },
    { name: 'Profile', route: '/auth/login', iconOutline: 'person-outline', iconFilled: 'person' },
  ] as const;

  // Extract the union of route strings from `tabs`
  type AppRoute = typeof tabs[number]['route'];

  // Determine the active tab based on the current route
  const activeTab = tabs.find(tab => pathname === tab.route)?.name || 'Home';

  // Type the `route` parameter as `AppRoute`
  const handleNavigation = (route: AppRoute) => {
    router.push(route as string); // Cast `route` to `string` to satisfy `router.push`
  };

  return (
    <View style={styles.navBar}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => handleNavigation(tab.route)}
          style={styles.navItem}
        >
          <Ionicons
            name={activeTab === tab.name ? tab.iconFilled : tab.iconOutline}
            size={24}
            color="#6B48FF"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
});