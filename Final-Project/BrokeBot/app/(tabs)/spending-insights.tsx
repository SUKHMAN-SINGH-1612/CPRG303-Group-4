// Final Project/brokebot/app/(tabs)/spending-insights.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      } else {
        console.error('No authenticated user found');
        setLoading(false); // Stop loading if no user
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        // Ensure loading is true at the start of data fetching
        setLoading(true); 

        // Fetch user name
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('name')
          .eq('id', userId)
          .single();

        if (userError && userError.code !== 'PGRST116') { // Ignore "No rows found" error
          console.error('Error fetching username:', userError);
        } else {
          setUsername(userData?.name || 'User'); // Use default if name is null
        }

        // Fetch budget
        const { data: budgetData, error: budgetError } = await supabase
          .from('budgets')
          .select('total_funds')
          .eq('user_id', userId)
          // Consider ordering if multiple budgets per user possible
          // .order('created_at', { ascending: false })
          .limit(1)
          .single();

        const totalFunds = budgetData?.total_funds || 0;
        if (budgetError && budgetError.code !== 'PGRST116') { // Ignore error if no rows found
            console.error('Error fetching budget:', budgetError);
        }
        setIncome(totalFunds);

        // Fetch transactions
        const { data: transactionData, error: transactionError } = await supabase
          .from('transactions')
          .select('id, category, amount, date') // Ensure 'category' is selected if it exists in your table
          .eq('user_id', userId);

        if (transactionError) {
          console.error('Error fetching transactions:', transactionError);
          setTransactions([]); // Set to empty array on error
          setExpenses(0);
          setTotalBalance(totalFunds); // Balance is income if transactions fail to load
        } else {
          const validTransactions = transactionData || [];
          const totalExpenses = validTransactions.reduce(
            (sum, transaction) => sum + (transaction.amount || 0),
            0
          );
          setTransactions(validTransactions as Transaction[]);
          setExpenses(totalExpenses);
          setTotalBalance(totalFunds - totalExpenses);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        // Set sensible defaults on catch-all error
        setIncome(0);
        setExpenses(0);
        setTotalBalance(0);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

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

      <Text style={styles.sectionTitle}>Recent Transactions</Text> // Updated title
      {/* Consider linking this to the history page */}
      {/* <TouchableOpacity onPress={() => router.push('/(tabs)/history')}> 
         <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity> */}

      <ScrollView>
        {transactions.length > 0 ? (
            transactions.slice(0, 5).map((transaction) => ( // Show only recent (e.g., first 5)
              <View key={transaction.id} style={styles.transactionContainer}>
                <View style={styles.icon} />
                <View style={styles.details}>
                  <Text style={styles.category}>
                    {transaction.category || 'Uncategorized'}
                  </Text>
                  <Text style={styles.date}>{transaction.date || 'N/A'}</Text>
                </View>
                <Text style={styles.amount}>
                  {/* Assuming amount is always expense for this view? Add logic if needed */}
                  -${(transaction.amount || 0).toFixed(2)}
                </Text>
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
    backgroundColor: '#E3F2FD', // Light blue background for transactions
    marginVertical: 5,
    borderRadius: 8,
  },
  icon: {
    width: 30,
    height: 30,
    // Consider using an actual icon based on category later
    backgroundColor: '#64B5F6', // Example color
    borderRadius: 15,
    marginRight: 10,
    // Add basic icon styling or image source if needed
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
    color: '#D32F2F', // Red color for expenses
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