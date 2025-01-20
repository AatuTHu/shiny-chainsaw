import { View, Text,TextInput,TouchableOpacity,FlatList, Button } from 'react-native'
import React,{useState} from 'react'
import styles from '../../styles/startPage'
import ModalMenu from './ModalMenu'

export default function Debts({debts, setDebts}) {

    const [visible, setVisible] = useState(false);
    const [tempObject, setTempObject] = useState({name: "", amount: 0,payment:"", frqType: "Monthly", frqAmount: 30})

    const handleChangeDebt = (field,value) => {
        setTempObject(prev => ({
            ...prev,
            [field]: value,
        }));
    }

    const handleSelectFrq = (item) => {
        setTempObject(prev => ({
            ...prev,
            ["frqType"]: item.name,
            ["frqAmount"]: item.inNumber,
        }));
    }

    //Create a new item to the list of Debts
    const handleAddDebt = () => {
        setDebts((prevDebts) => {
            const updatedDebts = [
            ...prevDebts,
            { name: tempObject.name, amount: tempObject.amount, payment: tempObject.payment, frqType: tempObject.frqType, frqAmount: tempObject.frqAmount }
            ];
            return updatedDebts;
        });
        setTempObject({name: "", amount: 0, frq: "Monthly"})
        };

    const handleRemoveDebt = (index) => {
        setDebts((prevDebts) => prevDebts.filter((_, i) => i !== index));
    }

  return (
    <>
      <Text style={styles.label}>Debt:</Text>
      <TextInput
        style={styles.input}
        placeholder="Debt name"
        placeholderTextColor="#888"
        value={tempObject.name}
        onChangeText={(text) => handleChangeDebt('name',text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Debt amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={tempObject.amount}
        onChangeText={(text) => handleChangeDebt('amount',text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Debt repayment amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={tempObject.payment}
        onChangeText={(text) => handleChangeDebt('payment',text)}
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
        setSelectedValue={handleSelectFrq}
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
            <>
          <Text style={styles.billItem}>
            {item.name}: ${item.amount} ({item.frqType})
          </Text>
          <Button onPress={()=>handleRemoveDebt(index)} title="remove"/>
          </>
        )}
      />
      </View>
    </>
  )
}