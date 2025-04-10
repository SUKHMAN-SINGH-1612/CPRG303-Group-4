// Final Project/brokebot/app/(tabs)/manage-budget.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import supabase from '../../lib/supabase';

export default function ManageBudget() {
  const [categories, setCategories] = useState<any[]>([]); // categories state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [allocatedAmounts, setAllocatedAmounts] = useState<{ [key: string]: number }>({});
  const [totalIncome, setTotalIncome] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [savedBudgetCategories, setSavedBudgetCategories] = useState<any[]>([]);
  const [incomeInput, setIncomeInput] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('id, name');
      if (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error', 'Failed to fetch categories.');
      } else {
        setCategories(data || []);
      }
    };

    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        Alert.alert('Error', 'Failed to fetch user.');
        return;
      }
      setUserId(user.id);
      await fetchTotalIncome(user.id);
    };

    const fetchTotalIncome = async (userId: string) => {
      const { data, error } = await supabase
        .from('budgets')
        .select('id, total_funds')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching income or budget:', error);
        return;
      }

      if (!data || data.length === 0) {
        setTotalIncome(null); // No income record found
      } else {
        setTotalIncome(data[0].total_funds); // Record found
      }
    };
    fetchUser();
    const handleIncomeSubmit = async () => {
      if (!incomeInput) {
        return; // Don't proceed if input is empty
      }

      const { error } = await supabase
        .from('budgets')
        .insert([{ user_id: userId, total_funds: parseFloat(incomeInput) }]);

      if (error) {
        console.error('Error saving income:', error);
      } else {
        setTotalIncome(parseFloat(incomeInput)); // Update the state with the new income
        setIncomeInput(''); // Clear input field
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSavedBudgetCategories = async () => {
      if (!userId) return;

      const { data: budget } = await supabase
        .from('budgets')
        .select('id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!budget) return;

      const { data, error } = await supabase
        .from('budget_categories')
        .select('category_id, amount_allocated, created_at')
        .eq('budget_id', budget.id);

      if (!error && data) {
        setSavedBudgetCategories(data || []);
        setSelectedCategories(data.map((item) => item.category_id.toString()));
        setAllocatedAmounts(
          data.reduce((acc: { [key: string]: number }, item) => {
            acc[item.category_id] = item.amount_allocated;
            return acc;
          }, {})
        );
      }
    };

    fetchSavedBudgetCategories();
  }, [userId]);
  // Ensure saved categories and amounts are fetched

  const handleIncomeUpdate = async () => {
    if (!incomeInput || !userId) {
      Alert.alert('Error', 'Please enter a valid income.');
      return;
    }

    const updatedIncome = parseFloat(incomeInput);
    if (isNaN(updatedIncome) || updatedIncome <= 0) {
      Alert.alert('Error', 'Income must be a positive number.');
      return;
    }

    const { data: budget, error: budgetError } = await supabase
      .from('budgets')
      .select('id')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (budgetError || !budget) {
      // If no budget exists, create a new one
      const { error: insertError } = await supabase
        .from('budgets')
        .insert([{ user_id: userId, total_funds: updatedIncome }]);

      if (insertError) {
        Alert.alert('Error', 'Failed to create new budget: ' + insertError.message);
      } else {
        setTotalIncome(updatedIncome);
        setIncomeInput('');
        Alert.alert('Success', 'New budget created successfully!');
      }
      return;
    }

    // Update the existing budget
    const { error } = await supabase
      .from('budgets')
      .update({ total_funds: updatedIncome })
      .eq('id', budget.id);

    if (error) {
      Alert.alert('Error', 'Failed to update income: ' + error.message);
    } else {
      setTotalIncome(updatedIncome);
      setIncomeInput('');
      Alert.alert('Success', 'Income updated successfully!');
    }
  };

  const handleCategorySelection = async (categoryId: string | number) => {
    if (selectedCategories.includes(categoryId.toString())) {
      return; // Do nothing if the category is already selected
    }

    if (!userId) return;

    const { data: budget } = await supabase
      .from('budgets')
      .select('id')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!budget) return;

    const { data: existingCategory } = await supabase
      .from('budget_categories')
      .select('id')
      .eq('budget_id', budget.id)
      .eq('category_id', categoryId)
      .single();

    if (existingCategory) {
      Alert.alert('Error', 'This category has already been added to the budget.');
      return;
    }

    setSelectedCategories((prev) => [...prev, categoryId.toString()]);
    // Do not reset dropdown or allocated amounts here
  };

  const handleAmountAllocation = (categoryId: string, amount: number) => {
    if (totalIncome === null) {
      Alert.alert('Error', 'Total income not set.');
      return;
    }

    const totalAllocated = Object.values(allocatedAmounts).reduce((acc, val) => acc + val, 0);
    if (totalAllocated + amount > totalIncome) {
      Alert.alert('Error', 'Allocated amount exceeds total income.');
      return;
    }

    setAllocatedAmounts((prev) => ({
      ...prev,
      [categoryId]: amount,
    }));
  };

  const handleSaveBudgetCategories = async () => {
    if (!userId || totalIncome === null) {
      Alert.alert('Error', 'User not logged in or income missing');
      return;
    }

    const { data: budget, error: budgetError } = await supabase
      .from('budgets')
      .select('id')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (budgetError || !budget) {
      Alert.alert('Error', 'No budget found for user');
      return;
    }

    const { data: existingCategories, error: existingCategoriesError } = await supabase
      .from('budget_categories')
      .select('category_id')
      .eq('budget_id', budget.id);

    if (existingCategoriesError) {
      Alert.alert('Error', 'Failed to fetch existing categories: ' + existingCategoriesError.message);
      return;
    }

    const existingCategoryIds = existingCategories.map((item) => item.category_id);

    const newCategories = selectedCategories.filter(
      (categoryId) => !existingCategoryIds.includes(categoryId)
    );

    if (newCategories.length === 0) {
      Alert.alert('No new categories to add.');
      return;
    }

    const budgetCategories = newCategories.map((categoryId) => ({
      budget_id: budget.id,
      category_id: categoryId,
      amount_allocated: allocatedAmounts[categoryId],
      created_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from('budget_categories').insert(budgetCategories);

    if (error) {
      Alert.alert('Error', 'Failed to save: ' + error.message);
    } else {
      Alert.alert('Success', 'Saved successfully!');
      setSavedBudgetCategories((prev) => [
        ...prev,
        ...newCategories.map((categoryId) => ({
          category_id: categoryId,
          amount_allocated: allocatedAmounts[categoryId],
          created_at: new Date().toISOString(),
        })),
      ]);

      // Reset dropdown and allocated amounts only after saving
      setSelectedCategoryId('');
      setAllocatedAmounts({});
      setSelectedCategories([]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Manage Budget</Text>
      <Text style={styles.totalIncome}> Income: ${totalIncome?.toFixed(2) || '0.00'}</Text>

      <Text style={styles.sectionTitle}>Edit Income</Text>
      <View style={styles.incomeContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter new income"
          value={incomeInput}
          onChangeText={setIncomeInput}
        />
        <TouchableOpacity style={styles.updateButton} onPress={handleIncomeUpdate}>
          <Text style={styles.updateButtonText}>Update Income</Text>
        </TouchableOpacity>
      </View>

      {/* Display saved budget categories immediately after data is fetched */}
      {savedBudgetCategories.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Saved Budget Categories</Text>
          {savedBudgetCategories.map((item, index) => {
            const cat = categories.find((c) => c.id === item.category_id);
            return (
              <View key={index} style={styles.savedItem}>
                <Text>{cat?.name || 'Unknown'}: ${item.amount_allocated}</Text>
              </View>
            );
          })}
        </>
      )}

      <Text style={styles.sectionTitle}>Add New Category</Text>
      <Picker
        selectedValue={selectedCategoryId}
        onValueChange={(itemValue) => {
          setSelectedCategoryId(itemValue);
          handleCategorySelection(itemValue);
        }}
        style={styles.picker}
      >
        <Picker.Item label="-- Select Category --" value="" />
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.name} value={category.id} />
        ))}
      </Picker>

      <Text style={styles.sectionTitle}>Allocate Amount</Text>
      {selectedCategoryId && (
        <View style={styles.allocationContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Amount"
            value={allocatedAmounts[selectedCategoryId]?.toString() || ''}
            onChangeText={(text) => handleAmountAllocation(selectedCategoryId, parseFloat(text))}
          />
        </View>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveBudgetCategories}>
        <Text style={styles.saveButtonText}>Save Budget Categories</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  totalIncome: {
    fontSize: 18,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  savedItem: {
    marginVertical: 8,
  },
  savedItemText: {
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#A560CA',
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  allocationContainer: {
    marginVertical: 15,
  },
  categoryLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 16,
  },
  incomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});