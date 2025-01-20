import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback, ActivityIndicator, Keyboard } from 'react-native'
import { auth, signInWithEmailAndPassword, signInAnonymously} from '../services/Firebase'
import React, {useState, useEffect} from 'react'
import Icon from '@expo/vector-icons/Ionicons'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '../services/Navigation';
import { makeTimeStamp } from '../services/TimeStamper'


export default function AuthPage() {

  const [email, setEmail] = useState('Example@email.com')
  const [password, setPassword] = useState('ExamplePassword')
  const [isLoading, setIsLoading] = useState(false)
  const { setNavigate } = useNavigation()

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
          console.log(error);
          Alert.alert('Error', 'Invalid email or password');
        });
    };
  
    const onContinueAnonymousPress = async() => {
      signInAnonymously(auth).then((creds) =>{
      setNavigate("StartPage");
    }).catch((error) => {
      console.log(error)
      Alert.alert('Error', 'Failed to sign in anonymously')
    })
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

      {/* Anonymous Sign In Button */}
      <TouchableOpacity onPress={onContinueAnonymousPress} style={styles.googleButton}>
        <Icon name="person" size={20} color="#fff" />
        <Text style={styles.googleButtonText}>Continue as guest</Text>
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  blur:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1, // Ensure blur view is on top of other content
  },
});