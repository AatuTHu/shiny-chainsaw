import { View, Text, Button, StyleSheet } from 'react-native'
import { signOut, auth } from '../services/Firebase'
import { useNavigation } from '../services/Navigation';
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomePage () {

  const [user, setUser] = useState([])
  const { setNavigate } = useNavigation()

  useEffect(() => {
    setUser(auth.currentUser)
  }, [])
  
  const SignOut = async() => {

    const isAnonymous = await AsyncStorage.getItem('isAnonymous')

    if(isAnonymous == "true") {
      await AsyncStorage.setItem('isAnonymous', 'false')
      setNavigate("AuthPage")
    } else {
      signOut(auth).then(()=> {
        setNavigate("AuthPage")
      }).catch((e)=> {
        console.log(e)
      })//catch
    }//else
  }//function

  return (
    <View style={styles.container}>
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
    signOutButton: {
        backgroundColor: '#f44336',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    }
});