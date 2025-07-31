import Navigation from './services/Navigation'
import Home from './components/HomePage'
import Start from  './components/StartPage'
import Edit from './components/EditPage'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {

  const [dataFound, setDataFound] = useState(false);

  useEffect(() => {
    const userFound =  AsyncStorage.getItem('USERINFO');
    if (userFound) {
      setDataFound(true)
    }
  },[])

    return (
      <Navigation>
        {dataFound ? <Home/> : <Start/>}
        <Home/>
        <Start/>
        <Edit/>
      </Navigation>
    )
  }