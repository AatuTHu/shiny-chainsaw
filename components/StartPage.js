import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import styles from '../styles/startPage.js'
import React, { useState } from 'react'
import ModalMenu from './reusables/ModalMenu'

export default function StartPage() {
  const [step, setStep] = useState(1);

  const [salary, setSalary] = useState('');
  const [salaryFrq, setSalaryFrq] = useState('Monthly');
  const [salaryFrqVisible, setSalaryFrqVisible] = useState(false);
  const [incomes, setIncomes] = useState([]);

  const [housing, setHousing] = useState('');	
  const [groceries, setGroceries] = useState('');
  const [transportation, setTransportation] = useState('');

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
  
  const frequencies = ['Weekly', 'Bi-Weekly', 'Monthly', 'Bi-Monthly', 'Quarterly', 'Semiannual', 'Annual']; // May need to add more options

  // Show inputfields step by step
  const handleNextStep = () => {
    switch (step) {
      case 1:
        if(salary !== ''){
          setStep(2);
        }
        break;
      case 2:
        if(housing !== '' && groceries !== '' && transportation !== ''){
          handleAddBill();
          setStep(3);
        }
        break;
      case 3:
        handleAddDebt();
        setStep(4);
        break;
      case 4:
        if (emergencyFund !== '' && emergencyGoal !== ''){
          setStep(6);
        }
        break;
      case 5:
        if(savingGoal !== ''){
          setStep(7);
        }
        break;
      case 6:
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

  const handleAddIncome = () => {
    setIncomes([...incomes, { name: '', amount: ''}]);
  };

  const handleIncomeChange = (index, field, value) => {
    const updatedIncomes = incomes.map((income, i) =>
    i === index? {...income, [field]: value } : income);
    setIncomes(updatedIncomes);
  };

  const handleRemoveIncome = (index) => {
    const updatedIncomes = incomes.filter((_, i) => i!== index);
    setIncomes(updatedIncomes);
  }

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

  return (
    <SafeAreaView style={styles.container}>

      {/* Step 1: Salary */}
      {step === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>Salary:</Text>
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

          <ModalMenu
            visible={salaryFrqVisible}
            setVisible={setSalaryFrqVisible}
            data={frequencies}
            selectedValue={salaryFrq}
            setSelectedValue={setSalaryFrq}
            title="Select Salary Frequency" 
          />

          {/* Additional Incomes */}
          <Text style={styles.label}>Other Incomes:</Text>
          {incomes.map((income, index) => (
            <View key={index} style={styles.incomeRow}>
              <TextInput
                style={styles.input}
                placeholder="Income name"
                placeholderTextColor="#888"
                value={income.name}
                onChangeText={(text) => handleIncomeChange(index, 'name', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Income amount"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={income.amount}
                onChangeText={(text) => handleIncomeChange(index, 'amount', text)}
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveIncome(index)}
              >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddIncome}
          >
            <Text style={styles.addButtonText}>Add Income</Text>
          </TouchableOpacity>

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
          <Text style={styles.label}>Monthly Living Expenses:</Text>
          <TextInput
            style={styles.input}
            placeholder="Rent / Mortgage"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={housing}
            onChangeText={(text) => setHousing(text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Food and Groceries"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={groceries}
            onChangeText={(text) => setGroceries(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Transportation"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={transportation}
            onChangeText={(text) => setTransportation(text)}
          />

          <Text style={styles.label}>Recurring Bills:</Text>
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

          <ModalMenu
            visible={billFrqVisible}
            setVisible={setBillFrqVisible}
            data={frequencies}
            selectedValue={billFrq}
            setSelectedValue={setBillFrq}
            title="Select Bill Frequency"
          />

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
  
      {/* Step 3: Debt Details */}
      {step === 3 && (
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

          <ModalMenu
            visible={debtFrqVisible}
            setVisible={setDebtFrqVisible}
            data={frequencies}
            selectedValue={debtPaymentFrq}
            setSelectedValue={setDebtPaymentFrq}
            title="Select Bill Frequency"
          />

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
  
      {/* Step 4: Emergency Fund */}
      {step === 4 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>Emergency Fund:</Text>
          <TextInput
            style={styles.input}
            placeholder="Current emergency fund"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={emergencyFund}
            onChangeText={(text) => setEmergencyFund(text)}
          />
          
          <Text style={styles.label}>Emergency Fund Goal:</Text>
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

      {/* Step 5: Saving Goal */}
      {step === 5 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>Saving Goal:</Text>
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

      {/* Step 6: Summary */}
      {step === 6 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary</Text>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Salary:</Text>
            <Text style={styles.summaryValue}>{salary} ({salaryFrq})</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Living Expenses:</Text>
            <Text style={styles.summaryValue}>Housing: {housing}</Text>
            <Text style={styles.summaryValue}>Food and Groceries: {groceries}</Text>
            <Text style={styles.summaryValue}>Transportation: {transportation}</Text>
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
              <Text style={styles.summaryValue}>No Bills Added.</Text>
            )}
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Debts:</Text>
            {debts.length > 0 ? (
            debts.map((debt, index) => (
            <Text key={index} style={styles.summaryValue}>
              {debt.name}: ${debt.amount} (Repayment: ${debt.payment}, {debt.frq})
            </Text>
            ))
          ) : (
            <Text style={styles.summaryValue}>No debts added.</Text>
          )}
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