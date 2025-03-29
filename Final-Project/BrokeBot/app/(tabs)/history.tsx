// Final Project/brokebot/app/(tabs)/history.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BottomNavBar from '../../components/BottomNavBar';


const transactions = [
  { id: '1', category: 'Housing', amount: 1500, date: 'March 2025' },
  { id: '2', category: 'Food', amount: 500, date: 'March 2025' },
  { id: '3', category: 'Lifestyle', amount: 400, date: 'March 2025' },
  { id: '4', category: 'Savings', amount: 500, date: 'March 2025' },
];

export default function History() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>March 2025</Text>
      </View>
      <View style={styles.chart}>
        <View style={styles.chartInner} />
        <Text style={styles.chartText}>$2400</Text>
        <Text style={styles.chartSubText}>total spend</Text>
      </View>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  dateContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    color: '#000000',
  },
  chart: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chartInner: {
    width: 100,
    height: 100,
    backgroundColor: '#00C4B4',
    borderRadius: 50,
  },
  chartText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
  },
  chartSubText: {
    fontSize: 14,
    color: '#000000',
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
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});