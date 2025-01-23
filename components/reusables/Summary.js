import { View, Text } from 'react-native'
import styles from '../../styles/startPage'
import React from 'react'

export default function Summary({salary,incomes,expenses,bills,debts,savingGoals,otherExpenses}) {
  return (
    <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Summary</Text>

        <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Salary:</Text>
            <Text style={styles.summaryValue}>{salary.salary} ({salary.frqType})</Text>
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
            <Text style={styles.summaryLabel}>Other Expenses:</Text>
            {otherExpenses.map((expense, index) => (
                <Text key={index} style={styles.summaryValue}>
                    {expense.name}: {expense.amount}
                </Text>
            ))}
        </View>

        <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Bills:</Text>
            {bills.length > 0 ? (
                bills.map((bill, index) => (
                <Text key={index} style={styles.summaryValue}>
                    {bill.name}: {bill.amount} ({bill.frqType})
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
                {debt.name}: ${debt.amount} (Repayment: ${debt.payment}, {debt.frqType})
            </Text>
            ))
            ) : (
            <Text style={styles.summaryValue}>No debts added.</Text>
            )}
        </View>

        <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Saving Goals:</Text>
            {savingGoals.map((goals, index) => (
                <Text key={index} style={styles.summaryValue}>
                    {goals.name}: {goals.amountSaved} / {goals.savingGoal}$
                </Text>
            ))}
        </View>
    </View>
  )
}