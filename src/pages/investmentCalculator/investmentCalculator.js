import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./InvestmentCalculator.scss";

function InvestmentCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);
  const [expenseRatio, setExpenseRatio] = useState(0.35);
  const [interestRate, setInterestRate] = useState(0.04);
  const [loanTerm, setLoanTerm] = useState(30);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(30);
  const [occupancyRate, setOccupancyRate] = useState(0.95);


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const calculateMetrics = () => {
    const annualRentalIncome = rentalIncome * 12 * occupancyRate;
    const operatingExpenses = annualRentalIncome * expenseRatio;
    const noi = annualRentalIncome - operatingExpenses;
    const capRate = (noi / purchasePrice) * 100;

    const downPayment = purchasePrice * (downPaymentPercentage / 100);
    const loanAmount = purchasePrice - downPayment;
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyMortgagePayment =
      (loanAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    const annualMortgagePayment = monthlyMortgagePayment * 12;

    const annualCashFlow = noi - annualMortgagePayment;
    const roi = (annualCashFlow / downPayment) * 100;

    return {
      noi,
      annualMortgagePayment,
      downPayment,
      capRate,
      annualCashFlow,
      roi,
    };
  };

  const {
    noi,
    annualMortgagePayment,
    downPayment,
    capRate,
    annualCashFlow,
    roi,
  } = calculateMetrics();

  const years = Array.from({ length: loanTerm }, (_, i) => `Year ${i + 1}`);

  const noiData = Array.from(
    { length: loanTerm },
    (_, i) => noi * Math.pow(1.05, i)
  );
  const capRateData = Array.from(
    { length: loanTerm },
    (_, i) => (noiData[i] / purchasePrice) * 100
  );
  const roiData = Array.from(
    { length: loanTerm },
    (_, i) => ((noiData[i] - annualMortgagePayment) / downPayment) * 100
  );

  const graphData = {
    labels: Array.from({ length: loanTerm }, (_, i) => `Year ${i + 1}`),
    datasets: [
      {
        label: "Net Operating Income",
        data: Array.from(
          { length: loanTerm },
          (_, i) => noi * Math.pow(1.05, i)
        ),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Cap Rate",
        data: capRateData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "ROI",
        data: roiData,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };
  return (
    <div className="investment-calculator">
      <h2 className="investment-calculator__title">
        Real Estate Investment Calculator
      </h2>
      <form className="investment-calculator__form">
        <div className="investment-calculator__form-group">
          <label className="investment-calculator__form-label">
            Purchase Price:
            <input
              type="number"
              className="investment-calculator__form-input"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
            />
          </label>
          <label className="investment-calculator__form-label">
            Monthly Rental Income:
            <input
              type="number"
              className="investment-calculator__form-input"
              value={rentalIncome}
              onChange={(e) => setRentalIncome(Number(e.target.value))}
            />
          </label>
          <label className="investment-calculator__form-label">
            Expense Ratio:
            <input
              type="number"
              className="investment-calculator__form-input"
              value={expenseRatio}
              onChange={(e) => setExpenseRatio(Number(e.target.value))}
              step="0.01"
            />
          </label>
          <label className="investment-calculator__form-label">
            Interest Rate:
            <input
              type="number"
              className="investment-calculator__form-input"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              step="0.01"
            />
          </label>
          <label className="investment-calculator__form-label">
            Loan Term (years):
            <input
              type="number"
              className="investment-calculator__form-input"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
            />
          </label>
          <label className="investment-calculator__form-label">
            Down Payment Percentage:
            <input
              type="number"
              className="investment-calculator__form-input"
              value={downPaymentPercentage}
              onChange={(e) => setDownPaymentPercentage(Number(e.target.value))}
              step="1"
            />
          </label>
          <label className="investment-calculator__form-label">
            Occupancy Rate:
            <input
              type="number"
              className="investment-calculator__form-input"
              value={occupancyRate}
              onChange={(e) => setOccupancyRate(Number(e.target.value))}
              step="0.01"
            />
          </label>
          <div className="investment-calculator__results">
            <p>Cap Rate: {capRate.toFixed(2)}%</p>
            <p>Annual Cash Flow: ${annualCashFlow.toFixed(2)}</p>
            <p>ROI: {roi.toFixed(2)}%</p>
          </div>
        </div>
        <div className="investment-calculator__graph">
          <Line data={graphData} options={{ responsive: true }} />
        </div>
      </form>

      <div className="calculator-terms">
        <h3>Terms and Definitions</h3>
        <Slider {...sliderSettings}>
    <div className="calculator-term">
      <p><strong>Cap Rate (Capitalization Rate):</strong> A measure of the potential return on a real estate investment, calculated as the Net Operating Income divided by the purchase price.</p>
      <p className="calculator-formula">Formula: Cap Rate = (NOI / Purchase Price) * 100</p>
    </div>
    <div className="calculator-term">
      <p><strong>Net Operating Income (NOI):</strong> The total income generated by the property minus operating expenses.</p>
      <p className="calculator-formula">Formula: NOI = Gross Rental Income - Operating Expenses</p>
    </div>
    <div className="calculator-term">
      <p><strong>ROI (Return on Investment):</strong> A measure of the profitability of an investment, calculated as the net profit divided by the initial investment cost.</p>
      <p className="calculator-formula">Formula: ROI = (Annual Cash Flow / Down Payment) * 100</p>
    </div>
          <li>
            <strong>Expense Ratio:</strong> The ratio of operating expenses to
            the gross income of the property, indicating the efficiency of
            property management.
            <br />
            <em>
              Formula: Expense Ratio = Operating Expenses / Gross Rental Income
            </em>
          </li>
          <li>
            <strong>Interest Rate:</strong> The percentage charged on the
            borrowed capital, affecting the monthly mortgage payments.
          </li>
          <li>
            <strong>Loan Term:</strong> The duration over which the loan is
            scheduled to be repaid, typically expressed in years.
          </li>
          <li>
            <strong>Down Payment Percentage:</strong> The portion of the
            property's purchase price paid upfront, expressed as a percentage of
            the total price.
          </li>
          <li>
            <strong>Occupancy Rate:</strong> The ratio of rented or used space
            to the total available space, indicating the property's ability to
            attract and retain tenants.
          </li>
        </Slider>
      </div>
    </div>
  );
}

export default InvestmentCalculator;
