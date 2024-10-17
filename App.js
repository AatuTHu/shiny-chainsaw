import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';
import Navigation from './services/Navigation'
import Page1 from './examplePages/Page1'
import Page2 from './examplePages/Page2'
import Page3 from './examplePages/Page3'

export default function App() {

  const [navigate, setNavigate] = useState(0)
  
  return (
    <View style={styles.container}>

      {/* This component renders pages*/}
    <Navigation setNavigate = {setNavigate} navigate = {navigate}>
      <Page1/>
      <Page2/>
      <Page3/>
    </Navigation>

      {/* this is example navbar */}
    <View style={styles.navigationContainer}>
      <Button title="Page 1" onPress={() => setNavigate(0)} />
      <Button title="Page 2" onPress={() => setNavigate(1)} />
      <Button title="Page 3" onPress={() => setNavigate(2)} />
    </View>
      <StatusBar style="auto" />
    </View>
  );
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
