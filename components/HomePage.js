import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import { signOut, auth, USERINFO,query,collection,db,where,onSnapshot } from '../services/Firebase'
import { useNavigation } from '../services/Navigation';
import React,{useState,useEffect} from 'react'

export default function HomePage () {

  const [userData, setUserData] = useState([])
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
          uid: doc.data().uid,
        }
        tempData.push(object)
      })
      console.log(tempData)
      setUserData(tempData)
    })

    return () => {
      queryUserData()
    }

  }, [])
  
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
      data={userData}
      renderItem={({item, i}) => {
        return (
          <View key={i} style={styles.dataContainer}>
            <Text style={styles.labelText}>Amount Saved:</Text>
            <Text style={styles.text}>{item.amountSaved} $</Text>
            <Text style={styles.labelText}>Savings Goal:</Text>
            <Text style={styles.text}>{item.savingGoal} $</Text>

        <Text style={styles.labelText}>Salary:</Text>
        <Text style={styles.text}>{item.salary.salary}$ {item.salary.frq}</Text>

        <Text style={styles.labelText}>Other Incomes:</Text>
        {item.otherIncomes && item.otherIncomes.map((otherIncomes, index) => (
          <View key={`inc-${index}`}>
            <Text style={styles.text}>{otherIncomes.name} {otherIncomes.amount} $</Text>
          </View>
        ))}

          <Text style={styles.labelText}>Housing:</Text>
          <Text style={styles.text}>{item.expenses.housing} $</Text>

          <Text style={styles.labelText}>Transportation:</Text>
          <Text style={styles.text}>{item.expenses.transportation} $</Text>
          
          <Text style={styles.labelText}>Groceries:</Text>
          <Text style={styles.text}>{item.expenses.groceries} $</Text>


        <Text style={styles.labelText}>Bills:</Text>
        {item.bills && item.bills.map((bill, index) => (
          <View key={`bill-${index}`}>
            <Text style={styles.text}>{bill.name} {bill.amount} $ {bill.frq}</Text>
          </View>
        ))}

        <Text style={styles.labelText}>Debts:</Text>
        {item.debts && item.debts.map((debt, index) => (
          <View key={`debt-${index}`}>
            <Text style={styles.text}>{debt.name} {debt.amount} $ {debt.frq}</Text>
          </View>
        ))}
        
          <Text style={styles.labelText}>Emergency Fund:</Text>
          <Text style={styles.text}>{item.emergencyFunds.emergencyFund} $</Text>
          <Text style={styles.labelText}>Emergency Goal:</Text>
          <Text style={styles.text}>{item.emergencyFunds.emergencyGoal} $</Text>
          </View>
        )
      }}
      />
      <Button style={styles.signOutButton} onPress={SignOut} title='Sign Out'/>
    </View>
  )
} //component

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0e0e14',
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    dataContainer:{
      marginTop: 20,
    },
    signOutButton: {
        backgroundColor: '#f44336',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    text:{
      color: '#fff',
      fontSize: 16,
    },
    labelText:{
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    }
});