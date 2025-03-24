import React from "react";
import { Tabs, useRouter } from "expo-router";
import { Alert } from "react-native";

export default function TabsLayout() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => router.replace("/") }
      ]
    );
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: route.name === "signup" || route.name === "landing" 
          ? { display: "none" } 
          : { backgroundColor: "#f9f9f9", height: 60 }, // Updated to light theme
        tabBarActiveTintColor: "#6200EE",
        tabBarInactiveTintColor: "#666",
      })}
    >

      <Tabs.Screen
        name="logout"
        options={{ title: "Logout" }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();  // Prevent navigation
            handleLogout();      // Trigger the logout alert
          }
        }}
      />
    </Tabs>
  );
}
