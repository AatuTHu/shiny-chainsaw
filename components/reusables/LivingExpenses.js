import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles/startPage';
import { handleChangeItem, handleRemoveFromList, handleOnDropDownPress,handleAddToList } from '../../services/Utilities';

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

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 40}}>
      <Text style={styles.label}>Monthly Living Expenses:</Text>
        {expenseOptions.map((expense, index) => {
          return (
            <View key={index} style={styles.dDownContainer}>
              <TouchableOpacity
                style={[styles.dDownItem, { borderColor: '#de8b4b'}]}
                onPress={() => handleOnDropDownPress(setTempObject,setVisible,visible,expense.name, index)}
              >
                <Text style={styles.dDownText}>
                  {expense.emoji} {expense.name}
                </Text>
              </TouchableOpacity>

              {visible === index && (
                <View style={[styles.expandedContainer, { borderColor: '#de8b4b'}]}>
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
                    onPress={() => handleAddToList(setExpenses,setVisible,setTempObject,tempObject)}
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
                style={[styles.dDownItem, { borderColor: '#de8b4b'}]}
                onPress={() => handleOnDropDownPress(setTempObject,setVisible2,visible2,bill.name, index)}
              >
                <Text style={styles.dDownText}>
                  {bill.emoji} {bill.name}
                </Text>
              </TouchableOpacity>

              {visible2 === index && (
                <View style={[styles.expandedContainer, { borderColor: '#de8b4b'}]}>
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
                    onPress={()=> handleAddToList(setBills,setVisible2,setTempObject,tempObject)}
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