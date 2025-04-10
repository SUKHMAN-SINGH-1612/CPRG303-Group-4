// Final Project/brokebot/app/(tabs)/history.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import BottomNavBar from '../../components/BottomNavBar';
import supabase from '../../lib/supabase';

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          throw userError;
        }

        const userId = user?.id;
        if (!userId) {
          Alert.alert('Error', 'User not authenticated.');
          return;
        }

        const currentDate = new Date();
        const currentMonth = currentDate.toISOString().slice(0, 7); // Format: YYYY-MM
        const firstDayOfMonth = `${currentMonth}-01`;
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().slice(0, 10); // Last day of the month

        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', userId)
          .gte('date', firstDayOfMonth)
          .lte('date', lastDayOfMonth);

        if (error) {
          throw error;
        }

        const filteredTransactions = data.map((transaction) => ({
          ...transaction,
          amount: transaction.category === 'Income' ? transaction.amount : -transaction.amount,
        }));

        const total = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

        setTransactions(filteredTransactions);
        setTotalSpend(total);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        Alert.alert('Error', 'Failed to fetch transactions.');
      }
    };

    fetchTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</Text>
      </View>
      <View style={styles.chart}>
        <View style={styles.chartInner} />
        <Text style={styles.chartText}>${totalSpend.toFixed(2)}</Text>
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
            <Text style={styles.amount}>
              {transaction.amount < 0 ? '-' : ''}${Math.abs(transaction.amount).toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
      {transactions.length === 0 && (
        <Text style={styles.noDataText}>No transactions found.</Text>
      )}
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
  noDataText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 20,
  },
});