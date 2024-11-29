import {BackHandler} from 'react-native';
import { useState, useEffect, createContext, useContext } from 'react'

const NavigationContext = createContext()

export default function Navigation ({children}) {

  const [navigate, setNavigate] = useState("")
  const [history, setHistory] = useState([0]); // Maintain a history of pages
  const [number, setNumber] = useState(0)
  const pages = []

    useEffect(() => {
      children.forEach((n) => {
        pages.push(n.type.name) // Store the page names in an array for easy access
      })
    })

    // Update history whenever the page changes
    useEffect(() => {

     const n = pages.indexOf(navigate)
     if (n != -1) {
      setNumber(n)
     }

      if (history[history.length - 1] !== number) {
        setHistory([...history, number]); // Add the new page to the history stack
      }
    }, [navigate]); // useEffect
  
    // Handle hardware back button
    useEffect(() => {
      const backAction = () => {
        if (number ===  0) {
          BackHandler.exitApp(); // Exit the app if we're on the first page
        } else {
          const newHistory = [...history]; // Copy the history array
          newHistory.pop(); // Remove the current page from history
          setHistory(newHistory); // Update the history with the previous state
          setNumber(newHistory[newHistory.length - 1]); // Navigate to the previous page
          return true; // Prevent default back action
        }
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () => backHandler.remove(); // Clean up the event listener on component unmount
    }, [number, history]); // useEffect

    return (
      <NavigationContext.Provider value={{ setNavigate }}>
        {children[number]}
      </NavigationContext.Provider>
    )  
} //function

export const useNavigation = () => useContext(NavigationContext)