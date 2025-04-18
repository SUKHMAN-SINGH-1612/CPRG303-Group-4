import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import BottomNavBar from '../../components/BottomNavBar';
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
  const [username, setUsername] = useState('John Wilson');
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
 
      if (user) {
        setUserId(user.id);
      } else {
        console.error('No authenticated user found');
      }
    };
 
    fetchUser();
  }, []);
 
  useEffect(() => {
    if (!userId) return;
 
    const fetchUserData = async () => {
      try {
        setLoading(true);
 
        // Fetch user name
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('name')
          .eq('id', userId)
          .single();
 
        if (userError) {
          console.error('Error fetching username:', userError);
        } else {
          setUsername(userData?.name || 'John Wilson');
        }
 
        // Fetch budget
        const { data: budgetData, error: budgetError } = await supabase
          .from('budgets')
          .select('total_funds')
          .eq('user_id', userId)
          .single();
 
        const totalFunds = budgetData?.total_funds || 0;
        if (budgetError) {
          console.error('Error fetching budget:', budgetError);
        }
        setIncome(totalFunds);
 
        // Fetch transactions
        const { data: transactionData, error: transactionError } = await supabase
          .from('transactions')
          .select('id, category, amount, date')
          .eq('user_id', userId);
 
        if (transactionError) {
          console.error('Error fetching transactions:', transactionError);
        } else {
          const totalExpenses = transactionData.reduce(
            (sum, transaction) => sum + (transaction.amount || 0),
            0
          );
          setTransactions(transactionData as Transaction[]);
          setExpenses(totalExpenses);
          setTotalBalance(totalFunds - totalExpenses);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
 
    fetchUserData();
  }, [userId]);
 
  if (loading) {
    return (
      <View style={styles.container}>
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
 
      <Text style={styles.sectionTitle}>Transactions</Text>
      <TouchableOpacity>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
 
      <ScrollView>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionContainer}>
            <View style={styles.icon} />
            <View style={styles.details}>
              <Text style={styles.category}>
                {transaction.category || 'Uncategorized'}
              </Text>
              <Text style={styles.date}>{transaction.date || 'N/A'}</Text>
            </View>
            <Text style={styles.amount}>
              -${(transaction.amount || 0).toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
 
      
    </View>
  );
};
 
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
    marginBottom: 10,
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
  loadingText: {
    fontSize: 16,
    color: '#000000',
    marginTop: 10,
    textAlign: 'center',
  },
});
 
export default SpendingInsights;