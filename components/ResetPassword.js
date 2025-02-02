import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, {useState} from 'react'
import { auth,sendPasswordResetEmail } from '../services/Firebase.js';
import { useNavigation } from '../services/Navigation.js';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/auth.js'

export default function ResetPassword() {
    const { setNavigate } = useNavigation();
    const [email, setEmail] = useState('');

    const backToLogin = () => {
        setNavigate("AuthPage")
    }

    
  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth,email);
      Alert.alert('Password Reset Email Sent', 'Check your email for the reset link');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid Email', 'Please enter a valid email address');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('User Not Found', 'No user found with this email address');
      } else {
        console.log(error)
        Alert.alert('Error', 'Something went wrong. Please try again later');
      }
    }
  };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.pwContainer}>
                    <Text style={styles.pwTitle}>Reset Your Password</Text>
                
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#fff"
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                
                    <TouchableOpacity
                        onPress={handlePasswordReset}
                    >
                        <LinearGradient
                            colors={['#0F3544', '#33E49C']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.signInButtonText}>Send Reset Link</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={backToLogin} style={styles.forgotPwHelper}>
                        <Text style={styles.forgotPasswordText}>Back to Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
  };