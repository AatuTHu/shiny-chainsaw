import { View, SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert,FlatList } from 'react-native'
import styles from '../styles/startPage.js'
import React, { useState, useEffect } from 'react'
import { auth, USERINFO, query, collection, db, where, onSnapshot,setDoc,doc} from '../services/Firebase.js'
import { useNavigation } from '../services/Navigation';
import { BackButton,FinishButton,MenuButton,NextButton } from './reusables/StepButtons.js'
import Incomes from './reusables/Incomes.js'
import Debts from './reusables/Debts.js'
import SavingGoal from './reusables/SavingGoal.js'
import LivingExpenses from './reusables/LivingExpenses.js'
import Summary from './reusables/Summary.js'
import OtherExpenses from './reusables/OtherExpenses.js';

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
    const q = query(collection(db, USERINFO), where("uid", "==", auth.currentUser.uid));
    const queryUserData = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();   
        const { bills, debts, otherExpenses, expenses, salary, savingGoal, otherIncomes, timeStamp, balance } = docData;   
    
        setDocId(querySnapshot.docs[0].id);
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
    });
    return () => {
      queryUserData();
    };
  }, []);
    

  const handleBack = () => {
    if(step === 1) setNavigate("HomePage")
    else if(step > 1) setStep(1)
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
        Alert.alert("Error updating. Try again later..")
      }
      setNavigate("HomePage")
    }

    const menuItems = [
      { id: "1", title: "Incomes", value: 2 },
      { id: "2", title: "LivingExpenses", value: 3 },
      { id: "3", title: "Debts", value: 4 },
      { id: "4", title: "Other Expenses", value: 5 },
      { id: "5", title: "Savings Goal", value: 6 },
    ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
    {/*Step 1: Main menu*/}
    {step === 1 && (
    <View style={styles.menuContainer}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.menuRowContainer}
        renderItem={({ item }) => (
          
            <MenuButton emoji={item.title} handlePress={setStep} value={item.value} />
          
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