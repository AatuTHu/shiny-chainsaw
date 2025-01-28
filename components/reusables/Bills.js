import { View, Text, TextInput, TouchableOpacity,FlatList } from 'react-native'
import React,{useState} from 'react'
import styles from '../../styles/startPage'
import { handleChangeItem, handleRemoveFromList } from '../../services/Utilities';

export default function Bills({bills, setBills}) {

    const [tempObject, setTempObject] = useState({name: "", amount: 0})

    //Create a new item to the list of bills
    const handleAddBill = () => {
        setBills((prevBills) => {
          const updatedBills = [
            ...prevBills,
            { name: tempObject.name, amount: tempObject.amount}
          ];
          return updatedBills;
        });
        setTempObject({name: "", amount: ""})
      };
      
  return (
    <>
      <Text style={styles.label}>Recurring Bills:</Text>
      <View style={styles.billsContainer}>
        <TextInput
          style={styles.billsInput}
          placeholder="Bill name"
          placeholderTextColor="#888"
          value={tempObject.name}
          onChangeText={(text) => handleChangeItem(setTempObject,"name",text)}
        />

        <TextInput
          style={styles.billsInput}
          placeholder="Bill amount"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={tempObject.amount}
          onChangeText={(text) => handleChangeItem(setTempObject,"amount",text)}
        />

    </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddBill}
      >
        <Text style={styles.addButtonText}>Add Bill</Text>
      </TouchableOpacity>

      <View style={styles.billListContainer}>
        <FlatList
          data={bills}
          renderItem={({ item, index }) => (
          <View style={styles.billsHolder}>
            <Text key={index} style={styles.billItem}>
              {item.name}: ${item.amount} ({item.frqType})
            </Text>
            <TouchableOpacity onPress={()=>handleRemoveFromList(setBills,index)}>
              <Text style={styles.removeBill}>Remove</Text>
            </TouchableOpacity>
          </View>
          )}
        />
      </View>
    </>
  )
}