// Helper to calculate days between two dates
const calculateDaysBetween = (startDate, endDate) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.round((endDate - startDate) / msPerDay);
  };
  
// Main calculation function
const calculateSavings = (data, targetDate = null) => {
    data.timeStamp = "1.1.2025" //Simulation date
    const { bills, debts, otherIncomes, salary } = data;
    let amountSaved = 0
  
    const startDate = new Date(data.timeStamp.split('.').reverse().join('-'));
    const endDate = targetDate
      ? new Date(targetDate.split('.').reverse().join('-'))
      : new Date(); // Default to today's date if targetDate is not provided
  
    const totalDays = calculateDaysBetween(startDate, endDate);
    for (let day = 1; day <= totalDays; day++) {
        // Debugging each iteration
        console.log(`Processing Day ${day}`);
      
        // Process Bills
        bills.forEach(bill => {
          if (day % bill.frqAmount === 0) {
            console.log(`Paying Bill: ${bill.name} amount ${bill.payment} on Day ${day}`);
            amountSaved -= Number(bill.payment); // Convert to number before subtracting
          }
        });
      
        // Process Debts
        debts.forEach(debt => {
          if (day % debt.frqAmount === 0) {
            console.log(`Paying Debt: ${debt.name} on Day ${day}`);
            amountSaved -= Number(debt.payment); // Convert to number before subtracting
          }
        });
      
        // Process Salary
        if (day % salary.frqAmount === 0) {
          console.log(`Receiving Salary on Day ${day}`);
          amountSaved += Number(salary.salary); // Convert to number before adding
        }
      
        // Process Other Incomes
        otherIncomes.forEach(income => {
          if (day % 30 === 0) { // Assuming monthly incomes
            console.log(`Receiving Income: ${income.name} on Day ${day}`);
            amountSaved += Number(income.amount); // Convert to number before adding
          }
        });
      }
      
    
    data.amountSaved = amountSaved;
};

  export {
    calculateSavings,
  }