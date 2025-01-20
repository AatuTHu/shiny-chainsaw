import { Text, TextInput } from 'react-native'
import React from 'react'
import styles from '../../styles/startPage'

export default function Emergencies({emergencies, setEmergencies}) {

    const handleEmergencies = (field, value) => {
        setEmergencies(prevEmergencies => ({
          ...prevEmergencies,
          [field]: value,
        }));
      }

  return (
    <>
      <Text style={styles.label}>Emergency Fund:</Text>
      <TextInput
        style={styles.input}
        placeholder="Current emergency fund"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={emergencies.emergencyFund}
        onChangeText={(text) => handleEmergencies("emergencyFund",text)}
      />
      
      <Text style={styles.label}>Emergency Fund Goal:</Text>
      <TextInput
        style={styles.input}
        placeholder="Emergency fund goal"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={emergencies.emergencyGoal}
        onChangeText={(text) => handleEmergencies("emergencyGoal",text)}
      />
    </>
  )
}