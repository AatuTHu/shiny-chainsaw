import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button, BackHandler } from 'react-native';
import { useState, useEffect } from 'react'
import Page1 from './components/Page1'
import Page2 from './components/Page2'
import Page3 from './components/Page3'

export default function App() {

  const [page, setPage] = useState(1)
  const [prevPage, setPrevPage] = useState(1)

  useEffect(() => {
    if (prevPage !== page) {
      setPrevPage(page);
    }
  }, [page])

  useEffect(() => {
    // Function to handle the back button press
    const backAction = () => {
      if(page == 1) {
        BackHandler.exitApp()
      } else if (page === prevPage) {
        setPage(1)
        return true; // Return `true` to prevent default back action
      } else {
        setPage(prevPage)
        return true; // Return `true` to prevent default back action
      }

    };

    // Add event listener for back press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, [page, prevPage]);

  

  const navigator = () => {
    // Implement navigation logic here
    // For example, navigate to a new screen or route
   switch (page) {
    case 1:
      return <Page1/>
    case 2:
      return <Page2/>
    case 3:
      return <Page3/>
    default:
      return <Page1 />;
   }
  }
 
  return (
    <View style={styles.container}>
      {navigator()}
      <Button title="Page 1" onPress={() => setPage(1)} />
      <Button title="Page 2" onPress={() => setPage(2)} />
      <Button title="Page 3" onPress={() => setPage(3)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
