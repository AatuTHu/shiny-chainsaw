import { View, Text, Touchable } from 'react-native'
import styles from '../../styles/summary'
import React from 'react'

export default function Summary({item, title}) {
  return (
    <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>{title}</Text>
              {/* Displaying the rest of the user data */}
              <Text style={styles.labelText}>Saving goals:</Text>
              {item.savingGoal.map((goal, index) => (
                <View key={`goal-${index}`}>
                  <Text style={styles.text}>
                    {goal.name} {goal.amountSaved} / {goal.savingGoal} $
                  </Text>
                </View>
              ))}

              <Text style={styles.labelText}>Salary:</Text>
              <Text style={styles.text}>{item.salary.salary} $</Text>

              {item.otherIncomes && item.otherIncomes.length > 0 && (
                <>
                  <Text style={styles.labelText}>Other Incomes:</Text>
                  {item.otherIncomes.map((income, index) => (
                    <View key={`inc-${index}`}>
                      <Text style={styles.text}>
                        {income.name} {income.amount} $
                      </Text>
                    </View>
                  ))}
                </>
              )}

              <Text style={styles.labelText}>Housing:</Text>
              <Text style={styles.text}>{item.expenses.housing} $</Text>

              <Text style={styles.labelText}>Transportation:</Text>
              <Text style={styles.text}>{item.expenses.transportation} $</Text>

              <Text style={styles.labelText}>Groceries:</Text>
              <Text style={styles.text}>{item.expenses.groceries} $</Text>

              <Text style={styles.labelText}>Other Expenses:</Text>
              {item.otherExpenses.map((expense,item)=>(
                <View key={`exp-${item}`}>
                  <Text style={styles.text}>
                    {expense.name} {expense.amount} $
                  </Text>
                </View>
              ))}

              {/* Additional user data rendering */}
              <Text style={styles.labelText}>Bills:</Text>
              {item.bills &&
                item.bills.map((bill, index) => (
                  <View key={`bill-${index}`}>
                    <Text style={styles.text}>
                      {bill.name} {bill.amount} $ {bill.frq}
                    </Text>
                  </View>
                ))}

              <Text style={styles.labelText}>Debts:</Text>
              {item.debts &&
                item.debts.map((debt, index) => (
                  <View key={`debt-${index}`}>
                    <Text style={styles.text}>
                      {debt.name} {debt.amount} $
                    </Text>
                  </View>
        ))}
    </View>
  )
}