// Final Project/brokebot/app/(tabs)/manage-budget.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import supabase from '../../lib/supabase';

export default function ManageBudget() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Manage Budget</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>March 2025</Text>
      </View>
      <Text style={styles.sectionTitle}>Income</Text>
      <TextInput style={styles.input} placeholder="Salary" keyboardType="numeric" />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add category</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Housing</Text>
      <ScrollView>
        {budgets.slice(1).map((budget, index) => (
          <View key={index} style={styles.budgetContainer}>
            <View style={styles.icon} />
            <Text style={styles.category}>{budget.category}</Text>
            <Text style={styles.amount}>${budget.amount.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
      <BottomNavBar />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  category: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});