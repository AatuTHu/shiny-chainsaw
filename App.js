import { StyleSheet,View,Text } from 'react-native';
import { auth } from './services/Firebase';
import { useState, useEffect } from 'react';
import Navigation from './services/Navigation'
import AuthPage from './components/AuthPage';
import RegisterPage from './components/RegisterPage'
import HomePage from './components/HomePage'

export default function App() {

  const [navigate, setNavigate] = useState(0)
  const [currentUser, setCurrentUser] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        setCurrentUser(user)
        setLoading(false)
        setNavigate(2)
      } else {
        setLoading(false)
        setNavigate(0) // User not logged in. Go to AuthPage.
      }
    })
    return unsubscribe
  }, [])

  if(loading == true) {
    return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
    )} else {
    return (
      <Navigation setNavigate={setNavigate} navigate={navigate}>
        <AuthPage setNavigate={setNavigate} />
        <RegisterPage setNavigate={setNavigate}/>
        <HomePage setNavigate={setNavigate} currentUser={currentUser}/>
      </Navigation>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e14',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize:20,
    color: '#fff',
  }
});
