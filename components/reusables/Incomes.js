import { View, Text, TextInput,TouchableOpacity, FlatList } from 'react-native'
import React, {useState} from 'react'
import ModalMenu from './ModalMenu'
import styles from '../..//styles/startPage'
import { handleChangeItem, handleRemoveFromList } from '../../services/Utilities';

export default function Incomes({incomes,setIncomes,salary,setSalary}) {

    const [visible, setVisible] = useState(false);
    const [tempObject, setTempObject] = useState({name: "", amount: 0})

    const handleAddIncome = () => {
        setIncomes((prevIncomes) => {
          const updatedIncomes = [
            ...prevIncomes,
            { name: tempObject.name, amount: tempObject.amount }
          ];
          return updatedIncomes;
        });
        setTempObject({name: "", amount: ""})
      };

  return (
    <>
      <Text style={styles.label}>Salary:</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={salary.salary}
        onChangeText={(text) => handleChangeItem(setSalary, "salary", text)}
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
        setSelectedValue={setSalary}
        title="Select Salary Frequency" 
      />

      {/* Additional Incomes */}
      <Text style={styles.label}>Other Incomes:</Text>    
        <View style={styles.incomeRow}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#888"
            value={tempObject.name}
            onChangeText={(text) => handleChangeItem(setTempObject,'name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={tempObject.amount}
            onChangeText={(text) => handleChangeItem(setTempObject,'amount', text)}
          />

          <FlatList
            data={incomes}
            renderItem={({ item, index }) => (<>
              <Text key={index} style={styles.billItem}>
                {item.name}: ${item.amount}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFromList(setIncomes,index)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
              </>
            )}
          />
        </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddIncome}
      >
        <Text style={styles.addButtonText}>Add Income</Text>
      </TouchableOpacity>
    </>
  )
}