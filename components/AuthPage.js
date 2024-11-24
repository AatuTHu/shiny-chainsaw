import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { auth, signInWithEmailAndPassword, signInAnonymously} from '../services/Firebase'
import React, {useState} from 'react'
import Icon from '@expo/vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient';

export default function AuthPage({ setNavigate }) {

  const [email, setEmail] = useState('Example@email.com')
  const [password, setPassword] = useState('ExamplePassword')

  const onSignInPress = () => {
    signInWithEmailAndPassword(auth, email, password).then((creds) =>{

    }).catch((error) => {
      console.log(error)
      Alert.alert('Error', 'Invalid email or password')
    })
  }

  const onContinueAnonymousPress = () => {
    signInAnonymously(auth).then((creds) =>{

    }).catch((error) => {
      console.log(error)
      Alert.alert('Error', 'Failed to sign in anonymously')
    })
  }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Sign In</Text>

    {/* Email Input */}
    <View style={styles.inputContainer}>
      <Icon name="person" size={20} color="#fff" style={styles.icon} />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
      />
    </View>

    {/* Password Input */}
    <View style={styles.inputContainer}>
      <Icon name="key" size={20} color="#fff" style={styles.icon} />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.input}
      />
    </View>

    {/* Forgot Password */}
    <TouchableOpacity style={styles.forgotPassword}>
      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
    </TouchableOpacity>

    {/* Sign In Button */}
    <TouchableOpacity onPress={onSignInPress}>
      <LinearGradient
        colors={['#0F3544', '#33E49C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientButton}
      >
        <Text style={styles.signInButtonText}>Sign In</Text>
      </LinearGradient>
    </TouchableOpacity>

    {/* Divider Text */}
    <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
        <Text style={styles.orText}>Or Sign In With</Text>
      <View style={styles.dividerLine} />
    </View>

    {/* Google Sign In Button */}
    <TouchableOpacity style={styles.googleButton}>
      <Icon name="logo-google" size={20} color="#fff" />
      <Text style={styles.googleButtonText}>Google</Text>
    </TouchableOpacity>

    {/* Anonymous Sign In Button */}
    <TouchableOpacity onPress={onContinueAnonymousPress} style={styles.googleButton}>
      <Icon name="person" size={20} color="#fff" />
      <Text style={styles.googleButtonText}>Continue as guest</Text>
    </TouchableOpacity>

    {/* Sign Up Section */}
    <View style={styles.signUpContainer}>
      <Text style={styles.signUpText}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => setNavigate(1)} >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e14',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a3d',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    height: 50,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 16,
  },
  gradientButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
  orText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#44475a',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#fff',
    fontSize: 20,
  },
  signUpButtonText: {
    color: '#4caf50',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
