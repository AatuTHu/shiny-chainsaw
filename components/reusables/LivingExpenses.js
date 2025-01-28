import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles/startPage';
import { handleChangeItem, handleRemoveFromList } from '../../services/Utilities';

export default function LivingExpenses({expenses, setExpenses, bills, setBills}) {
  const [visible, setVisible ] = useState(null);
  const [visible2, setVisible2] = useState(null); // for bills
  const [tempObject, setTempObject] = useState({ name: '', amount: 0 });

  const expenseOptions = [
    { name: 'Housing', emoji: '🏠' },
    { name: 'Groceries', emoji: '🛒' },
    { name: 'Transportation', emoji: '🚃' },
    { name: 'Other', emoji: '💡' },
  ];

  const billOptions = [ 
    { name: 'Electiricty', emoji: '⚡' },
    { name: 'Water', emoji: '💧' },
    { name: 'Gas or Heating', emoji: '🔥' },
    { name: 'Internet', emoji: '📡' },
    { name: 'Phone', emoji: '📱' },
    { name: 'Health Insurance', emoji: '❤️' },
    { name: 'Other', emoji: '💡' },
  ];
    
  const handleAddExpense = () => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [
       ...prevExpenses,
        { name: tempObject.name, amount: tempObject.amount }
      ];
      return updatedExpenses;
    });
    setVisible(null);
    setTempObject({ name: '', amount: '' });
  };

  const handleAddBill = () => {
    setBills((prevBills) => {
      const updatedBills = [
       ...prevBills,
        { name: tempObject.name, amount: tempObject.amount }
      ];
      return updatedBills;
    });
    setVisible2(null);
    setTempObject({ name: '', amount: '' });
  };

  const handleOnExpensePress = (name, index) => {
    if(visible === index) {
      setVisible(null);
      return;
    }
    handleChangeItem(setTempObject,"name", name);
    setVisible(index);
  };

  const handleOnBillPress = (name, index) => {
    if(visible2 === index) {
      setVisible2(null);
      return;
    }
    handleChangeItem(setTempObject,"name", name);
    setVisible2(index);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 40}}>
      <Text style={styles.label}>Monthly Living Expenses:</Text>
        {expenseOptions.map((expense, index) => {
          return (
            <View key={index} style={styles.dDownContainer}>
              <TouchableOpacity
                style={styles.dDownItem}
                onPress={() => handleOnExpensePress(expense.name, index)}
              >
                <Text style={styles.dDownText}>
                  {expense.emoji} {expense.name}
                </Text>
              </TouchableOpacity>

              {visible === index && (
                <View style={styles.expandedContainer}>
                  {expense.name === 'Other' ? (
                    <>
                    <Text style={styles.label}>Expense Name:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder='Enter name'
                      placeholderTextColor='#888'
                      value={tempObject.name}
                      onChangeText={(text) => handleChangeItem(setTempObject, 'name', text)}
                       />
                    </>
                  ): null}

                  <Text style={styles.label}>Amount:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder='Enter amount'
                    placeholderTextColor='#888'
                    keyboardType='numeric'
                    value={tempObject.amount}
                    onChangeText={(text) => handleChangeItem(setTempObject, 'amount', text)}
                  />
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddExpense}
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )
        })}
        <Text style={styles.label}>Monthly Bills:</Text>
        {billOptions.map((bill, index) => {
          return (
            <View key={index} style={styles.dDownContainer}>
              <TouchableOpacity
                style={styles.dDownItem}
                onPress={() => handleOnBillPress(bill.name, index)}
              >
                <Text style={styles.dDownText}>
                  {bill.emoji} {bill.name}
                </Text>
              </TouchableOpacity>

              {visible2 === index && (
                <View style={styles.expandedContainer}>
                  {bill.name === 'Other' ? (
                    <>
                    <Text style={styles.label}>Bill Name:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder='Enter name'
                      placeholderTextColor='#888'
                      value={tempObject.name}
                      onChangeText={(text) => handleChangeItem(setTempObject, 'name', text)}
                       />
                    </>
                  ): null}

                  <Text style={styles.label}>Amount:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder='Enter amount'
                    placeholderTextColor='#888'
                    keyboardType='numeric'
                    value={tempObject.amount}
                    onChangeText={(text) => handleChangeItem(setTempObject, 'amount', text)}
                  />
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddBill}
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )
        })}

          <Text style={styles.label}>Saved expenses:</Text>
          {expenses.map((item, index) => (
            <View key={index} style={styles.savedItemContainer}>
              <Text key={index} style={styles.savedItemText}>
                {item.name}: ${item.amount}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveFromList(setExpenses, index)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}

          {bills.map((item, index) => (
            <View key={index} style={styles.savedItemContainer}>
              <Text key={index} style={styles.savedItemText}>
                {item.name}: ${item.amount}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveFromList(setBills, index)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
    </ScrollView>
  )
}