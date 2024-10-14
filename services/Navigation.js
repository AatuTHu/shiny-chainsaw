import {BackHandler} from 'react-native';
import { useState, useEffect } from 'react'
import Page1 from '../examplePages/Page1'
import Page2 from '../examplePages/Page2'
import Page3 from '../examplePages/Page3'

const Navigation = ({page, setPage}) => {

    const [history, setHistory] = useState([1]); // Maintain a history of pages
    const pages = [<Page1/>, <Page2/>, <Page3/>]

    // Update history whenever the page changes
    useEffect(() => {
      if (history[history.length - 1] !== page) {
        setHistory([...history, page]); // Add the new page to the history stack
      }
    }, [page]);
  
    // Handle hardware back button
    useEffect(() => {
      const backAction = () => {
        if (page === 0) {
          BackHandler.exitApp(); // Exit the app if we're on the first page
        } else {
          const newHistory = [...history]; // Copy the history array
          newHistory.pop(); // Remove the current page from history
          setHistory(newHistory); // Update the history with the previous state
          setPage(newHistory[newHistory.length - 1]); // Navigate to the previous page
          return true; // Prevent default back action
        }
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () => backHandler.remove(); // Clean up the event listener on component unmount
    }, [page, history]);

  if (page === undefined) { 
        return pages[0] 
    } else { 
        return pages[page]
    } 
}

export default Navigation