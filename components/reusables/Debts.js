import { View, Text,TextInput,TouchableOpacity,FlatList, Button } from 'react-native'
import React,{useState} from 'react'
import styles from '../../styles/startPage'
import ModalMenu from './ModalMenu'
import { handleChangeItem, handleRemoveFromList } from '../../services/Utilities';

export default function Debts({debts, setDebts}) {

    const [visible, setVisible] = useState(false);
    const [tempObject, setTempObject] = useState({name: "", amount: 0,payment:"", frqType: "Monthly", frqAmount: 30})

    //Create a new item to the list of Debts
    const handleAddDebt = () => {
        setDebts((prevDebts) => {
            const updatedDebts = [
            ...prevDebts,
            { name: tempObject.name, amount: tempObject.amount, payment: tempObject.payment, frqType: tempObject.frqType, frqAmount: tempObject.frqAmount }
            ];
            return updatedDebts;
        });
        setTempObject({name: "", amount: "",payment: "", frqType: "Monthly", frqAmount: 0});
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
        style={styles.dropdownButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.dropdownText}>{tempObject.frqType}</Text>
      </TouchableOpacity>

      <ModalMenu
        visible={visible}
        setVisible={setVisible}
        selectedValue={tempObject.frqType}
        setSelectedValue={setTempObject}
        title="Select Bill Frequency"
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
          <View style={styles.billsHolder}>
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