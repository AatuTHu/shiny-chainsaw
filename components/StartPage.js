import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
export default function StartPage() {
  const [step, setStep] = useState(1);

  const [salary, setSalary] = useState('');
  const [salaryFrq, setSalaryFrq] = useState('Monthly');
  const [salaryFrqVisible, setSalaryFrqVisible] = useState(false);

  const [livingExpenses, setLivingExpenses] = useState('');

  const [bills, setBills] = useState([]);
  const [billName, setBillName] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [billFrq, setBillFrq] = useState('Monthly');
  const [billFrqVisible, setBillFrqVisible] = useState(false);

  const [debts, setDebts] = useState([]);
  const [debtName, setDebtName] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [debtPaymentFrq, setDebtPaymentFrq] = useState('Monthly');
  const [debtPayment, setDebtPayment] = useState('');
  const [debtFrqVisible, setDebtFrqVisible] = useState(false);

  const [emergencyFund, setEmergencyFund] = useState('');
  const [emergencyGoal, setEmergencyGoal] = useState('');

  const [savingGoal, setSavingGoal] = useState('');
  
  const frequencies = ['Weekly', 'Bi-Weekly', 'Monthly']; // May need to add more options

  // Show inputfields step by step
  const handleNextStep = () => {
    switch (step) {
      case 1:
        if(salary !== ''){
          setStep(2);
        }
        break;
      case 2:
        if(livingExpenses!== ''){
          setStep(3);
        }
        break;
      case 3:
        handleAddBill();
        setStep(4);
        break;
      case 4:
        handleAddDebt();
        setStep(5);
        break;
      case 5:
        if (emergencyFund !== '' && emergencyGoal !== ''){
          setStep(6);
        }
        break;
      case 6:
        if(savingGoal !== ''){
          setStep(7);
        }
        break;
      case 7:
        console.log('Final confirmation submitted!');
        break;
      default:
        console.log('Reached last step');
        break;
    }
  };

  const handleStepBack = () => {
    setStep(step-1);
  };

  //Create a new item to the list of bills
  const handleAddBill = () => {
    if(billName.trim() && billAmount.trim()){
      setBills([...bills, {name: billName, amount: billAmount, frq: billFrq}]);
      setBillName('');
      setBillAmount('');
      setBillFrq('Monthly');
    }
  };

  const handleAddDebt = () => {
    if(debtName.trim() && debtAmount.trim()){
      setDebts([...debts, {name: debtName, amount: debtAmount, payment: debtPayment, frq: debtPaymentFrq}]);
      setDebtName('');
      setDebtAmount('');
      setDebtPayment('');
      setDebtPaymentFrq('Monthly');
  }
}

  // Create a pop-up to select payment frequency
  const renderFrqModal = (visible, setVisible, selectedValue, setSelectedValue) => (
    <Modal
      transparent
      visible={visible}
      animationType='slide'
      onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Select Frequency</Text>
            <FlatList
              data={frequencies}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedValue(item);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  )

  return (
    <SafeAreaView style={styles.container}>

      {/* Step 1: Salary */}
      {step === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>Enter your salary:</Text>
          <TextInput
            style={styles.input}
            placeholder="Salary amount"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={salary}
            onChangeText={(text) => setSalary(text)}
          />
          <Text style={styles.label}>How often is your salary paid?</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setSalaryFrqVisible(true)}
          >
            <Text style={styles.dropdownText}>{salaryFrq}</Text>
          </TouchableOpacity>
          {renderFrqModal(
            salaryFrqVisible,
            setSalaryFrqVisible,
            salaryFrq,
            setSalaryFrq
          )}
          <View style={styles.navButtons}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextStep}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
  
      {/* Step 2: Living Expenses */}
      {step === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>Living expenses:</Text>
          <TextInput
            style={styles.input}
            placeholder="Monthly living expenses"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={livingExpenses}
            onChangeText={(text) => setLivingExpenses(text)}
          />
          <View style={styles.navButtons}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleStepBack}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextStep}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
  
      {/* Step 3: Recurring Bills */}
      {step === 3 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>Add a recurring bill:</Text>
          <TextInput
            style={styles.input}
            placeholder="Bill name"
            placeholderTextColor="#888"
            value={billName}
            onChangeText={(text) => setBillName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Bill amount"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={billAmount}
            onChangeText={(text) => setBillAmount(text)}
          />
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setBillFrqVisible(true)}
          >
            <Text style={styles.dropdownText}>{billFrq}</Text>
          </TouchableOpacity>
          {renderFrqModal(
            billFrqVisible,
            setBillFrqVisible,
            billFrq,
            setBillFrq
          )}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddBill}
          >
            <Text style={styles.addButtonText}>Add Bill</Text>
          </TouchableOpacity>
          <View style={styles.billListContainer}>
            <FlatList
              data={bills}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.billItem}>
                  {item.name}: ${item.amount} ({item.frq})
                </Text>
              )}
            />
          </View>
          <View style={styles.navButtons}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleStepBack}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextStep}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
  
      {/* Step 4: Debt Details */}
      {step === 4 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>Debt:</Text>
          <TextInput
            style={styles.input}
            placeholder="Debt name"
            placeholderTextColor="#888"
            value={debtName}
            onChangeText={(text) => setDebtName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Debt amount"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={debtAmount}
            onChangeText={(text) => setDebtAmount(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Debt repayment amount"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={debtPayment}
            onChangeText={(text) => setDebtPayment(text)}
          />
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDebtFrqVisible(true)}
          >
            <Text style={styles.dropdownText}>{debtPaymentFrq}</Text>
          </TouchableOpacity>
          {renderFrqModal(
            debtFrqVisible,
            setDebtFrqVisible,
            debtPaymentFrq,
            setDebtPaymentFrq
          )}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddDebt}
          >
            <Text style={styles.addButtonText}>Add Debt</Text>
          </TouchableOpacity>
          <View style={styles.billListContainer}>
          <FlatList
            data={debts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.billItem}>
                {item.name}: ${item.amount} ({item.frq})
              </Text>
            )}
          />
          </View>
          <View style={styles.navButtons}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleStepBack}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextStep}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
  
      {/* Step 5: Emergency Fund */}
      {step === 5 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>Emergency fund:</Text>
          <TextInput
            style={styles.input}
            placeholder="Current emergency fund"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={emergencyFund}
            onChangeText={(text) => setEmergencyFund(text)}
          />
          <Text style={styles.label}>Emergency fund goal:</Text>
          <TextInput
            style={styles.input}
            placeholder="Emergency fund goal"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={emergencyGoal}
            onChangeText={(text) => setEmergencyGoal(text)}
          />
          <View style={styles.navButtons}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleStepBack}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextStep}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Step 6: Saving Goal */}
      {step === 6 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>Saving goal:</Text>
          <TextInput
            style={styles.input}
            placeholder="Saving goal amount"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={savingGoal}
            onChangeText={(text) => setSavingGoal(text)}
          />
          <View style={styles.navButtons}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleStepBack}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextStep}
            >
              <Text style={styles.nextButtonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
      )};

      {/* Step 7: Summary */}
      {step === 7 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Salary:</Text>
            <Text style={styles.summaryValue}>{salary} ({salaryFrq})</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Living Expenses:</Text>
            <Text style={styles.summaryValue}>{livingExpenses}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Bills:</Text>
            {bills.length > 0 ? (
              bills.map((bill, index) => (
                <Text key={index} style={styles.summaryValue}>
                  {bill.name}: {bill.amount} ({bill.frq})
                </Text>
              ))
            ) : (
              <Text style={styles.summaryValue}>No bills added.</Text>
            )}
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Debts:</Text>
            {debts.map((debt, index) => (
            <Text key={index} style={styles.summaryValue}>
              {debt.name}: ${debt.amount} (Repayment: ${debt.payment}, {debt.frq})
            </Text>
        ))}
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Emergency Fund:</Text>
            <Text style={styles.summaryValue}>
              Current: {emergencyFund}, Goal: {emergencyGoal}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Saving Goal:</Text>
            <Text style={styles.summaryValue}>{savingGoal}</Text>
          </View>
          <View style={styles.navButtons}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleStepBack}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={() => console.log('Summary confirmed!')}
            >
              <Text style={styles.finishButtonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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