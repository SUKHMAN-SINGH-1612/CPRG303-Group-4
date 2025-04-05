import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../../components/BottomNavBar';
import supabase from '../../lib/supabase'; // Ensure you have a Supabase client setup

export default function Menu() {
  const router = useRouter();
  const [user, setUser] = useState({ name: '', uuid: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: session, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('Error fetching session:', sessionError);
          return;
        }

        if (session?.session?.user) {
          console.log('Session user ID:', session.session.user.id); // Debugging log
          const { data, error } = await supabase
            .from('users')
            .select('name, id')
            .eq('id', session.session.user.id)
            .single();

          if (error) {
            console.error('Error fetching user data:', error);
          } else if (data) {
            console.log('Fetched user data:', data); // Debugging log
            setUser({ name: data.name || 'Unknown', uuid: data.id });
          } else {
            console.warn('No user data found for the given ID.');
          }
        } else {
          console.warn('No user session found.');
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Ionicons name="person-circle-outline" size={60} color="black" />
        <Text style={styles.username}>{user.name || 'Username'}</Text>
        <Text style={styles.userId}>id: {user.uuid || '76865'}</Text>
      </View>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/add-transaction')}>
        <Ionicons name="add-circle-outline" size={20} color="black" style={styles.icon} />
        <View>
          <Text style={styles.menuText}>Add Transaction</Text>
          <Text style={styles.menuSubText}>Add a credit or debit transaction</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/manage-budget')}>
        <Ionicons name="calculator-outline" size={20} color="black" style={styles.icon} />
        <View>
          <Text style={styles.menuText}>Budget</Text>
          <Text style={styles.menuSubText}>Add a credit or debit transaction</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/history')}>
        <Ionicons name="time-outline" size={20} color="black" style={styles.icon} />
        <View>
          <Text style={styles.menuText}>History</Text>
          <Text style={styles.menuSubText}>Add a credit or debit transaction</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/spending-insights')}>
        <Ionicons name="bar-chart-outline" size={20} color="black" style={styles.icon} />
        <View>
          <Text style={styles.menuText}>Spending Insights</Text>
          <Text style={styles.menuSubText}>Add a credit or debit transaction</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name="settings-outline" size={20} color="black" style={styles.icon} />
        <View>
          <Text style={styles.menuText}>App Preferences</Text>
          <Text style={styles.menuSubText}>Add a credit or debit transaction</Text>
        </View>
      </TouchableOpacity>
            <BottomNavBar />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerCard: {
    backgroundColor: 'white',
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
    color: 'gray',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
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
    color: '#000',
  },
  menuSubText: {
    fontSize: 12,
    color: 'gray',
  },
});
