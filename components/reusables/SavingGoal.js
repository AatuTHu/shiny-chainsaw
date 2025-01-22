import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import styles from '../../styles/startPage';

export default function SavingGoal({ savingGoals, setSavingGoals }) {
  const [expandedGoal, setExpandedGoal] = useState(null);
  const [amounts, setAmounts] = useState({});
  const [savedAmounts, setSavedAmounts] = useState({});
  const [customGoalName, setCustomGoalName] = useState('');

  const goalOptions = [
    { name: 'Emergency Fund', emoji: '🛟' },
    { name: 'Retirement', emoji: '🏖️' },
    { name: 'Vehicle', emoji: '🚗' },
    { name: 'Travel', emoji: '✈️' },
    { name: 'House', emoji: '🏠' },
    { name: 'Wedding', emoji: '💍' },
    { name: 'Other', emoji: '💡' },
  ];

  const handleInputChange = (goal, type, value) => {
    if (type === 'amount') {
      setAmounts((prev) => ({ ...prev, [goal]: value }));
    } else if (type === 'saved') {
      setSavedAmounts((prev) => ({ ...prev, [goal]: value }));
    }

    const goalAmount = amounts[goal];
    const savedAmount = savedAmounts[goal];
    if (goalAmount) {
      setSavingGoals((prev) => {
        const updatedGoals = prev.filter((item) => item.name !== goal);
        return [
          ...updatedGoals,
          {
            name: goal,
            goalAmount: goalAmount,
            savedAmount: savedAmount || 0,
          },
        ];
      });
    }
  };

  const handleCustomGoalNameChange = (value) => {
    setCustomGoalName(value);
  };

  const handleGoalSelection = (goalName) => {
    if (goalName === 'Other') {
      if (customGoalName) {
        setExpandedGoal(expandedGoal === goalName ? null : goalName);
      } else {
        setExpandedGoal(expandedGoal === goalName ? null : goalName);
      }
    } else {
      setExpandedGoal(expandedGoal === goalName ? null : goalName);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 15 }}>
        <Text style={styles.label}>Saving Goals</Text>

        {goalOptions.map((goal, index) => (
          <View key={index} style={localStyles.goalContainer}>
            <TouchableOpacity
              style={localStyles.goalItem}
              onPress={() => handleGoalSelection(goal.name)}
            >
              <Text style={localStyles.goalText}>
                {goal.emoji} {goal.name}
              </Text>
            </TouchableOpacity>

            {expandedGoal === goal.name && (
              <View style={localStyles.expandedContainer}>
                {goal.name === 'Other' ? (
                  <>
                    <Text style={styles.label}>Goal Name:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter name"
                      placeholderTextColor="#888"
                      value={customGoalName}
                      onChangeText={handleCustomGoalNameChange}
                    />
                  </>
                ) : null}

                <Text style={styles.label}>{goal.name === 'Other' ? customGoalName : goal.name} Goal:</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter amount`}
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  value={amounts[goal.name] || ''}
                  onChangeText={(text) => handleInputChange(goal.name === 'Other' ? customGoalName : goal.name, 'amount', text)}
                />

                <Text style={styles.label}>Already Saved:</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter amount`}
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  value={savedAmounts[goal.name] || ''}
                  onChangeText={(text) => handleInputChange(goal.name === 'Other' ? customGoalName : goal.name, 'saved', text)}
                />
              </View>
            )}
          </View>
        ))}
      </View>
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
});
