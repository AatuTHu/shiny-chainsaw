import { Text,TouchableOpacity } from 'react-native'
import styles from '../../styles/startPage'
import React from 'react'

const NextButton = ({handleNextStep, title}) => {
  if(title === undefined) title = 'Next'
  return (
        <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextStep}
        >
            <Text style={styles.nextButtonText}>{title}</Text>
        </TouchableOpacity>
  )
}

const BackButton = ({handleBack,title}) => {
    if(title === undefined) title = 'Back'
    return (
        <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
        >
            <Text style={styles.backButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const SkipButton = ({handleSkip, title}) => {
    if(title === undefined) title = 'Skip'
    return (
        <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
        >
            <Text style={styles.skipButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const FinishButton = ({handleFinish, title}) => {
    if(title === undefined) title = 'Finish'
    return (
        <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinish}
        >
            <Text style={styles.finishButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export { NextButton, BackButton, FinishButton, SkipButton }