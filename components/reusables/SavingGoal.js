import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles/startPage';
import { handleChangeItem, handleRemoveFromList,handleOnDropDownPress, handleAddToList } from '../../services/Utilities';

export default function SavingGoal({savingGoals,setSavingGoals}) {
  const [visible, setVisible] = useState(null);
  const [tempObject, setTempObject] = useState({name: "", amountSaved: "", savingGoal: ""});

  const goalOptions = [
    { name: 'Emergency Fund', emoji: '🛟' },
    { name: 'Retirement', emoji: '🏖️' },
    { name: 'Vehicle', emoji: '🚗' },
    { name: 'Travel', emoji: '✈️' },
    { name: 'House', emoji: '🏠' },
    { name: 'Wedding', emoji: '💍' },
    { name: 'Other', emoji: '💡' },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 40}}>
        <Text style={styles.label}>Saving Goals</Text>

        {goalOptions.map((goal, index) => (
          <View key={index} style={styles.dDownContainer}>
            <TouchableOpacity
              style={styles.dDownItem}
              onPress={() => handleOnDropDownPress(setTempObject,setVisible,visible,goal.name, index)}
            >
              <Text style={styles.dDownText}>
                {goal.emoji} {goal.name}
              </Text>
            </TouchableOpacity>

            {visible === index && (
              <View style={styles.expandedContainer}>
                {goal.name === 'Other' && (
                  <>
                    <Text style={styles.label}>Goal Name:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter name"
                      placeholderTextColor="#888"
                      value={tempObject.name}
                      onChangeText={(text) => handleChangeItem(setTempObject,"name", text)}
                    />
                  </>
                )}

                <Text style={styles.label}>{tempObject.name} Goal:</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter amount`}
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  value={tempObject.savingGoal}
                  onChangeText={(text) => handleChangeItem(setTempObject,"savingGoal", text)}
                />

                <Text style={styles.label}>Already Saved:</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter amount`}
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  value={tempObject.amountSaved}
                  onChangeText={(text) => handleChangeItem(setTempObject,"amountSaved", text)}
                />

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddToList(setSavingGoals,setVisible,setTempObject,tempObject)}
                >
                  <Text style={styles.addButtonText}>Add Goal</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
        <Text style={styles.label}>Saved Goals</Text>
          {savingGoals.map((goal, index) => (
          <View key={index} style={styles.savedItemContainer}>
          <Text style={styles.savedItemText}>
            {goal.name}: {goal.amountSaved} / {goal.savingGoal}$
          </Text>
          <TouchableOpacity onPress={() => handleRemoveFromList(setSavingGoals, index)}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
        ))}
    </ScrollView>
  );
}