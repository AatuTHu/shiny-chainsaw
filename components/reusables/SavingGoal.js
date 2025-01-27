import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import styles from '../../styles/startPage';
import { handleChangeItem, handleRemoveFromList } from '../../services/Utilities';

export default function SavingGoal({savingGoals,setSavingGoals}) {
  const [visibleGoal, setVisibleGoal] = useState(null);
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

  const handleAddgoal = () => {
      setSavingGoals((prevDebts) => {
          const updatedDebts = [
          ...prevDebts,
          { name: tempObject.name, amountSaved: tempObject.amountSaved, savingGoal: tempObject.savingGoal }
          ];
          return updatedDebts;
      });
      setVisibleGoal(null)
      setTempObject({name: tempObject.name ,amountSaved: "", savingGoal: ""});
  }

  const handleOnGoalPress = (name, index) => {
    handleChangeItem(setTempObject,"name",name)
    setVisibleGoal(index);
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 40}}>
        <Text style={styles.label}>Saving Goals</Text>

        {goalOptions.map((goal, index) => (
          <View key={index} style={localStyles.goalContainer}>
            <TouchableOpacity
              style={localStyles.goalItem}
              onPress={() => handleOnGoalPress(goal.name,index)}
            >
              <Text style={localStyles.goalText}>
                {goal.emoji} {goal.name}
              </Text>
            </TouchableOpacity>

            {visibleGoal === index && (
              <View style={localStyles.expandedContainer}>
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
                  onPress={handleAddgoal}
                >
                  <Text style={styles.addButtonText}>Add Goal</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
        <Text style={styles.label}>Saved Goals</Text>
          {savingGoals.map((goal, index) => (
          <View key={index} style={localStyles.savedItemContainer}>
          <Text style={localStyles.savedItemText}>
            {goal.name}: {goal.amountSaved} / {goal.savingGoal}$
          </Text>
          <TouchableOpacity onPress={() => handleRemoveFromList(setSavingGoals, index)}>
            <Text style={localStyles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
        ))}
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  goalContainer: {
    marginBottom: 20,
  },
  goalItem: {
    backgroundColor: '#1E1E1E',
    width: 300,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goalText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  expandedContainer: {
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
    width: 300,
  },
  savedItemContainer: {
    backgroundColor: '#333',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  savedItemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  removeText: {
    color: '#FF6347',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
