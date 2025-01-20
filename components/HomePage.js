import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native'
import { signOut, auth, USERINFO,query,collection,db,where,onSnapshot } from '../services/Firebase'
import { useNavigation } from '../services/Navigation';
import React,{useState,useEffect} from 'react'
import { calculateSavings } from '../services/Calculator';

export default function HomePage () {

  const [userData, setUserData] = useState([])
  const [visible, setVisible] = useState(false)
  const [amount, setAmount] = useState(0)
  const { setNavigate } = useNavigation()

  useEffect(() => {
    const q = query(collection(db,USERINFO), where("uid", "==", auth.currentUser.uid))
    const queryUserData = onSnapshot(q,(querySnapshot) => {
      const tempData = []

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
      tempData[0].amonutSaved = calculateSavings(tempData[0], '20.2.2025') // string is for simulating to a date
      setUserData(tempData)
    })

    return () => {
      queryUserData()
    }

  }, [])

  const addTransaction = (type) => {
    setVisible(false)
  }
  
  const SignOut = async() => {
    signOut(auth).then(()=> {
      setNavigate("AuthPage")
    }).catch((e)=> {
      console.log(e)
    })//catch
  }//function

return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      data={userData}
      renderItem={({item, i}) => {
        return (
          <View key={i} style={styles.dataContainer}>
            <Text style={styles.labelText}>Amount Saved:</Text>
            <Text style={styles.text}>{item.amountSaved} $</Text>
            <Text style={styles.labelText}>Savings Goal:</Text>
            <Text style={styles.text}>{item.savingGoal} $</Text>

        {item.salary && item.salary.length > 0 && (
          <>
            <Text style={styles.labelText}>Salary:</Text>
            <Text style={styles.text}>{item.salary.salary} $</Text>
          </>
        )}

        {item.otherIncomes && item.otherIncomes.length > 0 && ( // Only show other income if there are any
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

        { item.expenses && (<>
        <Text style={styles.labelText}>Housing:</Text>
        <Text style={styles.text}>{item.expenses.housing} $</Text>

        <Text style={styles.labelText}>Transportation:</Text>
        <Text style={styles.text}>{item.expenses.transportation} $</Text>
        
        <Text style={styles.labelText}>Groceries:</Text>
        <Text style={styles.text}>{item.expenses.groceries} $</Text>
        </>)}

        {item.bills.length > 0 && (<>
          <Text style={styles.labelText}>Bills:</Text>
          {item.bills && item.bills.map((bill, index) => (
            <View key={`bill-${index}`}>
              <Text style={styles.text}>{bill.name} {bill.amount} $ {bill.frq}</Text>
            </View>
          ))}
        </>)}

        {item.debts.length > 0 &&(<>
              <Text style={styles.labelText}>Debts:</Text>
              {item.debts && item.debts.map((debt, index) => (
                <View key={`debt-${index}`}>
                  <Text style={styles.text}>{debt.name} {debt.amount} $ {debt.frq} {debt.payment}</Text>
                </View>
              ))}
        </>)}

          {item.emergencyFunds && 
          <>
            <Text style={styles.labelText}>Emergency Fund:</Text>
            <Text style={styles.text}>{item.emergencyFunds.emergencyFund} $</Text>
            <Text style={styles.labelText}>Emergency Goal:</Text>
            <Text style={styles.text}>{item.emergencyFunds.emergencyGoal} $</Text>
          </>}
          </View>
        )
      }}
      />

      {visible && 
        <View style={styles.transactionPopUp}>
        <TextInput style={styles.dataContainer}
        value={amount}
        onChangeText={text => setAmount(text)}/>
        <Button style={styles.signOutButton} onPress={() => addTransaction()} title='Complete'/>    
        </View>
      }
      
      <Button style={styles.signOutButton} onPress={() => setVisible(!visible)} title='Add Income'/>
      <Button style={styles.signOutButton} onPress={() => setVisible(!visible)} title='Add Payment'/>
      <Button style={styles.signOutButton} onPress={SignOut} title='Sign Out'/>
    </View>
  )
} //component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
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