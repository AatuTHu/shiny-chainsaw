import { View, Text,Button } from 'react-native'
import { registerUser, signInUser } from '../services/Firebase'
import React, {useState} from 'react'

const AuthPage = () => {

  const [email, setEmail] = useState('Example@email.com')
  const [password, setPassword] = useState('ExamplePassword')

  const onRegisterPress = () => { 
    const response = registerUser(email, password)
    if( response === false) {
      console.log("jotain error messagea")
    } else {
      console.log("Onnistuit")
    }
  }

  const onSignInPress = () => {
    const response = signInUser(email, password)
    if( response === false) {
      console.log("jotain error messagea")
    } else {
      console.log("Onnistuit")
    }
  }

  return (
    <View>
      <Text>AuthPage</Text>
      <Button onPress={onRegisterPress} title={"Register"}/>
      <Button onPress={onSignInPress} title={"Sign In"}/>
    </View>
  )
}

export default AuthPage