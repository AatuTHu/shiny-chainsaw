import { View, Text } from 'react-native'
import styles from '../../styles/startPage'
import React from 'react'

export default function Summary({salary,incomes,expenses,bills,debts,emergencies,savingGoal}) {
  return (
    <>
    <Text style={styles.summaryTitle}>Summary</Text>

    <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>Salary:</Text>
    <Text style={styles.summaryValue}>{salary.salary} ({salary.frq})</Text>
    <Text style={styles.summaryLabel}>Other incomes:</Text>
    {incomes.length > 0 ? (
        incomes.map((income,index) => (
            <Text key={index} style={styles.summaryValue}>
            {income.name}: {income.amount}
            </Text>
        ))
    ) : (
     <Text style={styles.summaryValue}>No other incomes added.</Text>
    )}
    </View>

    <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>Living Expenses:</Text>
    <Text style={styles.summaryValue}>Housing: {expenses.housing}</Text>
    <Text style={styles.summaryValue}>Food and Groceries: {expenses.groceries}</Text>
    <Text style={styles.summaryValue}>Transportation: {expenses.transportation}</Text>
    </View>

    <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>Bills:</Text>
    {bills.length > 0 ? (
        bills.map((bill, index) => (
        <Text key={index} style={styles.summaryValue}>
            {bill.name}: {bill.amount} ({bill.frq})
        </Text>
        ))
    ) : (
    <Text style={styles.summaryValue}>No Bills Added.</Text>
    )}
    </View>

    <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>Debts:</Text>
    {debts.length > 0 ? (
    debts.map((debt, index) => (
    <Text key={index} style={styles.summaryValue}>
        {debt.name}: ${debt.amount} (Repayment: ${debt.payment}, {debt.frq})
    </Text>
    ))
    ) : (
    <Text style={styles.summaryValue}>No debts added.</Text>
    )}
    </View>

    <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>Emergency Fund:</Text>
    <Text style={styles.summaryValue}>
        Current: {emergencies.emergencyFund}, Goal: {emergencies.emergencyGoal}
    </Text>
    </View>

    <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>Saving Goal:</Text>
    <Text style={styles.summaryValue}>{savingGoal}</Text>
    </View>
    </>
  )
}