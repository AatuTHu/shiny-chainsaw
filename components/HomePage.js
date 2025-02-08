import { View, Text, Button, FlatList, TouchableOpacity, TextInput, Alert  } from 'react-native';
import { signOut, auth, USERINFO, query, collection, db, where, onSnapshot,doc, updateDoc} from '../services/Firebase';
import { useNavigation } from '../services/Navigation';
import React, { useState, useEffect, useMemo } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { calculateBalance } from '../services/Calculator';
import Icon from '@expo/vector-icons/Ionicons'
import Summary from './reusables/Summary';
import styles from '../styles/summary'

export default function HomePage() {
  const [userData, setUserData] = useState([]);
  const { setNavigate } = useNavigation();
  const [chartData, setChartData] = useState([])
  const [visible, setVisible] = useState(false)
  const [randomBalanceChange, setRandomBalanceChange] = useState(0);

  useEffect(() => {
    const q = query(collection(db, USERINFO), where("uid", "==", auth.currentUser.uid));   
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
            setNavigate('StartPage');
            Alert.alert('No data found, Fill your data please.');
            return;
        }
        const tempData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        const calculatedTemp = calculateBalance(tempData[0]);
        setUserData(calculatedTemp.length ? calculatedTemp : tempData);
        makeChart(tempData[0]);
    });

    return () => unsubscribe(); // Clean up the listener
}, []);

const makeChart = useMemo(() => {
  return (item) => {
    // Helper function to sum amounts from arrays
    const sumAmounts = (arr, field = 'amount') => {
      if (!Array.isArray(arr)) return 0;
    
      return arr.reduce((sum, entry) => {
        if (!entry) return sum;
    
        let value = entry[field];
    
        // Convert comma decimal format (e.g., "22,50" → 22.50)
        if (typeof value === 'string') {
          value = parseFloat(value.replace(',', '.'));
        }
    
        return typeof value === 'number' && !isNaN(value) ? sum + value : sum;
      }, 0);
    };

    // Calculate total from arrays
    const otherIncomes = sumAmounts(item.otherIncomes);
    const totalBills = sumAmounts(item.bills);
    const totalExpenses = sumAmounts(item.expenses);
    const totalNeeds = totalBills + totalExpenses;
    const totalOtherExpenses = sumAmounts(item.otherExpenses);
    const debtPayments = sumAmounts(item.debts, 'payment');

    const balance = item.salary + otherIncomes || 0;
    const finalBalance = balance - totalNeeds - totalOtherExpenses - debtPayments;

    setChartData([
      {
        name: "Needs",
        population: totalNeeds,
        color: "#de8b4b",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14,
      },
      {
        name: "Wants",
        population: totalOtherExpenses,
        color: "#cb8fe3",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14,
      },
      {
        name: "Debts",
        population: debtPayments,
        color: "#FF6347",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14,
      },
      {
        name: "Money saved",
        population: finalBalance,
        color: "#82d986",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14,
      },
    ]);
  };
}, []);


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
        Alert.alert("Something went wrong")
      });
  };

return (
    <View style={styles.container}>
      <FlatList
        data={userData}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        renderItem={({ item, i }) => (
            <View key={i} style={styles.dataContainer}>
              <View style={styles.balanceHolder}>
              <TouchableOpacity onPress={SignOut}>
                  <Icon name= {"log-out-outline"} size={30} color="#FFFFFF"/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.minusButton} onPress={() =>  handleRandomBalanceChange("minus")}>
                  <Icon name="remove-circle-outline" size={30} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.balanceContent}>
                  <Text style={styles.labelText}>Balance:</Text>
                  <Text style={styles.balanceText}>{item.balance} $</Text>
                </View>
                
                <TouchableOpacity style={styles.plusButton} onPress={() => handleRandomBalanceChange("plus")}>
                  <Icon name="add-circle-outline" size={30} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> setNavigate("EditPage") }>
                  <Icon name= {"create-outline"} size={30} color="#FFFFFF"/>
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
                width={Dimensions.get("window").width - 50}
                height={170}
                chartConfig={{
                  backgroundColor: "#1E1E1E",
                  backgroundGradientFrom: "#121212",
                  backgroundGradientTo: "#121212",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
              />
              {/*Summary*/}
              <Summary item={item}/>
            </View>
        )}
      />
    </View>
  );
}