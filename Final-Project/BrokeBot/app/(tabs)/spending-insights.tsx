// Final Project/brokebot/app/(tabs)/spending-insights.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomNavBar from '../../components/BottomNavBar';

const transactions = [
  { id: '1', category: 'Food', amount: 45.00, date: 'Today' },
  { id: '2', category: 'Shopping', amount: 280.00, date: 'Today' },
  { id: '3', category: 'Entertainment', amount: 57.00, date: 'Yesterday' },
  { id: '4', category: 'Travel', amount: 230.00, date: 'Yesterday' },
];

export default function SpendingInsights() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.username}>John Wilson</Text>
      </View>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$480.00</Text>
        <View style={styles.balanceDetails}>
          <Text style={styles.income}>Income: 2800.00</Text>
          <Text style={styles.expenses}>Expenses: 700.00</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Transactions</Text>
      <TouchableOpacity>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
      <ScrollView>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionContainer}>
            <View style={styles.icon} />
            <View style={styles.details}>
              <Text style={styles.category}>{transaction.category}</Text>
              <Text style={styles.date}>{transaction.date}</Text>
            </View>
            <Text style={styles.amount}>-${transaction.amount.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
            <BottomNavBar />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 16,
    color: '#000000',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  balanceCard: {
    backgroundColor: '#6B48FF',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceTitle: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 10,
  },
  balanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  income: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  expenses: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 10,
  },
  viewAll: {
    fontSize: 14,
    color: '#6B48FF',
    textAlign: 'right',
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF9C4',
    marginVertical: 5,
    borderRadius: 8,
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: '#FFD700',
    borderRadius: 15,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  date: {
    fontSize: 12,
    color: '#000000',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});