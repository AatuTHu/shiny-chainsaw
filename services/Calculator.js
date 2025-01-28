import { makeTimeStamp } from "./Utilities";
import {USERINFO,db,doc,setDoc,auth} from '../services/Firebase';
// Helper to calculate days between two dates
const calculateDaysBetween = (startDate, endDate) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.round((endDate - startDate) / msPerDay);
};
  
const getTotalAmountOfBills = (bills) => {
  let totalAmount = 0
  bills.forEach(bill => { 
      totalAmount += bill.amount;
  });
  return totalAmount;
}

const getTotalAmountOfExpenses = (expenses) => {
  let totalAmount = 0
      totalAmount = expenses.housing + expenses.transportation + expenses.groceries;
  return totalAmount;
}

// Main calculation function
const calculateBalance = (data, targetDate = null) => {
    const { bills,debts,otherIncomes,salary,otherExpenses,savingGoal,expenses } = data;
    let updatedDebts = [...debts];
    const newData = []
    const startDate = new Date(data.timeStamp.split('.').reverse().join('-'));
    const endDate = targetDate
    ? new Date(targetDate.split('.').reverse().join('-'))
    : new Date(); // Default to today's date if targetDate is not provided
  
    const totalDays = calculateDaysBetween(startDate, endDate);
    for (let day = 1; day <= totalDays; day++) {
      if (day % 30 === 0) {
        // Aggregate balance changes
        let monthlyBillTotal = bills.reduce((sum, bill) => sum + bill.amount, 0);
        let monthlyDebtPayment = debts.reduce((sum, item) => sum + item.payment, 0);
        let monthlyExpenseTotal = getTotalAmountOfExpenses(data.expenses);
        let otherExpenseTotal = otherExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        let otherIncomeTotal = otherIncomes.reduce((sum, income) => sum + income.amount, 0);
        // Update balance in a single step
       data.balance += salary.salary - monthlyBillTotal - monthlyDebtPayment - monthlyExpenseTotal - otherExpenseTotal + otherIncomeTotal;
       // Update debts
       updatedDebts = updatedDebts
       .map(debt => {
         let remainingAmount = debt.amount - debt.payment;     
         return { ...debt, amount: remainingAmount };
       })
       .filter(debt => debt.amount > 0);     
       newData.push({
         bills: bills,
         debts: updatedDebts,
         otherIncomes: otherIncomes,
         expenses: expenses,
         salary: salary,
         otherExpenses:otherExpenses,
         balance: data.balance,
         timeStamp: makeTimeStamp(),
         savingGoal: savingGoal,
         uid: auth.currentUser.uid
       })
       updateDocument(newData[0], data.id)
      }
    }
    return newData
};

  const updateDocument = async (data, id) => {
      try {  
       const docRef = doc(db, USERINFO, id);  // Reference to the Firestore document
        await setDoc(docRef, {  // Update the Firestore document
          uid: data.uid,
          balance: data.balance,
          salary: data.salary,
          otherIncomes: data.otherIncomes,
          expenses: data.expenses,
          otherExpenses: data.otherExpenses,
          bills: data.bills,
          debts: data.debts,
          savingGoal: data.savingGoal,
          timeStamp: data.timeStamp,
        });
        } catch (error) {
          console.error('Error updating document:', error);
    }
  }

  export {
    calculateBalance,
    getTotalAmountOfBills,
    getTotalAmountOfExpenses,
  }