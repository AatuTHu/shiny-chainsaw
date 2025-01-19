import { Text,TouchableOpacity } from 'react-native'
import styles from '../../styles/startPage'
import React from 'react'

const NextButton = ({handleNextStep}) => {
  return (
        <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextStep}
        >
            <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
  )
}

const BackButton = ({setStep,step}) => {
    return (
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => setStep(step-1)}
        >
            <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
    )
}

const FinishButton = ({handleFinish}) => {
    return (
        <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinish}
        >
            <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
    )
}

export { NextButton, BackButton, FinishButton }