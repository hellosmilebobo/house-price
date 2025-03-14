function calculateROI() {
  let flatPrice = parseFloat(document.getElementById('flatPrice').value);
  let deposit = parseFloat(document.getElementById('deposit').value);
  let loanRate = parseFloat(document.getElementById('loanRate').value) / 100;
  let loanTerm = parseInt(document.getElementById('loanTerm').value);
  let serviceCharge = parseFloat(document.getElementById('serviceCharge').value);
  let groundRental = parseFloat(document.getElementById('groundRental').value);
  let inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;
  let depositRate = parseFloat(document.getElementById('depositRate').value) / 100;

  let loanAmount = flatPrice - deposit;
  let monthlyRate = loanRate / 12;
  let numPayments = loanTerm * 12;
  
  let monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
  document.getElementById('monthlyPayment').innerText = `£${monthlyPayment.toFixed(2)}`;

  let yearlyLoanPayment = monthlyPayment * 12;
  let totalServiceCharge = serviceCharge + groundRental;
  let yearlyRent = (flatPrice * 0.065) / 12 * 12;
  
  let resultTable = document.getElementById('resultTable');
  resultTable.innerHTML = '';

  for (let year = 1; year <= loanTerm; year++) {
      let totalExpense = yearlyLoanPayment + totalServiceCharge;
      let buyFlatSaveMoney = yearlyRent - totalExpense;
      let savingInterest = buyFlatSaveMoney * depositRate;
      let depositLostInterest = deposit * (1+depositRate)^(year-1)*depositRate;
      let flatPriceRaiseProfit = flatPrice * (1+inflationRate)^(year-1)*inflationRate;
      let principalPaid = yearlyLoanPayment - (loanAmount * loanRate);
      let balance = buyFlatSaveMoney + savingInterest - depositLostInterest + flatPriceRaiseProfit + principalPaid;
      
      let row = document.createElement('tr');
      row.innerHTML = `
          <td>${year}</td>
          <td>£${yearlyLoanPayment.toFixed(2)}</td>
          <td>£${totalServiceCharge.toFixed(2)}</td>
          <td>£${totalExpense.toFixed(2)}</td>
          <td>£${yearlyRent.toFixed(2)}</td>
          <td>£${buyFlatSaveMoney.toFixed(2)}</td>
          <td>£${savingInterest.toFixed(2)}</td>
          <td>£${depositLostInterest.toFixed(2)}</td>
          <td>£${flatPriceRaiseProfit.toFixed(2)}</td>
          <td>£${principalPaid.toFixed(2)}</td>
          <td>£${balance.toFixed(2)}</td>
      `;
      resultTable.appendChild(row);
      
      totalServiceCharge *= (1 + inflationRate);
      yearlyRent *= (1 + inflationRate);
  }
}

