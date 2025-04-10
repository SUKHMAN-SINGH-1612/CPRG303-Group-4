// Final Project/brokebot/app/(tabs)/spending-insights.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
// import BottomNavBar from '../../components/BottomNavBar'; // Remove: Handled by layout
import supabase from '../../lib/supabase';

interface Transaction {
  id: string;
  category: string | null;
  amount: number;
  date: string | null;
}

const SpendingInsights = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState('User'); // Default username
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      } else {
        console.error('No authenticated user found');
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

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        if (!userId) {
           setIncome(0);
           setExpenses(0);
           setTotalBalance(0);
           setTransactions([]);
           setUsername('User');
           if (!userId) setLoading(false); 
           return; 
        }

        setLoading(true);
        try {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('name')
            .eq('id', userId)
            .single();

          if (userError && userError.code !== 'PGRST116') {
            console.error('Error fetching username:', userError);
          } else {
            setUsername(userData?.name || 'User');
          }

          const { data: budgetData, error: budgetError } = await supabase
            .from('budgets')
            .select('total_funds')
            .eq('user_id', userId)
            .limit(1)
            .single();

          const totalFunds = budgetData?.total_funds || 0;
          if (budgetError && budgetError.code !== 'PGRST116') {
              console.error('Error fetching budget:', budgetError);
          }
          setIncome(totalFunds);

          const { data: transactionData, error: transactionError } = await supabase
            .from('transactions')
            .select('id, category, amount, date')
            .eq('user_id', userId)
            .order('date', { ascending: false });

          if (transactionError) {
            console.error('Error fetching transactions:', transactionError);
            setTransactions([]);
            setExpenses(0);
            setTotalBalance(totalFunds);
          } else {
            const validTransactions = transactionData || [];
            const incomeTransactions = validTransactions.filter(t => t.category === 'Income');
            const expenseTransactions = validTransactions.filter(t => t.category !== 'Income');
            const totalExpenses = expenseTransactions.reduce(
              (sum, transaction) => sum + (transaction.amount || 0),
              0
            );
            setTransactions(validTransactions as Transaction[]);
            setExpenses(totalExpenses);
            setTotalBalance(totalFunds - totalExpenses);
          }
        } catch (err) {
          console.error('Error fetching data:', err);
          setIncome(0);
          setExpenses(0);
          setTotalBalance(0);
          setTransactions([]);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();

      return () => {
      };
    }, [userId])
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}> 
        <ActivityIndicator size="large" color="#6B48FF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.username}>{username}</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>${totalBalance.toFixed(2)}</Text>
        <View style={styles.balanceDetails}>
          <Text style={styles.income}>Income: ${income.toFixed(2)}</Text>
          <Text style={styles.expenses}>Expenses: ${expenses.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      {/* Consider linking this to the history page */}
      {/* <TouchableOpacity onPress={() => router.push('/(tabs)/history')}> 
         <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity> */}

      <ScrollView>
        {transactions.length > 0 ? (
            transactions.slice(0, 5).map((transaction) => (
              <View key={transaction.id} style={styles.transactionContainer}>
                <View style={styles.icon} />
                <View style={styles.details}>
                  <Text style={styles.category}>
                    {transaction.category || 'Uncategorized'}
                  </Text>
                  <Text style={styles.date}>{transaction.date || 'N/A'}</Text>
                </View>
                {transaction.category === 'Income' ? (
                  <Text style={[styles.amount, styles.incomeAmount]}>
                    +${(transaction.amount || 0).toFixed(2)}
                  </Text>
                ) : (
                  <Text style={[styles.amount, styles.expenseAmount]}>
                    -${(transaction.amount || 0).toFixed(2)}
                  </Text>
                )}
              </View>
            ))
        ) : (
            <Text style={styles.noDataText}>No recent transactions found.</Text>
        )}
      </ScrollView>

      {/* BottomNavBar is handled by layout */}
    </View>
  );
};

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
    marginBottom: 10,
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E3F2FD',
    marginVertical: 5,
    borderRadius: 8,
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: '#64B5F6',
    borderRadius: 15,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  loadingText: {
    fontSize: 16,
    color: '#000000',
    marginTop: 10,
    textAlign: 'center',
  },
  noDataText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginTop: 30,
  },
});

export default SpendingInsights;