// Listen to the input changes on house price, down payment, interest rate, and loan term
document.getElementById("loan-form").addEventListener("input", calculateLoanResults);

// Function to calculate the loan results
function calculateLoanResults() {
  const housePrice = parseFloat(document.getElementById("house-price").value);
  const downPayment = parseFloat(document.getElementById("down-payment").value);
  const loanAmount = housePrice - downPayment;

  const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100 / 12; // Monthly interest rate
  const loanTerm = parseInt(document.getElementById("loan-term").value) * 12; // Total months

  if (isNaN(loanAmount) || loanAmount <= 0 || isNaN(interestRate) || isNaN(loanTerm)) return;

  // Display loan amount
  document.getElementById("loan-amount").value = `￥${loanAmount.toFixed(2)}`;

  // Calculate monthly payment
  const x = Math.pow(1 + interestRate, loanTerm);
  const monthlyPayment = (loanAmount * interestRate * x) / (x - 1);

  // Calculate total repayment and total interest
  const totalRepayment = monthlyPayment * loanTerm;
  const totalInterest = totalRepayment - loanAmount;

  // Display the results
  if (isFinite(monthlyPayment) && monthlyPayment > 0) {
    document.getElementById("monthly-payment").value = `￥${monthlyPayment.toFixed(2)}`;
    document.getElementById("total-repayment").value = `￥${totalRepayment.toFixed(2)}`;
    document.getElementById("total-interest").value = `￥${totalInterest.toFixed(2)}`;
  }
}
