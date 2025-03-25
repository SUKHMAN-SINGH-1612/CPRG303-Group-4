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
    navigation.setOptions({ tabBarStyle: { display: 'none' } });

    const fetchUserDetails = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else if (!data.user) {
        router.replace('/');
      } else {
        setUserDetails(data.user);
      }
    };

    fetchUserDetails();

    return () => {
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

  if (!userDetails) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome, {userDetails.email}!
      </Text>
      <Button title="Sign Out" onPress={handleSignOut} color="#FF5252" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
});

export default LandingScreen;
