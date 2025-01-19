import { View, Text, TextInput, TouchableOpacity,FlatList,Button } from 'react-native'
import React,{useState} from 'react'
import styles from '../../styles/startPage'
import ModalMenu from './ModalMenu'

export default function Bills({bills, setBills}) {

    const [visible, setVisible] = useState(false);
    const [tempObject, setTempObject] = useState({name: "", amount: 0, frq: "Monthly"})

    const handleChangeBill = (field,value) => {
        setTempObject(prev => ({
            ...prev,
            [field]: value,
        }));
    }

    const handleSelectFrq = (frq) => {
        setTempObject(prev => ({
            ...prev,
            ["frq"]: frq,
        }));
    }

    //Create a new item to the list of bills
    const handleAddBill = () => {
        setBills((prevBills) => {
          const updatedBills = [
            ...prevBills,
            { name: tempObject.name, amount: tempObject.amount, frq: tempObject.frq }
          ];
          return updatedBills;
        });
        setTempObject({name: "", amount: 0, frq: "Monthly"})
      };

    const handleRemoveBill = (index) => {
        setBills((prevBills) => prevBills.filter((_, i) => i !== index));
    }

  return (
    <>
      <Text style={styles.label}>Recurring Bills:</Text>
      <TextInput
        style={styles.input}
        placeholder="Bill name"
        placeholderTextColor="#888"
        value={tempObject.name}
        onChangeText={(text) => handleChangeBill("name",text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Bill amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={tempObject.amount}
        onChangeText={(text) => handleChangeBill("amount",text)}
      />

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.dropdownText}>{tempObject.frq}</Text>
      </TouchableOpacity>

      <ModalMenu
        visible={visible}
        setVisible={setVisible}
        selectedValue={tempObject.frq}
        setSelectedValue={handleSelectFrq}
        title="Select Bill Frequency"
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddBill}
      >
        <Text style={styles.addButtonText}>Add Bill</Text>
      </TouchableOpacity>

      <View style={styles.billListContainer}>
        <FlatList
          data={bills}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item, index }) => (<>
            <Text style={styles.billItem}>
              {item.name}: ${item.amount} ({item.frq})
            </Text>
            <Button onPress={()=>handleRemoveBill(index)} title="remove"/>
            </>
          )}
        />
      </View>
    </>
  )
}