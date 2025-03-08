import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import CallAPI from './components/CallAPI';

const Index = () => {
  const router = useRouter();

  const [apiResult, setApiResult] = useState<string>('');
  const [monthValue, setMonthValue] = useState<string>(''); // State for month selection
  const [dayValue, setDayValue] = useState<string>(''); // State for day input
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false); // Controls dropdown visibility
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState<boolean>(true); // Placeholder state

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={Keyboard.dismiss}>
      <Text style={styles.welcomeText}>Welcome to the app!</Text>

      {/* Day Input (Above) */}
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={isPlaceholderVisible ? 'Enter day' : ''}
          placeholderTextColor="#000"
          value={dayValue}
          onFocus={() => setIsPlaceholderVisible(false)} 
          onBlur={() => {
            setIsPlaceholderVisible(dayValue === '');
            Keyboard.dismiss(); 
          }}
          onChangeText={(text) => setDayValue(text)}
          keyboardType="numeric"
          returnKeyType="done"
          editable={true} 
        />
      </View>

      {/* Month Picker Dropdown Button */}
      <TouchableOpacity style={styles.pickerButton} onPress={() => setIsPickerVisible(true)}>
        <Text style={styles.pickerButtonText}>
          {monthValue ? `Selected Month: ${monthValue}` : 'Select a Month'}
        </Text>
      </TouchableOpacity>

      {/* Month Picker (Dropdown) */}
      {isPickerVisible && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={monthValue}
            onValueChange={(itemValue) => {
              setMonthValue(itemValue);
              setIsPickerVisible(false); // Hide dropdown after selection
            }}
            mode="dropdown"
          >
            <Picker.Item label="Select a month" value="" color="#000" />
            {Array.from({ length: 12 }, (_, i) => (
              <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} color="#000" />
            ))}
          </Picker>
        </View>
      )}

      {/* API Call */}
      <CallAPI monthValue={monthValue} dayValue={dayValue} setApiResult={setApiResult} />

      {apiResult && (
        <View style={styles.apiResultContainer}>
          <Text style={styles.apiResultText}>{apiResult}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#000', 
  },
  textInputContainer: {
    width: '80%',
    borderWidth: 2,
    borderColor: '#000', 
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textInput: {
    height: 50,
    width: '100%',
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000', 
    textAlign: 'center',
  },
  pickerButton: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000', 
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#000', 
  },
  pickerContainer: {
    width: '80%',
    borderWidth: 2,
    borderColor: '#000', 
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingVertical: 5,
    marginBottom: 20,
  },
  apiResultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  apiResultText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000', 
  },
});

export default Index;