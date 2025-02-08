import { View, Text } from 'react-native'
import styles from '../../styles/summary'
import React from 'react'

export default function Summary({ item, title }) {
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>{title}</Text>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.labelText}>Current Balance:</Text>
          <Text style={styles.text}>{item.balance} $</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.labelText}>Saving goals:</Text>
        </View>
        {item.savingGoal.map((goal, index) => (
          <View key={`goal-${index}`} style={styles.row}>
            <Text style={styles.text}>
              {goal.name}
            </Text>
            <Text style={styles.text}>
              {goal.amountSaved} / {goal.savingGoal} $
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.labelText}>Salary:</Text>
          <Text style={styles.text}>{item.salary} $</Text>
        </View>
      </View>

      {item.otherIncomes && item.otherIncomes.length > 0 && (
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.labelText}>Other Incomes:</Text>
          </View>
          {item.otherIncomes.map((income, index) => (
            <View key={`inc-${index}`} style={styles.row}>
              <Text style={styles.text}>
                {income.name}
              </Text>
              <Text style={styles.text}>
                {income.amount} $
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.section}>
      <View style={styles.row}>
          <Text style={styles.labelText}>Living Expenses:</Text>
        </View>
        {item.expenses.map((expense, index) => (
          <View key={`exp-${index}`} style={styles.row}>
            <Text style={styles.text}>{expense.name}</Text>
            <Text style={styles.text}>{expense.amount} $</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.labelText}>Other Expenses:</Text>
        </View>
        {item.otherExpenses.map((expense, index) => (
          <View key={`exp-${index}`} style={styles.row}>
            <Text style={styles.text}>
              {expense.name}
            </Text>
            <Text style={styles.text}>
              {expense.amount} $
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.labelText}>Bills:</Text>
        </View>
        {item.bills &&
          item.bills.map((bill, index) => (
            <View key={`bill-${index}`} style={styles.row}>
              <Text style={styles.text}>
                {bill.name}
              </Text>
              <Text style={styles.text}>
                {bill.amount} $
              </Text>
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.labelText}>Debts:</Text>
        </View>
        {item.debts &&
          item.debts.map((debt, index) => (
            <View key={`debt-${index}`} style={styles.row}>
              <Text style={styles.text}>
                {debt.name}
              </Text>
              <Text style={styles.text}>
                {debt.amount} $
              </Text>
            </View>
          ))}
      </View>
    </View>
  )
}
