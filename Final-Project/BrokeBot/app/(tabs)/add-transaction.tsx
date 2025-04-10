import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import BottomNavBar from '../../components/BottomNavBar';
import { Picker } from '@react-native-picker/picker'; // Updated import
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'; // Added DateTimePicker import
import supabase from '../../lib/supabase';

export default function AddTransaction() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date()); // Initialize with current date object
  const [showDatePicker, setShowDatePicker] = useState(false); // State for date picker visibility
  const [userId, setUserId] = useState<string | null>(null);

  // Static list of predefined categories
  const categories = [
    { id: '1', name: 'Food & Dining' },
    { id: '2', name: 'Transportation' },
    { id: '3', name: 'Utilities' },
    { id: '4', name: 'Entertainment' },
    { id: '5', name: 'Healthcare' },
    { id: '6', name: 'Groceries' },
    { id: '7', name: 'Education' },
    { id: '8', name: 'Shopping' },
    { id: '9', name: 'Travel' },
    { id: '10', name: 'Miscellaneous' },
    { id: '11', name: 'Income' },
  ];

  // Fetch the user's UUID on component mount
  React.useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user ID:', error);
        Alert.alert('Error', 'Failed to fetch user information.');
      } else {
        setUserId(user?.id || null);
      }
    };

    fetchUserId();
  }, []);

  // Format date to YYYY-MM-DD string
  const formatDate = (rawDate: Date): string => {
    let d = new Date(rawDate);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  };

  const handleSave = async () => {
    const formattedDate = formatDate(date); // Format date before saving
    if (!amount || !category || !formattedDate) { // Use formattedDate for validation
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

    try {
      const { error } = await supabase.from('transactions').insert([
        {
          user_id: userId, // Use the fetched user ID
          amount: parseFloat(amount),
          category, // Save category as text
          description,
          date: formattedDate, // Save formatted date string
        },
      ]);

      if (error) {
        Alert.alert('Error', 'Failed to save transaction: ' + error.message);
      } else {
        Alert.alert('Success', 'Transaction saved successfully.');
        router.back();
      }
    } catch (err) {
      console.error('Unexpected error saving transaction:', err);
      Alert.alert('Error', 'An unexpected error occurred while saving the transaction.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Transaction</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor="#555"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.input}>
        <Picker.Item label="Select Category" value="" />
        {categories.map((cat) => (
          <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#555"
        value={description}
        onChangeText={setDescription}
      />

      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
         <Text style={styles.dateText}>{formatDate(date)}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(Platform.OS === 'ios'); // Keep visible on iOS until done
            setDate(currentDate);
          }}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#D3D3D3',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#6B48FF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Added style for date text
  dateText: {
      fontSize: 16,
      color: '#000', // Or your preferred color
  }
});