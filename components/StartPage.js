import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import styles from '../styles/startPage.js'
import React, { useState } from 'react'
import { USERINFO, db, addDoc, collection, auth } from '../services/Firebase.js'
import { useNavigation } from '../services/Navigation';
import { makeTimeStamp } from '../services/TimeStamper.js'
import { BackButton,FinishButton,NextButton } from './reusables/StepButtons.js'
import Incomes from './reusables/Incomes.js'
import Bills from './reusables/Bills.js'
import Debts from './reusables/Debts.js'
import Emergencies from './reusables/Emergencies.js'
import SavingGoal from './reusables/SavingGoal.js'
import LivingExpenses from './reusables/LivingExpenses.js'
import Summary from './reusables/Summary.js'

export default function StartPage() {

const { setNavigate } = useNavigation()
const [step, setStep] = useState(1);

const [expenses, setExpenses] = useState({housing: 0, groceries: 0, transportation: 0});
const [emergencies, setEmergencies] = useState({emergencyFund: 0, emergencyGoal: 0})
const [salary, setSalary] = useState({ salary: 0, frqType: "Monthly", frqAmount: 30});

const [incomes, setIncomes] = useState([]);
const [bills, setBills] = useState([]);
const [debts, setDebts] = useState([]);

const [savingGoal, setSavingGoal] = useState('');

// Show inputfields step by step
const handleNextStep = () => {
  switch (step) {
    case 1:
      if(salary !== ''){
        setStep(2);
      }
      break;
    case 2:
      if(expenses.housing !== '' && expenses.groceries !== '' && expenses.transportation !== ''){
        //handleAddBill();
        setStep(3);
      } 
      break;
    case 3:
      //handleAddDebt();
      setStep(4);
      break;
    case 4:
      if (emergencies.emergencyFund !== '' && emergencies.emergencyGoal !== ''){
        setStep(5);
      }
      break;
    case 5:
      if(savingGoal !== ''){
        setStep(6);
      }
      break;
    default:
      console.log('Reached last step');
      break;
  }
};

const handleBack = () => {
  if(step > 1){
    setStep(step - 1)
  }
}

const handleSkip = () => {
  setStep(6);
}
 
const handleFinish = async() => {
  await addDoc(collection(db, USERINFO), {
    uid: auth.currentUser.uid,
    amountSaved: 0,
    salary: salary,
    otherIncomes: incomes,
    expenses: expenses,
    bills: bills,
    debts: debts,
    emergencyFunds: emergencies,
    savingGoal: savingGoal,
    timeStamp: makeTimeStamp(),
    transactionHistory: "",
}).catch (error => console.log(error))
  setNavigate("HomePage")
}

return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <SafeAreaView style={styles.container}>
  {/* Step 1: Salary */}
  {step === 1 && (
    <View style={styles.stepContainer}>
        <Incomes 
          setIncomes={setIncomes} 
          incomes={incomes} 
          salary={salary} 
          setSalary={setSalary} 
        />
        <View style={styles.navButtons}>
        <NextButton handleNextStep={handleNextStep}/>
        </View>   
    </View>
  )}
  {/* Step 2: Living Expenses */}
  {step === 2 && (
    <View style={styles.stepContainer}>
      <LivingExpenses expenses={expenses} setExpenses={setExpenses}/>
      <Bills bills={bills} setBills={setBills}/>

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

  {/* Step 4: Emergency Fund */}
  {step === 4 && (
    <View style={styles.stepContainer}>
      <Emergencies emergencies={emergencies} setEmergencies={setEmergencies}/>
      <View style={styles.navButtons}>
        <BackButton handleBack={handleBack}/>
        <NextButton handleNextStep={handleNextStep}/>
      </View>
    </View>
  )}

  {/* Step 5: Saving Goal */}
  {step === 5 && (
    <View style={styles.stepContainer}>
      <SavingGoal savingGoal={savingGoal} setSavingGoal={setSavingGoal}/>
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
      salary = {salary}
      incomes={incomes}
      expenses = {expenses}
      bills = {bills}
      debts = {debts}
      emergencies = {emergencies}
      savingGoal = {savingGoal}
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