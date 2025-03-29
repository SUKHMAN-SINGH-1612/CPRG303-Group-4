// Final Project/brokebot/app/(tabs)/manage-budget.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import BottomNavBar from '../../components/BottomNavBar';

const budgets = [
  { category: 'Salary', amount: 5000 },
  { category: 'Rent', amount: 1500 },
  { category: 'Insurance', amount: 200 },
  { category: 'Meat', amount: 300 },
  { category: 'Groceries', amount: 400 },
];

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
    flex: 1,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 10,
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
  addButton: {
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    marginVertical: 10,
  },
  addButtonText: {
    fontSize: 16,
    color: '#000000',
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F5F5F5',
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