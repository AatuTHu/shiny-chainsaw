import { View, Text, TextInput } from 'react-native'
import styles from '../../styles/startPage'
import React from 'react'
import { handleChangeItem } from '../../services/Utilities';

export default function LivingExpenses({expenses, setExpenses}) {
  return (
    <>
      <Text style={styles.label}>Monthly Living Expenses:</Text>
      <TextInput
        style={styles.input}
        placeholder={ expenses.housing > 0 ? `${expenses.housing}` : "Rent / Mortgage"}
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={expenses.housing}
        onChangeText={(text) => handleChangeItem(setExpenses,"housing", text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder={ expenses.groceries > 0 ? `${expenses.groceries}`: "Food and Groceries"}
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={expenses.groceries}
        onChangeText={(text) => handleChangeItem(setExpenses,"groceries",text)}
      />

      <TextInput
        style={styles.input}
        placeholder={expenses.transportation > 0 ? `${expenses.transportation}`: "Transportation"}
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={expenses.transportation}
        onChangeText={(text) => handleChangeItem(setExpenses,"transportation",text)}
      />
    </>
  )
}