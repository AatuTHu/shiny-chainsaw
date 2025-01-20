import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { signOut, auth, USERINFO, query, collection, db, where, onSnapshot } from '../services/Firebase';
import { useNavigation } from '../services/Navigation';
import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { calculateSavings } from '../services/Calculator';

export default function HomePage() {
  const [userData, setUserData] = useState([]);
  const { setNavigate } = useNavigation();

  useEffect(() => {
    const q = query(collection(db, USERINFO), where("uid", "==", auth.currentUser.uid));
    const queryUserData = onSnapshot(q, (querySnapshot) => {
      const tempData = [];

      querySnapshot.forEach((doc) => {
        const object = {
          amountSaved: doc.data().amountSaved,
          bills: doc.data().bills,
          debts: doc.data().debts,
          emergencyFunds: doc.data().emergencyFunds,
          expenses: doc.data().expenses,
          salary: doc.data().salary,
          savingGoal: doc.data().savingGoal,
          otherIncomes: doc.data().otherIncomes,
          transactionHistory: doc.data().transactionHistory,
          timeStamp: doc.data().timeStamp,
          uid: doc.data().uid,
        }
        tempData.push(object)
      })
      console.log(tempData)
      tempData[0].amonutSaved = calculateSavings(tempData[0], '10.2.2025') // string is for simulating to a date
      setUserData(tempData)
    })

    return () => {
      queryUserData();
    };
  }, []);

  const SignOut = async () => {
    signOut(auth)
      .then(() => {
        setNavigate("AuthPage");
      })
      .catch((e) => {
        console.log(e);
      });
  };

return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        data={userData}
        renderItem={({ item, i }) => {
          // Default to 0 if any value is undefined or null
          const housing = Number(item.expenses.housing) || 0;
          const transportation = Number(item.expenses.transportation) || 0;
          const groceries = Number(item.expenses.groceries) || 0;
          
          // Calculate the total of all bills
          const totalBills = item.bills
          ? item.bills.reduce((sum, bill) => sum + (Number(bill.amount) || 0), 0)
          : 0;

          const needs = Number(housing) + Number(groceries) + Number(transportation) + Number(totalBills); // Add up nescessary expenses

          // Example piechart to show nescessary expenses in different colors
          const chartData = [
            {
              name: "Needs",
              population: needs,
              color: "#FF6347",
              legendFontColor: "#7F7F7F",
              legendFontSize: 14
            },
            {
              name: "Housing",
              population: housing,
              color: "#FF7F50",
              legendFontColor: "#7F7F7F",
              legendFontSize: 14
            },
            {
              name: "Transportation",
              population: transportation,
              color: "#FF4500",
              legendFontColor: "#7F7F7F",
              legendFontSize: 14
            },
            {
              name: "Groceries",
              population: groceries,
              color: "#FF0000",
              legendFontColor: "#7F7F7F",
              legendFontSize: 14
            },
            {
              name: "Bills",
              population: totalBills,
              color: "#8B0000",
              legendFontColor: "#7F7F7F",
              legendFontSize: 14
            },
          ];

          // Debugging
          console.log('Housing:', housing);
          console.log('Transportation:', transportation);
          console.log('Groceries:', groceries);
          console.log('Total Bills:', totalBills);
          console.log('Chart Data:', chartData);

          return (
            <View key={i} style={styles.dataContainer}>
              {/* Pie Chart */}
              <PieChart
                data={chartData}
                width={Dimensions.get("window").width - 40}
                height={220}
                chartConfig={{
                  backgroundColor: "#1E1E1E",
                  backgroundGradientFrom: "#121212",
                  backgroundGradientTo: "#121212",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                accessor="population"
                backgroundColor="transparent"
              />

              {/* Displaying the rest of the user data */}
              <Text style={styles.labelText}>Amount Saved:</Text>
              <Text style={styles.text}>{item.amountSaved} $</Text>
              <Text style={styles.labelText}>Savings Goal:</Text>
              <Text style={styles.text}>{item.savingGoal} $</Text>

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
              <Text style={styles.text}>{housing} $</Text>

              <Text style={styles.labelText}>Transportation:</Text>
              <Text style={styles.text}>{transportation} $</Text>

              <Text style={styles.labelText}>Groceries:</Text>
              <Text style={styles.text}>{groceries} $</Text>

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

              <Text style={styles.labelText}>Emergency Fund:</Text>
              <Text style={styles.text}>{item.emergencyFunds.emergencyFund} $</Text>
              <Text style={styles.labelText}>Emergency Goal:</Text>
              <Text style={styles.text}>{item.emergencyFunds.emergencyGoal} $</Text>
            </View>
          );
        }}
      />
      <Button style={styles.signOutButton} onPress={SignOut} title="Sign Out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingVertical: 40,
  },
  dataContainer: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
  },
  labelText: {
    color: '#A5A5A5',
    fontSize: 14,
    marginBottom: 5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  signOutButton: {
    backgroundColor: '#E53935',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  signOutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
