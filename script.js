document.getElementById('loan-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // 获取输入值
  const loanAmount = parseFloat(document.getElementById('loan-amount').value);
  const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12; // 每月利率
  const loanTerm = parseInt(document.getElementById('loan-term').value) * 12; // 总期数（以月为单位）

  // 计算月供
  const x = Math.pow(1 + interestRate, loanTerm);
  const monthlyPayment = (loanAmount * interestRate * x) / (x - 1);

  // 计算总还款额和总利息
  const totalRepayment = monthlyPayment * loanTerm;
  const totalInterest = totalRepayment - loanAmount;

  // 显示结果
  if (isFinite(monthlyPayment) && (monthlyPayment > 0)) {
    document.getElementById('monthly-payment').textContent = `月供: ￥${monthlyPayment.toFixed(2)}`;
    document.getElementById('total-repayment').textContent = `总还款额: ￥${totalRepayment.toFixed(2)}`;
    document.getElementById('total-interest').textContent = `总利息: ￥${totalInterest.toFixed(2)}`;
  } else {
    alert('请输入有效的数值');
  }
});
