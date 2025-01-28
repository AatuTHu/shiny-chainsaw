import { View, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import styles from '../styles/startPage.js'
import React, { useState, useEffect } from 'react'
import { auth, USERINFO, query, collection, db, where, onSnapshot,setDoc,doc} from '../services/Firebase.js'
import { useNavigation } from '../services/Navigation';
import { BackButton,FinishButton,NextButton } from './reusables/StepButtons.js'
import Incomes from './reusables/Incomes.js'
import Bills from './reusables/Bills.js'
import Debts from './reusables/Debts.js'
import SavingGoal from './reusables/SavingGoal.js'
import LivingExpenses from './reusables/LivingExpenses.js'
import Summary from './reusables/Summary.js'
import OtherExpenses from './reusables/OtherExpenses.js';

export default function EditPage() {
    const { setNavigate } = useNavigation()
    const [step, setStep] = useState(1);
    
    const [docId, setDocId] = useState(0);
    const [expenses, setExpenses] = useState({});
    const [salary, setSalary] = useState(0)
    const [incomes, setIncomes] = useState([]);
    const [bills, setBills] = useState([]);
    const [debts, setDebts] = useState([]);
    const [otherExpenses, setOtherExpenses] = useState([])
    const [savingGoals, setSavingGoals] = useState([])
    const [summaryData, setSummaryData] = useState([])
    const [timeStamp, setTimeStamp] = useState("");
    const [balance, setBalance] = useState(0);


    useEffect(() => {
        const q = query(collection(db, USERINFO), where("uid", "==", auth.currentUser.uid));
        const queryUserData = onSnapshot(q, (querySnapshot) => {
          const tempData = [];
    
          querySnapshot.forEach((doc) => {
            const object = {
              docId: doc.id,
              bills: doc.data().bills,
              debts: doc.data().debts,
              otherExpenses: doc.data().otherExpenses,
              expenses: doc.data().expenses,
              salary: doc.data().salary,
              savingGoal: doc.data().savingGoal,
              otherIncomes: doc.data().otherIncomes,
              transactionHistory: doc.data().transactionHistory,
              timeStamp: doc.data().timeStamp,
              balance: doc.data().balance,
              uid: doc.data().uid,
            }
            tempData.push(object)
          })
          
          setDocId(tempData[0].docId)
          setSalary(tempData[0].salary)
          setIncomes(tempData[0].otherIncomes)
          setExpenses(tempData[0].expenses)
          setBills(tempData[0].bills)
          setDebts(tempData[0].debts)
          setOtherExpenses(tempData[0].otherExpenses)
          setSavingGoals(tempData[0].savingGoal)
          setTimeStamp(tempData[0].timeStamp)
          setBalance(tempData[0].balance)
        })
    
        return () => {
          queryUserData();
        };
      }, []);
    
    
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
      if(step === 1) setNavigate("HomePage")
      else if(step > 1) setStep(step - 1)
    }
    
    const handleFinish = async() => {
      try {  
        const docRef = doc(db, USERINFO, docId);  // Reference to the Firestore document
        await setDoc(docRef, {  // Update the Firestore document
          uid: auth.currentUser.uid,
          balance: balance,
          salary: salary,
          otherIncomes: incomes,
          expenses: expenses,
          otherExpenses: otherExpenses,
          bills: bills,
          debts: debts,
          savingGoal: savingGoals,
          timeStamp: timeStamp,
        });
      } catch (error) {
        console.error('Error updating document:', error);
      }
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
          <BackButton handleBack={handleBack}/>
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
  
    {/* Step 4: Other Expenses */}
    {step === 4 && (
      <View style={styles.stepContainer}>
        <OtherExpenses setOtherExpenses={setOtherExpenses} otherExpenses={otherExpenses}/>
        <View style={styles.navButtons}>
          <BackButton handleBack={handleBack}/>
          <NextButton handleNextStep={handleNextStep}/>
        </View>
      </View>
    )}
  
    {/* Step 5: Saving Goal */}
    {step === 5 && (
      <View style={styles.stepContainer}>
        <SavingGoal setSavingGoals={setSavingGoals} savingGoals={savingGoals}/>
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
  )
}