import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import supabase from '../../lib/supabase';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';

export default function Menu() {
  const router = useRouter();
  const { theme, isThemeLoading } = useTheme();
  const colors = Colors[theme];

  const [userInfo, setUserInfo] = useState<{ email: string | undefined; id: string | undefined }>({ email: undefined, id: undefined });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
          console.error('Error fetching user:', error);
          setUserInfo({ email: 'Error', id: 'Error' });
        } else if (user) {
          console.log('Fetched auth user:', user);
          setUserInfo({ email: user.email, id: user.id });
        } else {
          console.warn('No authenticated user found.');
          setUserInfo({ email: 'Not logged in', id: 'N/A' });
        }
      } catch (err) {
        console.error('Unexpected error fetching user data:', err);
        setUserInfo({ email: 'Error', id: 'Error' });
      } finally {
        setIsLoading(false);
      }
    };

    if (!isThemeLoading) {
      fetchUserData();
    }
  }, [isThemeLoading]);

  const baseStyles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    headerCard: {
      padding: 20,
      borderRadius: 15,
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    username: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 5,
    },
    userId: {
      fontSize: 14,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    icon: {
      marginRight: 10,
    },
    menuText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    menuSubText: {
      fontSize: 12,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

  const themedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    headerCard: {
      backgroundColor: theme === 'light' ? 'white' : '#2C2C2E',
    },
    username: {
      color: colors.text,
    },
    userId: {
      color: theme === 'light' ? 'gray' : '#A9A9A9',
    },
    menuItem: {
      backgroundColor: theme === 'light' ? 'white' : '#2C2C2E',
    },
    menuText: {
      color: colors.text,
    },
    menuSubText: {
      color: theme === 'light' ? 'gray' : '#A9A9A9',
    },
    icon: {
      color: colors.text,
    }
  });

  if (isThemeLoading || isLoading) {
    return (
      <View style={[baseStyles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  return (
    <View style={[baseStyles.container, themedStyles.container]}>
      <View style={[baseStyles.headerCard, themedStyles.headerCard]}>
        <Ionicons name="person-circle-outline" size={60} color={colors.text} />
        <Text style={[baseStyles.username, themedStyles.username]}>{userInfo.email || 'Loading...'}</Text>
        <Text style={[baseStyles.userId, themedStyles.userId]}>id: {userInfo.id || 'Loading...'}</Text>
      </View>
      
      <ScrollView>
        <TouchableOpacity style={[baseStyles.menuItem, themedStyles.menuItem]} onPress={() => router.push('/(tabs)/add-transaction')}>
          <Ionicons name="add-circle-outline" size={20} style={[baseStyles.icon, themedStyles.icon]} />
          <View>
            <Text style={[baseStyles.menuText, themedStyles.menuText]}>Add Transaction</Text>
            <Text style={[baseStyles.menuSubText, themedStyles.menuSubText]}>Add a credit or debit transaction</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={[baseStyles.menuItem, themedStyles.menuItem]} onPress={() => router.push('/(tabs)/manage-budget')}>
          <Ionicons name="calculator-outline" size={20} style={[baseStyles.icon, themedStyles.icon]} />
          <View>
            <Text style={[baseStyles.menuText, themedStyles.menuText]}>Budget</Text>
            <Text style={[baseStyles.menuSubText, themedStyles.menuSubText]}>Manage your spending categories</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={[baseStyles.menuItem, themedStyles.menuItem]} onPress={() => router.push('/(tabs)/history')}>
          <Ionicons name="time-outline" size={20} style={[baseStyles.icon, themedStyles.icon]} />
          <View>
            <Text style={[baseStyles.menuText, themedStyles.menuText]}>History</Text>
            <Text style={[baseStyles.menuSubText, themedStyles.menuSubText]}>View your transaction history</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={[baseStyles.menuItem, themedStyles.menuItem]} onPress={() => router.push('/(tabs)/spending-insights')}>
          <Ionicons name="bar-chart-outline" size={20} style={[baseStyles.icon, themedStyles.icon]} />
          <View>
            <Text style={[baseStyles.menuText, themedStyles.menuText]}>Spending Insights</Text>
            <Text style={[baseStyles.menuSubText, themedStyles.menuSubText]}>Analyze your spending patterns</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={[baseStyles.menuItem, themedStyles.menuItem]} onPress={() => router.push('/(tabs)/PreferencesPage')}>
          <Ionicons name="settings-outline" size={20} style={[baseStyles.icon, themedStyles.icon]} />
          <View>
            <Text style={[baseStyles.menuText, themedStyles.menuText]}>App Preferences</Text>
            <Text style={[baseStyles.menuSubText, themedStyles.menuSubText]}>Manage your app preferences</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
