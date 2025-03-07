import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Ensure correct import
import { useRouter } from 'expo-router';
import CallAPI from './components/CallAPI';

const Index = () => {
  const router = useRouter();

  const [apiResult, setApiResult] = useState<string>('');
  const [monthValue, setMonthValue] = useState<string>(''); // State for month value
  const [dayValue, setDayValue] = useState<string>(''); // State for day value

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the app!</Text>
      <Picker
        selectedValue={monthValue}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setMonthValue(itemValue)} // Update to match documentation
      >
        <Picker.Item label="Select month" value="" />
        {Array.from({ length: 12 }, (_, i) => (
          <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
        ))}
      </Picker>
      <TextInput
        style={styles.textInput}
        placeholder="Enter day"
        value={dayValue}
        onChangeText={(text) => setDayValue(text)} // Add type annotation
        keyboardType="numeric"
        editable={!!monthValue} // Enable only if month is selected
      />
      <CallAPI monthValue={monthValue} dayValue={dayValue} setApiResult={setApiResult} />
      {apiResult && (
        <View style={styles.apiResultContainer}>
          <Text style={styles.apiResultText}>{apiResult}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '80%',
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  apiResultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  apiResultText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Index;