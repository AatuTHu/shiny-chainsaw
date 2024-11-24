import React, { useState, useRef } from 'react';
import {View, TextInput, Text, Animated, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function StartPage({ setNavigate }) {
  const totalInputs = 5;
  const titles = [
    "Income per month:",
    "Living expenses (rent, bills, etc.) per month:",
    "Amount of debt:",
    "Emergency fund:",
    "Saving goal:",
  ]; // Titles for each input

  const [inputValues, setInputValues] = useState(Array(totalInputs).fill(0)); // Array to store input values
  const [currentInputIndex, setCurrentInputIndex] = useState(0); // Current active input
  const [allCompleted, setAllCompleted] = useState(false); // Flag to hide the middle input
  const animatedPosition = useRef(new Animated.Value(0)).current; // Animation for moving inputs
  const fadeAnim = useRef(new Animated.Value(1)).current; // Animation for fading out

  const handleInputComplete = () => {
    if (inputValues[currentInputIndex].trim().length > 0) {
      // Animate the current input to move to the top
      Animated.timing(animatedPosition, {
        toValue: -200 * (currentInputIndex + 1), // Adjust position to stack inputs
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (currentInputIndex + 1 < totalInputs) {
          // If not the last input, proceed to the next input
          setCurrentInputIndex((prevIndex) => prevIndex + 1);
        } else {
          // Mark all inputs as completed
          setAllCompleted(true);
        }
        // Reset animations for the next input
        animatedPosition.setValue(0);
        fadeAnim.setValue(1);
      });
    }
  };

  const handleInputChange = (text) => {
    const newValues = [...inputValues];
    newValues[currentInputIndex] = text;
    setInputValues(newValues);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Display completed inputs at the top */}
      <View style={styles.completedContainer}>
        {inputValues.slice(0, currentInputIndex + (allCompleted ? 1 : 0)).map((value, index) => (
          <View key={index} style={styles.completedInput}>
            <Text style={styles.completedLabel}>{titles[index]}</Text>
            <Text style={styles.completedValue}>{value}</Text>
          </View>
        ))}
      </View>

      {/* Current input field */}
      {!allCompleted && (
        <Animated.View
          style={[
            styles.inputContainer,
            {
              transform: [{ translateY: animatedPosition }],
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.label}>{titles[currentInputIndex]}</Text>
          <TextInput
            value={inputValues[currentInputIndex]}
            onChangeText={handleInputChange}
            onBlur={handleInputComplete} // Trigger animation on blur
            placeholder={titles[currentInputIndex]}
            placeholderTextColor="#888"
            keyboardType='numeric'
            style={styles.input}
          />
        </Animated.View>
      )}

        {allCompleted && (
        <TouchableOpacity onPress={() => setNavigate(3)} style={styles.nextPageButton}>
            <LinearGradient
                colors={['#0F3544', '#33E49C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
            >
            <Text style={styles.signInButtonText}>Next Page</Text>
            </LinearGradient>
        </TouchableOpacity>
        )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e14',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  inputContainer: {
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#2a2a3d',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#2a2a3d',
    color: '#fff',
  },
  completedContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  completedInput: {
    marginBottom: 10,
  },
  completedLabel: {
    fontSize: 14,
    color: '#888',
  },
  completedValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
  nextPageButton:{
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    padding: 15,
  },
});
