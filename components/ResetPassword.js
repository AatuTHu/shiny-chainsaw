import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { useNavigation } from '../services/Navigation.js';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/auth.js'

export default function ResetPassword() {
    const { setNavigate } = useNavigation();
    const backToLogin = () => {
        setNavigate("AuthPage")
    }
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
                        />
                    </View>
                
                    <TouchableOpacity>
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