import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import styles from '../../styles/startPage';

export default function OtherExpenses({ expenses, setExpenses }) {
  const [expandedExpense, setExpandedExpense] = useState(null);
  const [amounts, setAmounts] = useState({});
  const [customExpenseName, setCustomExpenseName] = useState('');

  const expenseOptions = [
    { name: 'Hobbies', emoji: '🎨' },
    { name: 'Entertainment', emoji: '🎬' },
    { name: 'Coffee Shops', emoji: '☕' },
    { name: 'Dining Out', emoji: '🍽️' },
    { name: 'Shopping', emoji: '🛍️' },
    { name: 'Fitness & Gym', emoji: '🏋️‍♀️' },
    { name: 'Streaming Services', emoji: '📺' },
    { name: 'Nightlife', emoji: '🌃' },
    { name: 'Gifts', emoji: '🎁' },
    { name: 'Fashion', emoji: '👕' },
    { name: 'Tech', emoji: '📱' },
    { name: 'Cosmetics & Beauty', emoji: '💄' },
    { name: 'Pets', emoji: '🐶' },
    { name: 'Other', emoji: '💡' },
  ];

  const handleInputChange = (expense, value) => {
    setAmounts((prev) => ({ ...prev, [expense]: value }));

    const expenseAmount = amounts[expense];
    if (expenseAmount) {
      setExpenses((prev) => {
        const updatedExpenses = prev.filter((item) => item.name !== expense);
        return [
          ...updatedExpenses,
          {
            name: expense,
            expenseAmount: expenseAmount,
          },
        ];
      });
    }
  };

  const handleCustomExpenseNameChange = (value) => {
    setCustomExpenseName(value);
  };

  const handleExpenseSelection = (expenseName) => {
    if (expenseName === 'Other') {
      if (customExpenseName) {
        setExpandedExpense(expandedExpense === expenseName ? null : expenseName);
      } else {
        setExpandedExpense(expandedExpense === expenseName ? null : expenseName);
      }
    } else {
      setExpandedExpense(expandedExpense === expenseName ? null : expenseName);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 15 }}>
        <Text style={styles.label}>Other Expenses</Text>

        {expenseOptions.map((expense, index) => (
          <View key={index} style={localStyles.expenseContainer}>
            <TouchableOpacity
              style={localStyles.expenseItem}
              onPress={() => handleExpenseSelection(expense.name)}
            >
              <Text style={localStyles.expenseText}>
                {expense.emoji} {expense.name}
              </Text>
            </TouchableOpacity>

            {expandedExpense === expense.name && (
              <View style={localStyles.expandedContainer}>
                {expense.name === 'Other' ? (
                  <>
                    <Text style={styles.label}>Expense Name:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter name"
                      placeholderTextColor="#888"
                      value={customExpenseName}
                      onChangeText={handleCustomExpenseNameChange}
                    />
                  </>
                ) : null}

                <Text style={styles.label}>Amount spent:</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter amount`}
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  value={amounts[expense.name] || ''}
                  onChangeText={(text) => handleInputChange(expense.name === 'Other' ? customExpenseName : expense.name, text)}
                />
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  expenseContainer: {
    marginBottom: 20,
  },
  expenseItem: {
    backgroundColor: '#1E1E1E',
    width: 300,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expenseText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  expandedContainer: {
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
    width: 300,
  },
});
