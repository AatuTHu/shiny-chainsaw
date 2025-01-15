import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword, auth } from '../services/Firebase'
import { useNavigation } from '../services/Navigation';



export default function RegisterPage()  {

    const [email, setEmail] = useState('Example@email.com')
    const [password, setPassword] = useState('ExamplePassword')
    const [confirmPassword, setConfirmPassword] = useState('');
    const { setNavigate } = useNavigation()

    // Function to handle registration with email validation
    const handleRegister = () => {
        // Email regex pattern for validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
        }

        if (password !== confirmPassword) {
        Alert.alert('Password Mismatch', 'Passwords do not match!');
        return;
        }

        if (password.length < 6) {
        Alert.alert('Weak Password', 'Password should be at least 6 characters long.');
        return;
      }
      
      // If all validations pass
      createUserWithEmailAndPassword(auth, email, password).then(() =>{
        setNavigate("StartPage")
      }).catch((error) => {
        console.log(error)
        Alert.alert('Error', 'Failed to create account. Please try again.');
      })
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>

      {/* Create Account Button */}
      <TouchableOpacity onPress={handleRegister} style={styles.createAccountButton}>
        <LinearGradient
          colors={['#0F3544', '#33E49C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.createAccountButtonText}>Create Account</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Link to Sign In */}
      <View style={styles.signInLinkContainer}>
        <Text style={styles.signInText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => setNavigate("AuthPage")} >
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e14',
    paddingHorizontal: 20,
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
  createAccountButton: {
    width: '100%',
    borderRadius: 25,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gradientButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signInLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    color: '#fff',
    fontSize: 20,
  },
  signInLink: {
    color: '#4caf50',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});