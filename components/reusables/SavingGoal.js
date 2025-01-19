import { Text,TextInput } from 'react-native'
import styles from '../../styles/startPage'
import React from 'react'

export default function SavingGoal({savingGoal,setSavingGoal}) {
  return (<>
    <Text style={styles.label}>Saving Goal:</Text>
        <TextInput
        style={styles.input}
        placeholder="Saving goal amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={savingGoal}
        onChangeText={(text) => setSavingGoal(text)}
        />
    </>
  )
}