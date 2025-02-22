import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles/startPage';
import { handleAddToList, handleChangeItem, handleOnDropDownPress, handleRemoveFromList } from '../../services/Utilities';

export default function Incomes({ incomes, setIncomes, salary, setSalary, balance, setBalance }) {
  const [visible, setVisible] = useState(null);
  const [tempObject, setTempObject] = useState({ name: '', amount: 0});

  const incomeOptions = [
    { name: 'Salary', emoji: '💼' },
    { name: 'Freelance Work', emoji: '💻' },
    { name: 'Rental Income', emoji: '🏠' },
    { name: 'Side Business', emoji: '📊' },
    { name: 'Other', emoji: '💡' },
  ];

    // Toggle dropdown for balance
    const handleBalanceDropdown = () => {
      setVisible(visible === 'balance' ? null : 'balance');
    };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 40}}>
      {/* Current Balance */}
      <Text style={styles.label}>Current Balance</Text>
      <View style={styles.dDownContainer}>
        <TouchableOpacity
          style={[styles.dDownItem, { borderColor: '#82d986'}]}
          onPress={handleBalanceDropdown}
        >
          <Text style={styles.dDownText}>
            💰 Current Balance: {balance}€
          </Text>
        </TouchableOpacity>

        {visible === 'balance' && (
          <View style={[styles.expandedContainer, { borderColor: '#82d986'}]}>
            <Text style={styles.label}>Enter your current balance:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={tempObject.amount.toString()}
              onChangeText={(text) => handleChangeItem(setTempObject, 'amount', text)}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setBalance(tempObject.amount);
                setVisible(null);
              }}
            >
              <Text style={styles.addButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Incomes */}
      <Text style={styles.label}>Enter your monthly income</Text>
        {incomeOptions.map((income, index) => {        
          return (
            <View key={index} style={styles.dDownContainer}>
              <TouchableOpacity
                style={[styles.dDownItem, { borderColor: '#82d986'}]}
                onPress={() => handleOnDropDownPress(setTempObject, setVisible, visible, income.name, index)}
              >
                <Text style={styles.dDownText}>
                  {income.emoji} {income.name}
                </Text>
              </TouchableOpacity>

              {visible === index && (
                <View style={[styles.expandedContainer, { borderColor: '#82d986'}]}>
                  {income.name === 'Other' ? (
                    <>
                      <Text style={styles.label}>Income Source:</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter name"
                        placeholderTextColor="#888"
                        value={tempObject.name}
                        onChangeText={(text) => handleChangeItem(setTempObject, 'name', text)}
                      />
                    </>
                  ) : null}

                  <Text style={styles.label}>Amount:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    value={tempObject.amount}
                    onChangeText={(text) => handleChangeItem(setTempObject, 'amount', text)}
                  />

                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={ () => income.name === 'Salary' ? setSalary(tempObject.amount) : handleAddToList(setIncomes,setVisible,setTempObject,tempObject)}
                  >
                    <Text style={styles.addButtonText}>{income.name === 'Salary' ? 'Save Salary' : 'Add Income'}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}

          <Text style={styles.label}>Saved Incomes:</Text>
          {salary > 0 && (
            <View style={styles.savedItemContainer}>
              <Text style={styles.savedItemText}>
                Salary: {salary}€
              </Text>
              <TouchableOpacity onPress={() => setSalary("")}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          {incomes.map((item, index) => (
            <View key={index} style={styles.savedItemContainer}>
              <Text style={styles.savedItemText}>
                {item.name}: {item.amount}€
              </Text>
              <TouchableOpacity onPress={() => handleRemoveFromList(setIncomes, index)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
    </ScrollView>
  );
}