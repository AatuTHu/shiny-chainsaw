import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import { auth } from './services/Firebase';
import { useState, useEffect } from 'react';
import Navigation from './services/Navigation'
import AuthPage from './components/AuthPage';
import RegisterPage from './components/RegisterPage'
import Page3 from './examplePages/Page3'

export default function App() {

  const [navigate, setNavigate] = useState(0)
  const [loggedIn, setLoggedIn] = useState(true)
  const [currentUser, setCurrentUser] = useState([])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        setCurrentUser(user)
        setLoggedIn(false)
      }
    })
    return unsubscribe
  }, [])
  
  /* if(loggedIn) {
  return <AuthPage/> 
  } else {
  return (
    <View style={styles.container}>
      <Navigation setNavigate = {setNavigate} navigate = {navigate}>
        <Page1/>
        <Page2/>
        <Page3/>
      </Navigation>
    
      <View style={styles.navigationContainer}>
        <Button title="Page 1" onPress={() => setNavigate(0)} />
        <Button title="Page 2" onPress={() => setNavigate(1)} />
        <Button title="Page 3" onPress={() => setNavigate(2)} />
      </View>
    
      <StatusBar style="auto" />
    </View>
  )} */

    return (
      <Navigation setNavigate={setNavigate} navigate={navigate}>
        <AuthPage setNavigate={setNavigate} />
        <RegisterPage setNavigate={setNavigate} />
      </Navigation>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navigationContainer:{
    flexDirection: 'row',
    float:'bottom',
    justifyContent: 'space-around',
    marginBottom: 20,
  }
});
