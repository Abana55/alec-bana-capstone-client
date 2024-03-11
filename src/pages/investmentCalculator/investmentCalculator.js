import React, { useState } from 'react';

function InvestmentCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);
  const [expenseRatio, setExpenseRatio] = useState(0.35);
  const [interestRate, setInterestRate] = useState(0.04);
  const [loanTerm, setLoanTerm] = useState(30);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(30);
  const [occupancyRate, setOccupancyRate] = useState(0.95);

  
  const calculateMetrics = () => {
    const annualRentalIncome = rentalIncome * 12 * occupancyRate;
    const operatingExpenses = annualRentalIncome * expenseRatio;
    const noi = annualRentalIncome - operatingExpenses;
    const capRate = (noi / purchasePrice) * 100;

    const downPayment = purchasePrice * (downPaymentPercentage / 100);
    const loanAmount = purchasePrice - downPayment;
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyMortgagePayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    const annualMortgagePayment = monthlyMortgagePayment * 12;

    const annualCashFlow = noi - annualMortgagePayment;
    const roi = (annualCashFlow / downPayment) * 100;

    return {
      capRate,
      annualCashFlow,
      roi,
    };
  };

  const { capRate, annualCashFlow, roi } = calculateMetrics();

  return (
    <div>
      <h2>Real Estate Investment Calculator</h2>
      <label>
        Purchase Price:
        <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} />
      </label>
      <label>
        Monthly Rental Income:
        <input type="number" value={rentalIncome} onChange={e => setRentalIncome(Number(e.target.value))} />
      </label>

      <div>
        <p>Cap Rate: {capRate.toFixed(2)}%</p>
        <p>Annual Cash Flow: ${annualCashFlow.toFixed(2)}</p>
        <p>ROI: {roi.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default InvestmentCalculator;