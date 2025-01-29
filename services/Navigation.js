import {BackHandler} from 'react-native';
import { useState, useEffect, createContext, useContext } from 'react'

const NavigationContext = createContext()

export default function Navigation ({children}) {

  const [navigate, setNavigate] = useState("") // Used on other components for navigating
  const [history, setHistory] = useState([0]); // Maintain a order history of pages
  const [number, setNumber] = useState(0) // Index on what page to return from pages array
  const exitIndex = [0,2]// Index where back button exits app rather than navigates back
  const pages = []

    useEffect(() => {
      children.forEach((n) => {
        pages.push(n.type.name) // Store the page names in an array for easy access
      })
    }) // useEffect   
    
    useEffect(() => { // Update history whenever the page changes
     const n = pages.indexOf(navigate) // Finds index of given page
     if (n != -1) {
      setNumber(n)
     }
      if (history[history.length - 1] !== number) {
        setHistory([...history, number]); // Add the new page to the history array
      }
    }, [navigate]); // useEffect 
    
    useEffect(() => { // Handle hardware back button
      const backAction = () => {
        if (exitIndex.includes(number)) {
          BackHandler.exitApp(); // Exit the app if we're on the first page
        } else {
          const newHistory = [...history]; // Copy the history array
          newHistory.pop(); // Remove the current page from history
          setHistory(newHistory); // Update the history with the previous state
          setNumber(newHistory[newHistory.length - 1]); // Navigate to the previous page
          return true; // Prevent default back action
        }
      }; //function
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction); //Listen for hardware back button press
      return () => backHandler.remove(); // Clean up the event listener on component unmount
    }, [number, history]); // useEffect

    return (
      <NavigationContext.Provider value={{ setNavigate }}>
        {children[number]}
      </NavigationContext.Provider>
    )  
} //function

export const useNavigation = () => useContext(NavigationContext)