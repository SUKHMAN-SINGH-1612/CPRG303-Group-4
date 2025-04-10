import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext'; // Import useTheme
import { Colors } from '../../constants/Colors'; // Import Colors
import BottomNavBar from '../../components/BottomNavBar'; // Import your custom BottomNavBar

export default function TabLayout() {
  const { theme } = useTheme();
  const colors = Colors[theme]; // Get colors for the current theme

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.background, // Set background color based on theme
          borderTopColor: theme === 'light' ? '#ddd' : '#333', // Optional: Adjust border color
        },
        headerShown: false, // Hide default header for all tabs
      }}
      // Use your custom BottomNavBar component if it handles the full tab bar UI
      // tabBar={(props) => <BottomNavBar {...props} />} // Uncomment this if BottomNavBar is the full tab bar
      // If BottomNavBar is just a component placed *within* screens,
      // leave the above line commented and ensure BottomNavBar adapts to the theme itself.
    >
      {/* Define your tabs here */}
      {/* Example: Assumes you have a 'Home' screen component */}
      {/* <Tabs.Screen
        name="home" // This corresponds to a file like app/(tabs)/home.tsx
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      /> */}

      <Tabs.Screen
        name="add-transaction" // Corresponds to add-transaction.tsx
        options={{
          title: 'Add',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={28} color={color} />
          ),
        }}
      />

       <Tabs.Screen
        name="history" // Corresponds to history.tsx
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'list' : 'list-outline'} size={24} color={color} />
          ),
        }}
      />

       <Tabs.Screen
        name="spending-insights" // Corresponds to spending-insights.tsx
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'analytics' : 'analytics-outline'} size={24} color={color} />
          ),
        }}
      />

       <Tabs.Screen
        name="manage-budget" // Corresponds to manage-budget.tsx
        options={{
          title: 'Budget',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'wallet' : 'wallet-outline'} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="PreferencesPage" // Corresponds to PreferencesPage.tsx
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={24} color={color} />
          ),
        }}
      />

       {/* Add other screens like menu.tsx if they should be tabs */}
       {/* Make sure the 'name' matches the filename without the extension */}

    </Tabs>
  );
} 