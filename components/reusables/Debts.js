import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles/startPage';
import { handleChangeItem,handleRemoveFromList,handleOnDropDownPress,handleAddToList } from '../../services/Utilities';

export default function Debts({debts, setDebts}) {
  const [visible, setVisible] = useState(null);
  const [tempObject, setTempObject] = useState({name:"",amount:0})

  const debtsOptions = [
    { name: 'House Loan', emoji: '🏢' },
    { name: 'Student Loan', emoji: '🧑‍🎓' },
    { name: 'Car Loan', emoji: '🚗' },
    { name: 'Credit card debt', emoji: '💳' },
    { name: 'Other', emoji: '💡' },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 40}}>
        <Text style={styles.label}>Debts</Text>

        {debtsOptions.map((debts, index) => (
          <View key={index} style={styles.dDownContainer}>
            <TouchableOpacity
              style={styles.dDownItem}
              onPress={() => handleOnDropDownPress(setTempObject,setVisible,visible,debts.name, index)}
            >
              <Text style={styles.dDownText}>
                {debts.emoji} {debts.name}
              </Text>
            </TouchableOpacity>

            {visible === index && (
              <View style={styles.expandedContainer}>
                {debts.name === 'Other' && (
                  <>
                    <Text style={styles.label}>Debts Name:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter name"
                      placeholderTextColor="#888"
                      value={tempObject.name}
                      onChangeText={(text)=>handleChangeItem(setTempObject,"name", text)}
                    />
                  </>
                )}

                <Text style={styles.label}>Amount spent:</Text>
                <TextInput
                  style={styles.input}s
                  placeholder={`Enter amount`}
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  value={tempObject.amount}
                  onChangeText={(text) => handleChangeItem(setTempObject,"amount",text)}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddToList(setDebts,setVisible,setTempObject,tempObject)}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
          <Text style={styles.label}>Saved debts</Text>
          {debts.map((item, index) => (
            <View key={index} style={styles.savedItemContainer}>
              <Text style={styles.savedItemText}>
                {item.name}: ${item.amount}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveFromList(setDebts, index)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
            
          ))}
    </ScrollView>
  );
}