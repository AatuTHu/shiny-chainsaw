import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback, ActivityIndicator, Keyboard } from 'react-native'
import { auth, signInWithEmailAndPassword, signInAnonymously} from '../services/Firebase'
import React, {useState, useEffect} from 'react'
import Icon from '@expo/vector-icons/Ionicons'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '../services/Navigation';
import { useFonts } from "expo-font";
import styles from '../styles/auth.js'


export default function AuthPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setNavigate } = useNavigation()
  const [fontsLoaded] = useFonts({
    "Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf"),
  });


  useEffect(() => {
    const isLoggedIn = async() => {
      auth.onAuthStateChanged(user => {
        if(user) { 
          setNavigate("HomePage")
        } else { 
          setNavigate("AuthPage")
        }
      })//auth
    }//function
    isLoggedIn()
    }, [])

    const onSignInPress = () => {
      setIsLoading(true);
      
      // Timeout to see the fancy blur and activity indicator
      const timeout = setTimeout(() => {
        setIsLoading(false);
        Alert.alert('Error', 'Login timed out. Please try again.');
      }, 5000);
      
      // Sign-in with Firebase
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          clearTimeout(timeout);  // Clear the timeout if sign-in is successful
          setIsLoading(false);
          setNavigate("HomePage");
        })
        .catch((error) => {
          clearTimeout(timeout);  // Clear the timeout if there's an error
          setIsLoading(false);
          Alert.alert('Error', 'Invalid email or password');
        });
    };
  
    const onContinueAnonymousPress = async() => {

      setIsLoading(true);
      
      const timeout = setTimeout(() => {
        setIsLoading(false);
        Alert.alert('Error', 'Login timed out. Please try again.');
      }, 5000);

      signInAnonymously(auth).then(() =>{
        clearTimeout(timeout);  // Clear the timeout if sign-in is successful
        setIsLoading(false);
        setNavigate("StartPage");
    }).catch(() => {
      Alert.alert('Error', 'Failed to sign in anonymously')
    })
    }

    const onResetPassword = () => {
      setNavigate("ResetPassword");
    }

    if (!fontsLoaded) {
      return null;
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {isLoading && (
          <BlurView intensity={100} tint='dark' style={styles.blur}>
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#4285F4" />
              <Text style={styles.loaderText}>Logging in...</Text>
            </View>
          </BlurView>
        )}
      <Text style={styles.title}>BudJet</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#fff" style={styles.icon} />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
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
      <TouchableOpacity onPress={onResetPassword} style={styles.forgotPassword}>
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

      {/* Anonymous Sign In Button */}
      <TouchableOpacity onPress={onContinueAnonymousPress} style={styles.anonButton}>
      <LinearGradient
          colors={['#f6b93b', '#fae596']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.anonButtonText}>Continue as guest</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Sign Up Section */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => setNavigate("RegisterPage")} >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableWithoutFeedback>
  )
};
