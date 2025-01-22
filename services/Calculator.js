// Helper to calculate days between two dates
const calculateDaysBetween = (startDate, endDate) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.round((endDate - startDate) / msPerDay);
};
  
{/* 
  todo:
  - Remove console.logs
  - Add comments for better understanding
  - Optimize the loop for better performance, especially for larger datasets
  - Consider adding error handling for invalid data inputs
  - Return the number of days between ?
  - Better future simulation

*/}

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
    data.timeStamp = "1.1.2025" //Simulation date
    const { bills, debts, otherIncomes, salary } = data;
    let balance = 0
  
    const startDate = new Date(data.timeStamp.split('.').reverse().join('-'));
    const endDate = targetDate
      ? new Date(targetDate.split('.').reverse().join('-'))
      : new Date(); // Default to today's date if targetDate is not provided
  
    const totalDays = calculateDaysBetween(startDate, endDate);
    for (let day = 1; day <= totalDays; day++) {
        // Debugging each iteration
      
        // Process Bills
        bills.forEach(bill => {
          if (day % bill.frqAmount === 0) {
            console.log(`Paying Bill: ${bill.name} amount ${bill.amount} on Day ${day}`);
            balance -= bill.amount;
          }
        });
      
        // Process Debts
        debts.forEach(debt => {
          if (day % debt.frqAmount === 0) {
            console.log(`Paying Debt: ${debt.name} on Day ${day} amount ${debt.payment}`);
            data.debts.amount -= debt.payment
            balance -= debt.payment
          }
        });

        // Process monthlyExpenses
        if (day % 30 === 0) { // Assuming monthly expenses
          console.log(`Spending Expenses on Day ${day} amount of ${data.expenses.housing + data.expenses.transportation + data.expenses.groceries}`);
          balance -= getTotalAmountOfExpenses(data.expenses)
        }
      
        // Process Salary
        if (day % salary.frqAmount === 0) {
          console.log(`Receiving Salary on Day ${day} amount: ${salary.salary}`);
          balance += (salary.salary);
        }
      
        // Process Other Incomes
        otherIncomes.forEach(income => {
          if (day % 30 === 0) { // Assuming monthly incomes
            console.log(`Receiving Income: ${income.name} on Day ${day} amount ${income.amount}`);
            balance += income.amount
          }
        });
      }
    
    return balance;
};

  export {
    calculateBalance,
    getTotalAmountOfBills,
    getTotalAmountOfExpenses
  }