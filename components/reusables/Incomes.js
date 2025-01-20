import { View, Text, TextInput,TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import ModalMenu from './ModalMenu'
import styles from '../..//styles/startPage'

export default function Incomes({incomes,setIncomes,salary,setSalary}) {

    const [visible, setVisible] = useState(false);

    const handleAddIncome = () => {
        setIncomes([...incomes, { name: '', amount: ''}]);
      };
      
      const handleIncomeChange = (index, field, value) => {
        const updatedIncomes = incomes.map((income, i) =>
        i === index? {...income, [field]: value } : income);
        setIncomes(updatedIncomes);
      };
       
      const handleRemoveIncome = (index) => {
        const updatedIncomes = incomes.filter((_, i) => i!== index);
        setIncomes(updatedIncomes);
      }

      const handleSalary = (value) => {
        setSalary(prevSalary => ({
            ...prevSalary,
            ["salary"]: value,
          }));
      }

      const handleFrq = (item) => {
        console.log(item);
        setSalary(prevSalary => ({
            ...prevSalary,
            ["frqType"]: item.name,
            ["frqAmount"]: item.inNumber,
          }));
      }

  return (
    <>
      <Text style={styles.label}>Salary:</Text>
      <TextInput
        style={styles.input}
        placeholder="Salary amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={salary.salary}
        onChangeText={(text) => handleSalary(text)}
      />
      <Text style={styles.label}>How often is your salary paid?</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.dropdownText}>{salary.frqType}</Text>
      </TouchableOpacity>

      <ModalMenu
        visible={visible}
        setVisible={setVisible}
        selectedValue={salary.frqType}
        setSelectedValue={handleFrq}
        title="Select Salary Frequency" 
      />

      {/* Additional Incomes */}
      <Text style={styles.label}>Other Incomes:</Text>
      {incomes.map((income, index) => (
        <View key={index} style={styles.incomeRow}>
          <TextInput
            style={styles.input}
            placeholder="Income name"
            placeholderTextColor="#888"
            value={income.name}
            onChangeText={(text) => handleIncomeChange(index, 'name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Income amount"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={income.amount}
            onChangeText={(text) => handleIncomeChange(index, 'amount', text)}
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveIncome(index)}
          >
      <Text style={styles.removeButtonText}>Remove</Text>
    </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddIncome}
      >
        <Text style={styles.addButtonText}>Add Income</Text>
      </TouchableOpacity>
    </>
  )
}