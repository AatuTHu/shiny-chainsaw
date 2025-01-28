import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity,TextInput } from 'react-native';
import { signOut, auth, USERINFO, query, collection, db, where, onSnapshot,doc, updateDoc} from '../services/Firebase';
import { useNavigation } from '../services/Navigation';
import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { calculateBalance, getTotalAmountOfBills, getTotalAmountOfExpenses} from '../services/Calculator';
import Icon from '@expo/vector-icons/Ionicons'
import Summary from './reusables/Summary';

export default function HomePage() {
  const [userData, setUserData] = useState([]);
  const { setNavigate } = useNavigation();
  const [chartData, setChartData] = useState([])
  const [visible, setVisible] = useState(false)
  const [randomBalanceChange, setRandomBalanceChange] = useState(0);

  useEffect(() => {
    const q = query(collection(db, USERINFO), where("uid", "==", auth.currentUser.uid));
    const queryUserData = onSnapshot(q, (querySnapshot) => {
      const tempData = [];
      querySnapshot.forEach((doc) => {
        const object = {
          id: doc.id,
          balance: doc.data().balance,
          bills: doc.data().bills,
          debts: doc.data().debts,
          otherExpenses: doc.data().otherExpenses,
          expenses: doc.data().expenses,
          salary: doc.data().salary,
          savingGoal: doc.data().savingGoal,
          otherIncomes: doc.data().otherIncomes,
          timeStamp: doc.data().timeStamp,
          uid: doc.data().uid,
        }
        tempData.push(object)
      })
      let calculatedTemp = calculateBalance(tempData[0])
      if(calculatedTemp.length >= 1) setUserData(calculatedTemp)
      else setUserData(tempData)
      makeChart(tempData[0])
    })

    return () => {
      queryUserData();
    };
  }, []);

  const makeChart = (item) => {
    const housing = item.expenses.housing || 0;
    const transportation = item.expenses.transportation || 0;
    const groceries = item.expenses.groceries || 0;
    const totalBills = getTotalAmountOfBills(item.bills)  // Calculate the total of all bills    
    const needs = (getTotalAmountOfExpenses(item.expenses) + totalBills); // Add up nescessary expenses
    setChartData([   // Example piechart to show nescessary expenses in different colors 
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
    ])
  }

  const handleRandomBalanceChange = (type) => {
    if (visible === true) {
      const docRef = doc(db, USERINFO, userData[0].id)
      let newBalance = type === "minus" ? userData[0].balance - Number(randomBalanceChange) : userData[0].balance + Number(randomBalanceChange)
      updateDoc(docRef,{
        balance: newBalance
        }
      )
      setRandomBalanceChange(0)
      setVisible(false)
    }
    setVisible(!visible)
  };

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
        renderItem={({ item, i }) => (
            <View key={i} style={styles.dataContainer}>
              <View style={styles.balanceHolder}>
                <TouchableOpacity style={styles.minusButton} onPress={() =>  handleRandomBalanceChange("minus")}>
                  <Icon name="remove-circle-outline" size={30} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.balanceContent}>
                  <Text style={styles.labelText}>Balance:</Text>
                  <Text style={styles.balanceText}>{userData[0].balance} $</Text>
                </View>

                <TouchableOpacity onPress={()=> setNavigate("EditPage") }>
                  <Icon name= {"create-outline"} size={30} color="#FFFFFF"/>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.plusButton} onPress={() => handleRandomBalanceChange("plus")}>
                  <Icon name="add-circle-outline" size={30} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
                {visible && 
                  <TextInput
                  style={styles.input}
                  value={randomBalanceChange}
                  keyboardType='numeric'
                  placeholder="Enter Amount"
                  placeholderTextColor="#888"
                  onChangeText={(text) => setRandomBalanceChange(text)}
                  />                
                }
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
              <Summary item={item}/>
            </View>
        )}
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
    fontSize: 20,
    marginBottom: 5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
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
  balanceHolder: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10,
  },
  balanceContent: {
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  balanceText: {
    fontSize: 18,
    color: "#32CD32",
    textAlign: "center",
  },
  labelText: {
    color: "#A5A5A5",
    fontSize: 14,
    marginBottom: 5,
  },
  minusButton: {
    backgroundColor: "#FF6347",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  plusButton: {
    backgroundColor: "#32CD32",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
  icon: {
    textAlign: 'center',
    alignSelf: 'center', 
  },
  input:{
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#2a2a3d',
    color: '#fff',
    marginVertical: 10,
    fontSize: 18
  },
});
