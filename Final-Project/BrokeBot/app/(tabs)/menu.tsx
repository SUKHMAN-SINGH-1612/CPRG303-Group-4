import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../../components/BottomNavBar';


export default function Menu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Ionicons name="person-circle-outline" size={60} color="black" />
        <Text style={styles.username}>Username</Text>
        <Text style={styles.userId}>id: 76865</Text>
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
