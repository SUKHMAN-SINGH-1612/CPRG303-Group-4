import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut } from '../../lib/supabase_auth';
import supabase from '../../lib/supabase';
import { useNavigation } from '@react-navigation/native';

const LandingScreen = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    // Hide the bottom tab bar
    navigation.setOptions({ tabBarStyle: { display: 'none' } });

    // Fetch the user object from Supabase auth using getUser method
    const fetchUserDetails = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else if (!data.user) {
        // Redirect to login if no user is found
        router.replace('/');
      } else {
        setUserDetails(data.user); // Set the user details if found
      }
    };

    fetchUserDetails();

    return () => {
      // Restore the bottom tab bar when leaving the screen
      navigation.setOptions({ tabBarStyle: undefined });
    };
  }, []);

  const handleSignOut = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await signOut();
              router.replace('/');
            } catch (error) {
              console.error('Error signing out:', error);
            }
          },
        },
      ]
    );
  };

  // Display loading text if user details are not yet loaded
  if (!userDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome, {userDetails.email}!
      </Text>
      <Button title="Sign Out" onPress={handleSignOut} color="#2196F3" />
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
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LandingScreen;
