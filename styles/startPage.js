import { StyleSheet } from "react-native";

export default StyleSheet.create({
     container: {
      flex: 1,
      backgroundColor: '#0e0e14',
      padding: 20,
    },
    stepContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontSize: 18,
      color: '#fff',
      marginVertical: 10,
      textAlign: 'center',
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#444',
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: '#2a2a3d',
      color: '#fff',
      marginVertical: 10,
    },
    dropdownButton: {
      width: '100%',
      height: 50,
      backgroundColor: '#2a2a3d',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginVertical: 10,
    },
    dropdownText: {
      color: '#fff',
      fontSize: 16,
    },
    addButton: {
      backgroundColor: '#28a745',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    billItem: {
      color: '#fff',
      fontSize: 16,
      marginVertical: 5,
    },
    navButtons: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 20,
      width: '100%',
    },
    backButton: {
      backgroundColor: '#ff1100',
      padding: 10,
      borderRadius: 5,
      width: '45%',
      alignItems: 'center',
    },
    backButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    nextButton: {
      backgroundColor: '#1e90ff',
      padding: 10,
      borderRadius: 5,
      width: '45%',
      alignItems: 'center',
    },
    nextButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modal: {
      backgroundColor: '#2a2a3d',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    modalTitle: {
      fontSize: 18,
      color: '#fff',
      marginBottom: 20,
    },
    modalItem: {
      paddingVertical: 10,
    },
    modalOptionText: {
      color: '#fff',
      fontSize: 16,
    },
    modalCloseButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#ff6347',
      borderRadius: 5,
    },
    modalCloseText: {
      color: '#fff',
      textAlign: 'center',
    },
    summaryContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    summaryTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
      textAlign: 'center',
    },
    summaryItem: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginVertical: 5,
      width: '100%',
    },
    summaryLabel: {
      fontSize: 16,
      color: '#aaa',
      fontWeight: '600',
    },
    summaryValue: {
      fontSize: 16,
      color: '#fff',
    },
    finishButton: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      width: '45%',
      alignItems: 'center',
    },
    finishButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },  
    billListContainer: {
      maxHeight: 200,
      width: '80%',
      marginVertical: 10,
      overflow: 'hidden',
    },
  });