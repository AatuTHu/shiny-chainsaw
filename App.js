import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';
import Navigation from './services/Navigation'

export default function App() {

  const [page, setPage] = useState(0);
 
  return (
    <View style={styles.container}>

      <Navigation page = {page} setPage = {setPage}/>

      {/* this is example thing */}
      <View style={styles.navigationContainer}>
        <Button title="Page 1" onPress={() => setPage(0)} />
        <Button title="Page 2" onPress={() => setPage(1)} />
        <Button title="Page 3" onPress={() => setPage(2)} />
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
