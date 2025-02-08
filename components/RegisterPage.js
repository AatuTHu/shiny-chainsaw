import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword, auth } from '../services/Firebase'
import { useNavigation } from '../services/Navigation';
import styles from '../styles/register'
export default function RegisterPage()  {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
        Alert.alert('Error', 'Failed to create account. Please try again.');
      })
    };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
    </TouchableWithoutFeedback>
  );
};