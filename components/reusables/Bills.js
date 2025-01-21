import { View, Text, TextInput, TouchableOpacity,FlatList,Button } from 'react-native'
import React,{useState} from 'react'
import styles from '../../styles/startPage'
import ModalMenu from './ModalMenu'
import { handleChangeItem, handleRemoveFromList } from '../../services/Utilities';

export default function Bills({bills, setBills}) {

    const [visible, setVisible] = useState(false);
    const [tempObject, setTempObject] = useState({name: "", amount: 0, frqType: "Monthly", frqAmount: 30})

    //Create a new item to the list of bills
    const handleAddBill = () => {
        setBills((prevBills) => {
          const updatedBills = [
            ...prevBills,
            { name: tempObject.name, amount: tempObject.amount, frqType: tempObject.frqType, frqAmount: tempObject.frqAmount}
          ];
          return updatedBills;
        });
        setTempObject({name: "", amount: "", frqType: "Monthly", frqAmount: 30})
      };
      
  return (
    <>
      <Text style={styles.label}>Recurring Bills:</Text>
      <TextInput
        style={styles.input}
        placeholder="Bill name"
        placeholderTextColor="#888"
        value={tempObject.name}
        onChangeText={(text) => handleChangeItem(setTempObject,"name",text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Bill amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={tempObject.amount}
        onChangeText={(text) => handleChangeItem(setTempObject,"amount",text)}
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
        onPress={handleAddBill}
      >
        <Text style={styles.addButtonText}>Add Bill</Text>
      </TouchableOpacity>

      <View style={styles.billListContainer}>
        <FlatList
          data={bills}
          renderItem={({ item, index }) => (<>
            <Text key={index} style={styles.billItem}>
              {item.name}: ${item.amount} ({item.frqType})
            </Text>
            <Button onPress={()=>handleRemoveFromList(setBills,index)} title="remove"/>
            </>
          )}
        />
      </View>
    </>
  )
}