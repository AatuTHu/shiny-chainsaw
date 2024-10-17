import {BackHandler} from 'react-native';
import { useState, useEffect } from 'react'

export default function Navigation ({navigate, setNavigate, children}) {

    const [history, setHistory] = useState([0]); // Maintain a history of pages

    // Update history whenever the page changes
    useEffect(() => {
      if (history[history.length - 1] !== navigate) {
        setHistory([...history, navigate]); // Add the new page to the history stack
      }
    }, [navigate]); // useEffect
  
    // Handle hardware back button
    useEffect(() => {
      const backAction = () => {
        if (navigate === 0) {
          BackHandler.exitApp(); // Exit the app if we're on the first page
        } else {
          const newHistory = [...history]; // Copy the history array
          newHistory.pop(); // Remove the current page from history
          setHistory(newHistory); // Update the history with the previous state
          setNavigate(newHistory[newHistory.length - 1]); // Navigate to the previous page
          return true; // Prevent default back action
        }
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () => backHandler.remove(); // Clean up the event listener on component unmount
    }, [navigate, history]); // useEffect

    return children[navigate]   
} //function