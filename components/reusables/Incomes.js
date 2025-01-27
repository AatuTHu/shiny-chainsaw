import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import styles from '../../styles/startPage';
import { handleChangeItem, handleRemoveFromList } from '../../services/Utilities';

export default function Incomes({ incomes, setIncomes, salary, setSalary }) {
  const [visible, setVisible] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [tempObject, setTempObject] = useState({ name: '', amount: 0, frqType: 'Monthly' });

  const incomeOptions = [
    { name: 'Salary', emoji: '💼' },
    { name: 'Freelance Work', emoji: '💻' },
    { name: 'Rental Income', emoji: '🏠' },
    { name: 'Side Business', emoji: '📊' },
    { name: 'Other', emoji: '💡' },
  ];

  const salaryFrequencyOptions = [
    { name: 'Weekly', emoji: '📅' },
    { name: 'Bi-Weekly', emoji: '🗓️' },
    { name: 'Monthly', emoji: '📆' },
    { name: 'Annually', emoji: '🗓️' },
  ];

  const handleAddIncome = () => {
    setIncomes((prevIncomes) => {
      const updatedIncomes = [
        ...prevIncomes,
        { name: tempObject.name, amount: tempObject.amount, frqType: tempObject.frqType },
      ];
      return updatedIncomes;
    });
    setVisible(null);
    setTempObject({ name: '', amount: '', frqType: 'Monthly' });
  };

  const handleOnIncomePress = (name, index) => {
    if (name === 'Salary') {
      setTempObject({ name: 'Salary', amount: salary.salary, frqType: salary.frqType });
    } else {
      handleChangeItem(setTempObject, 'name', name);
    }
    setVisible(index);
  };

  const handleSaveSalary = () => {
    setSalary({
      salary: tempObject.amount,
      frqType: tempObject.frqType,
    });
    setIncomes((prevIncomes) => [
      ...prevIncomes,
      { name: 'Salary', amount: tempObject.amount, frqType: tempObject.frqType },
    ]);
    setVisible(null);
  };

  const toggleFrequencyDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 40}}>
      <Text style={styles.label}>Income</Text>
        {incomeOptions.map((income, index) => {
          const existingIncome = incomes.find((item) => item.name === income.name);
          
          return (
            <View key={index} style={localStyles.incomeContainer}>
              <TouchableOpacity
                style={localStyles.incomeItem}
                onPress={() => handleOnIncomePress(income.name, index)}
              >
                <Text style={localStyles.incomeText}>
                  {income.emoji} {income.name}
                </Text>
              </TouchableOpacity>

              {visible === index && (
                <View style={localStyles.expandedContainer}>
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

                  <Text style={styles.label}>Frequency:</Text>
                  <TouchableOpacity
                    style={localStyles.dropdownButton}
                    onPress={toggleFrequencyDropdown}
                  >
                    <Text style={localStyles.dropdownText}>
                      {tempObject.frqType || 'Select Frequency'}
                    </Text>
                  </TouchableOpacity>

                  {dropdownVisible && (
                    <View style={localStyles.dropdownContainer}>
                      {salaryFrequencyOptions.map((option, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={localStyles.dropdownItem}
                          onPress={() => {
                            handleChangeItem(setTempObject, 'frqType', option.name);
                            setDropdownVisible(false);
                          }}
                        >
                          <Text style={localStyles.dropdownItemText}>
                            {option.emoji} {option.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={income.name === 'Salary' ? handleSaveSalary : handleAddIncome}
                  >
                    <Text style={styles.addButtonText}>{income.name === 'Salary' ? 'Save Salary' : 'Add Income'}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}

        <View style={styles.savedIncomesContainer}>
          <Text style={styles.label}>Saved Incomes:</Text>
          {incomes.map((item, index) => (
            <View key={index} style={localStyles.savedItemContainer}>
              <Text style={localStyles.savedItemText}>
                {item.name}: ${item.amount} {item.frqType && `(${item.frqType})`}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveFromList(setIncomes, index)}>
                <Text style={localStyles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  incomeContainer: {
    marginBottom: 20,
  },
  incomeItem: {
    backgroundColor: '#1E1E1E',
    width: 300,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  incomeText: {
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
  dropdownButton: {
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dropdownContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  savedIncomesContainer: {
    marginTop: 20,
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
