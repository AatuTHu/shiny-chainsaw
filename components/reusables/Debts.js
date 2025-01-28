import { View, Text,TextInput,TouchableOpacity,FlatList } from 'react-native'
import React,{useState} from 'react'
import styles from '../../styles/startPage'
import { handleChangeItem, handleRemoveFromList } from '../../services/Utilities';

export default function Debts({debts, setDebts}) {

    const [tempObject, setTempObject] = useState({name: "", amount: 0,payment:""})

    //Create a new item to the list of Debts
    const handleAddDebt = () => {
        setDebts((prevDebts) => {
            const updatedDebts = [
            ...prevDebts,
            { name: tempObject.name, amount: tempObject.amount, payment: tempObject.payment }
            ];
            return updatedDebts;
        });
        setTempObject({name: "", amount: "",payment: ""});
    };

  return (
    <>
      <Text style={styles.label}>Debt:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={tempObject.name}
        onChangeText={(text) => handleChangeItem(setTempObject,'name',text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Total"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={tempObject.amount}
        onChangeText={(text) => handleChangeItem(setTempObject,'amount',text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Repayment amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={tempObject.payment}
        onChangeText={(text) => handleChangeItem(setTempObject,'payment',text)}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddDebt}
      >
        <Text style={styles.addButtonText}>Add Debt</Text>
      </TouchableOpacity>

      <View style={styles.billListContainer}>
      <FlatList
        data={debts}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.billsHolder}>
            <Text style={styles.billItem}>
              {item.name}: ${item.amount} ({item.frqType})
            </Text>
            <TouchableOpacity onPress={()=>handleRemoveFromList(setDebts,index)}>
              <Text style={styles.removeBill}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      </View>
    </>
  )
}