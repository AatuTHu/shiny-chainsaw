import { View, SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert,FlatList } from 'react-native'
import styles from '../styles/startPage.js'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '../services/Navigation';
import { BackButton,FinishButton,MenuButton,NextButton } from './reusables/StepButtons.js'
import Incomes from './reusables/Incomes.js'
import Debts from './reusables/Debts.js'
import SavingGoal from './reusables/SavingGoal.js'
import LivingExpenses from './reusables/LivingExpenses.js'
import Summary from './reusables/Summary.js'
import OtherExpenses from './reusables/OtherExpenses.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditPage() {
    const { setNavigate } = useNavigation()
    const [step, setStep] = useState(1);
    
    const [docId, setDocId] = useState(0);
    const [salary, setSalary] = useState(0)
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [bills, setBills] = useState([]);
    const [debts, setDebts] = useState([]);
    const [otherExpenses, setOtherExpenses] = useState([])
    const [savingGoals, setSavingGoals] = useState([])
    const [summaryData, setSummaryData] = useState([])
    const [timeStamp, setTimeStamp] = useState("");
    const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('USERINFO');
        if (storedData) {
          const docData = JSON.parse(storedData);
          const { bills, debts, otherExpenses, expenses, salary, savingGoal, otherIncomes, timeStamp, balance } = docData;

          setSalary(salary);
          setIncomes(otherIncomes);
          setExpenses(expenses);
          setBills(bills);
          setDebts(debts);
          setOtherExpenses(otherExpenses);
          setSavingGoals(savingGoal);
          setTimeStamp(timeStamp);
          setBalance(balance);
        }
      } catch (error) {
        console.error("Error fetching user data from AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, []);
    

  const handleBack = () => {
    if(step === 1) setNavigate("HomePage")
    else if(step > 1) setStep(1)
  }
  
const handleFinish = async () => {
  try {
    const dataToSave = {
      balance,
      salary,
      otherIncomes: incomes,
      expenses,
      otherExpenses,
      bills,
      debts,
      savingGoal: savingGoals,
      timeStamp,
    };
    await AsyncStorage.setItem('USERINFO', JSON.stringify(dataToSave));
  } catch (error) {
    Alert.alert("Error updating. Try again later..");
    return;
  }
  setNavigate("HomePage");
};

    const menuItems = [
      { id: "1", title: "Incomes", emoji: '💰', value: 2 },
      { id: "2", title: "Living Expenses", emoji:'🏡', value: 3 },
      { id: "3", title: "Debts", emoji:'🏦', value: 4 },
      { id: "4", title: "Other Expenses", emoji:'🛍️',value: 5 },
      { id: "5", title: "Savings Goal", emoji:'🚀', value: 6 },
    ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
    {/*Step 1: Main menu*/}
    {step === 1 && (
    <View style={styles.menuContainer}>
      <FlatList
        data={menuItems}
        contentContainerStyle={styles.menuContainer}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          
            <MenuButton title={item.title} emoji={item.emoji} handlePress={setStep} value={item.value} />
          
        )}
      />
        <FinishButton handleFinish={handleFinish} title="Confirm" />
    </View>
    )}
    {/* Step 2: Salary */}
    {step === 2 && (
      <View style={styles.stepContainer}>
          <Incomes 
            setIncomes={setIncomes} 
            incomes={incomes} 
            salary={salary} 
            setSalary={setSalary} 
          />
          <View style={styles.navButtons}>
          <BackButton handleBack={handleBack}/>
          </View>   
      </View>
    )}
    {/* Step 3: Living Expenses */}
    {step === 3 && (
      <View style={styles.stepContainer}>
        <LivingExpenses expenses={expenses} setExpenses={setExpenses} bills={bills} setBills={setBills}/>
        <View style={styles.navButtons}>
          <BackButton handleBack={handleBack}/>
        </View>
        </View>
      )}
  
    {/* Step 4: Debt Details */}
    {step === 4 && (
      <View style={styles.stepContainer}>     
        <Debts debts={debts} setDebts={setDebts}/>
        <View style={styles.navButtons}>
          <BackButton handleBack={handleBack}/>
        </View>
      </View>
    )}
  
    {/* Step 5: Other Expenses */}
    {step === 5 && (
      <View style={styles.stepContainer}>
        <OtherExpenses setOtherExpenses={setOtherExpenses} otherExpenses={otherExpenses}/>
        <View style={styles.navButtons}>
          <BackButton handleBack={handleBack}/>
        </View>
      </View>
    )}
  
    {/* Step 6: Saving Goal */}
    {step === 6 && (
      <View style={styles.stepContainer}>
        <SavingGoal setSavingGoals={setSavingGoals} savingGoals={savingGoals}/>
        <View style={styles.navButtons}>
          <BackButton handleBack={handleBack}/>
        </View>
      </View>
    )}
  
    {/* Step 7: Summary */}
    {step === 7 && (
      <View style={styles.summaryContainer}>
        <Summary
        item={summaryData}
        title={"Summary"}
        />
        <View style={styles.navButtons}>
          <BackButton handleBack={handleBack}/>
          <FinishButton handleFinish={handleFinish} title = {"Confirm"}/>
        </View>
      </View>
      )}
    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}