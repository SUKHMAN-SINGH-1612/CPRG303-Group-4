import { Stack } from 'expo-router';
import React from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { ActivityIndicator, View } from 'react-native';

function AppLayout() {
  const { isThemeLoading } = useTheme();

  if (isThemeLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
}
