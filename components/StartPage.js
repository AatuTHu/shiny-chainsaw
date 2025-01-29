import { View, SafeAreaView, TouchableWithoutFeedback, Keyboard,Alert  } from 'react-native'
import styles from '../styles/startPage.js'
import React, { useState } from 'react'
import { USERINFO, db, addDoc, collection, auth } from '../services/Firebase.js'
import { useNavigation } from '../services/Navigation';
import { makeTimeStamp } from '../services/Utilities.js'
import { BackButton,FinishButton,NextButton } from './reusables/StepButtons.js'
import Incomes from './reusables/Incomes.js'
import Debts from './reusables/Debts.js'
import SavingGoal from './reusables/SavingGoal.js'
import LivingExpenses from './reusables/LivingExpenses.js'
import Summary from './reusables/Summary.js'
import OtherExpenses from './reusables/OtherExpenses.js';

export default function StartPage() {

const { setNavigate } = useNavigation()
const [step, setStep] = useState(1);

const [salary, setSalary] = useState(0);
const [balance, setBalance] = useState(0);
const [expenses, setExpenses] = useState([]);
const [incomes, setIncomes] = useState([]);
const [bills, setBills] = useState([]);
const [debts, setDebts] = useState([]);
const [otherExpenses, setOtherExpenses] = useState([])
const [savingGoals, setSavingGoals] = useState([]);
const [summaryData, setSummaryData] = useState([])

  // Show inputfields step by step
  const handleNextStep = () => {
    switch (step) {
        
      case 1: setStep(2); break; // incomes
      case 2: setStep(3); break; // expenses
      case 3: setStep(4); break; // debts
      case 4: setStep(5); break; // otherExpenses
      case 5: //goals
          setSummaryData({
            salary: salary,
            balance: balance,
            otherIncomes: incomes,
            expenses: expenses,
            otherExpenses: otherExpenses,
            bills: bills,
            debts: debts,
            savingGoal: savingGoals,
          })
          setStep(6)
        break;
      default:
        break;
    }
  };

const handleBack = () => {
  if(step === 1) {auth.signOut(); setNavigate("AuthPage");}
  else if(step > 1) setStep(step - 1)
}

const handleFinish = async() => {
  await addDoc(collection(db, USERINFO), {
    uid: auth.currentUser.uid,
    salary: salary,
    balance: balance,
    otherIncomes: incomes,
    expenses: expenses,
    otherExpenses: otherExpenses,
    bills: bills,
    debts: debts,
    savingGoal: savingGoals,
    timeStamp: makeTimeStamp(),
  }).then(
    setNavigate("HomePage")
  ).catch (() =>{ 
    Alert.alert("Something went wrong...")
    setNavigate("AuthPage")
    })
  }

return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <SafeAreaView style={styles.container}>
  {/* Step 1: Salary */}
  {step === 1 && (
    <View style={styles.stepContainer}>
        <Incomes 
          incomes={incomes} 
          setIncomes={setIncomes} 
          salary={salary} 
          setSalary={setSalary} 
          balance={balance}
          setBalance={setBalance}
        />
        <View style={styles.navButtons}>
        <BackButton handleBack={handleBack}/>
        <NextButton handleNextStep={handleNextStep}/>
        </View>   
    </View>
  )}
  {/* Step 2: Living Expenses */}
  {step === 2 && (
    <View style={styles.stepContainer}>
      <LivingExpenses expenses={expenses} setExpenses={setExpenses} bills={bills} setBills={setBills}/>
      <View style={styles.navButtons}>
        <BackButton handleBack={handleBack}/>

        <NextButton handleNextStep={handleNextStep}/>
      </View>
      </View>
    )}

  {/* Step 3: Debt Details */}
  {step === 3 && (
    <View style={styles.stepContainer}>    
      <Debts debts={debts} setDebts={setDebts}/>
      <View style={styles.navButtons}>
        <BackButton handleBack={handleBack}/>
        <NextButton handleNextStep={handleNextStep}/>
      </View>
    </View>
  )}

  {/* Step 4: Other Expenses */}
  {step === 4 && (
    <View style={styles.stepContainer}>
      <OtherExpenses otherExpenses={otherExpenses} setOtherExpenses={setOtherExpenses}/>
      <View style={styles.navButtons}>
        <BackButton handleBack={handleBack}/>
        <NextButton handleNextStep={handleNextStep}/>
      </View>
    </View>
  )}

  {/* Step 5: Saving Goal */}
  {step === 5 && (
    <View style={styles.stepContainer}>
      <SavingGoal savingGoals={savingGoals} setSavingGoals={setSavingGoals}/>
      <View style={styles.navButtons}>
        <BackButton handleBack={handleBack}/>
        <FinishButton handleFinish={handleNextStep}/>
      </View>
    </View>
  )}

  {/* Step 6: Summary */}
  {step === 6 && (
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
)}