import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import supabase from '../../lib/supabase';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../constants/Colors';

export default function AddTransaction() {
  const router = useRouter();
  const { theme } = useTheme(); // Use theme context
  const colors = Colors[theme]; // Get colors for the current theme

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
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
        // Reset fields before navigating
        setAmount('');
        setCategory(''); // Reset category picker
        setDescription('');
        setDate(new Date()); // Reset date to current date

        // --- Debugging --- 
        console.log('Save successful, attempting to navigate back. User ID:', userId);
        // Try explicit navigation first
        // router.back(); 
        router.push('/(tabs)/menu'); // Explicitly go to menu page for testing
        // --- End Debugging ---
      }
    } catch (err: any) {
      console.error('Unexpected error saving transaction:', err);
      Alert.alert('Error', 'An unexpected error occurred: ' + err.message);
    }
  };

  // Define base styles (closer to original, removing specific theme colors)
  const baseStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      marginBottom: 30,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    input: { // Style for TextInput and Picker wrapper
      width: '100%',
      padding: 15,
      borderWidth: 1,
      borderRadius: 8,
      marginVertical: 10,
      fontSize: 16,
    },
     pickerStyle: { // Specific style for Picker component if needed (often limited)
      // height: 50, // Example height
      // width: '100%',
    },
    datePickerTrigger: { // Style for the date TouchableOpacity
      width: '100%',
      padding: 15,
      borderWidth: 1,
      borderRadius: 8,
      marginVertical: 10,
      justifyContent: 'center', // Center text vertically
    },
    dateText: {
        fontSize: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    button: {
      padding: 15,
      borderRadius: 8,
      width: '48%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF', // Keep button text white for contrast
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  // Define theme-specific styles
  const themedStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    title: {
      color: colors.text,
    },
    input: {
      backgroundColor: theme === 'light' ? '#FFFFFF' : '#333333',
      borderColor: theme === 'light' ? '#D3D3D3' : '#555555',
      color: colors.text,
    },
    placeholderText: {
      color: theme === 'light' ? '#555' : '#bbb',
    },
    picker: {
        color: colors.text, // Text color inside picker
    },
    dateText: {
        color: colors.text,
    },
    cancelButton: {
      backgroundColor: theme === 'light' ? '#D3D3D3' : '#555555',
    },
    saveButton: {
      backgroundColor: colors.tint, // Use theme tint color for save
    },
    // Style for DateTimePicker modal (might vary by platform)
    dateTimePicker: {
        // backgroundColor: colors.background, // Example
    }
  });

  return (
    // Apply themed container style
    <View style={[baseStyles.container, themedStyles.container]}>
      <View style={baseStyles.header}>
        {/* Apply themed title style */}
        <Text style={[baseStyles.title, themedStyles.title]}>Add Transaction</Text>
      </View>

      {/* Amount Input - Restore original structure, apply themed styles */}
      <TextInput
        style={[baseStyles.input, themedStyles.input]}
        placeholder="Amount"
        placeholderTextColor={themedStyles.placeholderText.color}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Category Picker - Restore original structure, apply themed styles */}
      {/* Picker needs to be wrapped for consistent styling */}
      <View style={[baseStyles.input, themedStyles.input, { padding: 0 }]}> {/* Apply input styles to wrapper, remove padding */}
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={[baseStyles.pickerStyle, themedStyles.picker]} // Apply base and themed picker styles
            dropdownIconColor={colors.text}
          >
            <Picker.Item label="Select Category" value="" color={themedStyles.placeholderText.color} />
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.name} value={cat.name} color={colors.text}/>
            ))}
          </Picker>
      </View>

      {/* Description Input - Restore original structure, apply themed styles */}
      <TextInput
        style={[baseStyles.input, themedStyles.input]}
        placeholder="Description"
        placeholderTextColor={themedStyles.placeholderText.color}
        value={description}
        onChangeText={setDescription}
      />

      {/* Date Picker Trigger - Restore original structure, apply themed styles */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={[baseStyles.datePickerTrigger, themedStyles.input]} // Use specific trigger style + themed input bg/border
      >
         <Text style={[baseStyles.dateText, themedStyles.dateText]}>{formatDate(date)}</Text>
      </TouchableOpacity>

      {/* Date Time Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(Platform.OS === 'ios');
            setDate(currentDate);
          }}
          // Potentially apply theme styles here if supported
          // style={themedStyles.dateTimePicker}
        />
      )}

      {/* Buttons - Restore original structure, apply themed styles */}
      <View style={baseStyles.buttonContainer}>
        <TouchableOpacity style={[baseStyles.button, themedStyles.cancelButton]} onPress={() => router.back()}>
          <Text style={baseStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[baseStyles.button, themedStyles.saveButton]} onPress={handleSave}>
          <Text style={baseStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* BottomNavBar is removed, handled by Tabs layout */}
    </View>
  );
}