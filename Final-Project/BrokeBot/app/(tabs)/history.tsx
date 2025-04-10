// Final Project/brokebot/app/(tabs)/history.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from 'expo-router';
import supabase from '../../lib/supabase';

interface Transaction {
    id: string;
    category: string | null;
    amount: number; // This will store the signed amount (+income, -expense)
    date: string | null;
    // Add other fields if needed
}

export default function History() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalSpend, setTotalSpend] = useState(0); // Represents net change for the month
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Effect to get the user ID - runs once or when auth state changes
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        console.error('No authenticated user found for history');
        setUserId(null);
        setLoading(false);
      }
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user;
      setUserId(currentUser?.id ?? null);
       if (!currentUser) {
          setLoading(false);
       }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // useFocusEffect to fetch transactions when screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchTransactions = async () => {
        if (!userId) {
            setTransactions([]);
            setTotalSpend(0);
            // Only set loading false if userId check is complete
            if (!userId) setLoading(false); 
            return; 
        }

        setLoading(true);
        try {
          const currentDate = new Date();
          const currentMonth = currentDate.toISOString().slice(0, 7); // Format: YYYY-MM
          const firstDayOfMonth = `${currentMonth}-01`;
          const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().slice(0, 10);

          const { data, error } = await supabase
            .from('transactions')
            .select('id, category, amount, date') // Select specific columns
            .eq('user_id', userId)
            .gte('date', firstDayOfMonth)
            .lte('date', lastDayOfMonth)
            .order('date', { ascending: false }); // Order by date descending

          if (error) {
            throw error;
          }

          // Process transactions: make expenses negative, keep income positive
          const processedTransactions = (data || []).map((transaction): Transaction => ({
            id: transaction.id,
            category: transaction.category,
            // Assuming amount stored in DB is always positive
            amount: transaction.category === 'Income' ? (transaction.amount || 0) : -(transaction.amount || 0),
            date: transaction.date,
          }));

          // Calculate total net change (Income - Expenses) for the month
          const total = processedTransactions.reduce((sum, t) => sum + t.amount, 0);

          setTransactions(processedTransactions);
          setTotalSpend(total); // This now represents net change
        } catch (error) {
          console.error('Error fetching transactions:', error);
          Alert.alert('Error', 'Failed to fetch transactions.');
          setTransactions([]); // Clear data on error
          setTotalSpend(0);
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
      
       return () => {
         // Optional cleanup
       };
    }, [userId]) // Dependency: userId
  );

  // Loading state display
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#00C4B4" />
        <Text style={styles.loadingText}>Loading History...</Text>
      </View>
    );
  }

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
        <Text style={styles.chartText}>
            {totalSpend >= 0 ? '+' : '-'}$ {Math.abs(totalSpend).toFixed(2)}
        </Text>
        <Text style={styles.chartSubText}>Monthly Net Change</Text>
      </View>
      <ScrollView>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionContainer}>
              <View style={styles.icon} />
              <View style={styles.details}>
                <Text style={styles.category}>{transaction.category || 'Uncategorized'}</Text>
                <Text style={styles.dateTextItem}>{transaction.date}</Text>
              </View>
              <Text style={[styles.amount, transaction.amount < 0 ? styles.expenseAmount : styles.incomeAmount]}>
                {transaction.amount >= 0 ? '+' : '-'}$ {Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No transactions found for this month.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
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
  dateTextItem: {
    fontSize: 12,
    color: '#666666',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseAmount: {
    color: '#D32F2F',
  },
  incomeAmount: {
    color: '#388E3C',
  },
  noDataText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 20,
  },
});