import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import styles from '../../styles/startPage';
import { handleChangeItem, handleRemoveFromList } from '../../services/Utilities';
export default function OtherExpenses({otherExpenses,setOtherExpenses}) {
  const [visible, setVisible] = useState(null);
  const [tempObject, setTempObject] = useState({name:"",amount:0})

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

  const handleAddgoal = () => {
    setOtherExpenses((prevDebts) => {
        const updatedDebts = [
        ...prevDebts,
        { name: tempObject.name, amount: tempObject.amount }
        ];
        return updatedDebts;
    });
    setVisible(null)
    setTempObject({name: tempObject.name ,amount: ""});
  }

const handleOnGoalPress = (name, index) => {
  handleChangeItem(setTempObject,"name",name)
  setVisible(index);
}


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 40}}>
        <Text style={styles.label}>Other Expenses</Text>

        {expenseOptions.map((expense, index) => (
          <View key={index} style={localStyles.expenseContainer}>
            <TouchableOpacity
              style={localStyles.expenseItem}
              onPress={() => handleOnGoalPress(expense.name,index)}
            >
              <Text style={localStyles.expenseText}>
                {expense.emoji} {expense.name}
              </Text>
            </TouchableOpacity>

            {visible === index && (
              <View style={localStyles.expandedContainer}>
                {expense.name === 'Other' && (
                  <>
                    <Text style={styles.label}>Expense Name:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter name"
                      placeholderTextColor="#888"
                      value={tempObject.name}
                      onChangeText={(text)=>handleChangeItem(setTempObject,"name", text)}
                    />
                  </>
                )}

                <Text style={styles.label}>Amount spent:</Text>
                <TextInput
                  style={styles.input}s
                  placeholder={`Enter amount`}
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  value={tempObject.amount}
                  onChangeText={(text) => handleChangeItem(setTempObject,"amount",text)}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddgoal}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
          <Text style={styles.label}>Saved Expenses</Text>
          {otherExpenses.map((item, index) => (
            <View key={index} style={localStyles.savedItemContainer}>
              <Text style={localStyles.savedItemText}>
                {item.name}: ${item.amount}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveFromList(setOtherExpenses, index)}>
                <Text style={localStyles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
            
          ))}
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
  savedItemContainer: {
    backgroundColor: '#333',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  savedItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  removeText: {
    color: '#FF6347',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
