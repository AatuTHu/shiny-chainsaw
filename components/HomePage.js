import { View, Text, Button, StyleSheet } from 'react-native'
import { signOut, auth } from '../services/Firebase'
import React,{useState,useEffect} from 'react'

export default function HomePage ({setNavigate}) {

  const [user, setUser] = useState([])

  useEffect(() => {
    setUser(auth.currentUser)
  }, [])
  
  const SignOut = () => {
    signOut(auth).then(()=> {
      setNavigate(0)
    }).catch((e)=> {
      console.log(e)
    })
  }

  return (
    <View style={styles.container}>
      <Button style={styles.signOutButton} onPress={SignOut} title='Sign Out'/>
    </View>
  )
}

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