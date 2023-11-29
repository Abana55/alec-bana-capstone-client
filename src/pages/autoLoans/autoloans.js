import './autoLoans.scss'
// import DonutChart from "../DonutChart/DonutChart";
import React, { useState } from "react";
import axios from "axios";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function AutoLoans() {
  const [loanAmount, setLoanAmount] = useState(45_000);
  const [downPaymentAmount, setDownPaymentAmount] = useState(1_000);
  const [interestRate, setInterestRate] = useState(8);
  const [loanTerm, setLoanTerm] = useState(5);
  const [activeGraph, setActiveGraph] = useState("donut");
  const [loanDetails, setLoanDetails] = useState({});


  const handleLoanAmountChange = (event) => {
    const newLoanAmount = Number(event.target.value);

    setLoanAmount(newLoanAmount);
  };

  const handleDownPaymentAmountChange = (event) => {
    const newDownPaymentAmountChange = Number(event.target.value);

    setDownPaymentAmount(newDownPaymentAmountChange);
  };

  const handleLoanTermChange = (event) => {
    const newLoanTerm = Number(event.target.value);

    setLoanTerm(newLoanTerm);
  };

  const handleInterestRateChange = (event) => {
    const newInterestRate = Number(event.target.value);

    setInterestRate(newInterestRate);
  };
  const handleSubmit = async(event) => {
    event.preventDefault()

  const res = await axios.post('http://localhost:8080/api/calculators/calculate-loan-details', {interestRate, loanTerm, principalAmount:loanAmount - downPaymentAmount})
  setLoanDetails(res.data)
  }
    return (
      <>
      <h1 className='input__title'>Auto Loans</h1>
      <form 
          className="input__box"
          onSubmit={handleSubmit}
          >
            <div className="input__form-box">
              <label className="input__sub-title">Cost of Car:</label>
              <div className="input__">
                <input
                  className="input__input"
                  value={loanAmount}
                  type="number"
                  min={0}
                  onChange={handleLoanAmountChange}
                />
              </div>
            </div>
            <div className="input__form-box">
              <label className="input__sub-title">Down Payment:</label>
              <div className="input__">
                <input
                  className="input__input"
                  value={downPaymentAmount}
                  onChange={handleDownPaymentAmountChange}
                  type="number"
                  min={0}
                />
              </div>
            </div>
            <div className="input__form-box">
              {/*here is the dropdown to pick between 30/15/10/5 years */}
              <label className="input__option">
                Loan Term
                <select
                  className="input__input"
                  value={loanTerm}
                  onChange={handleLoanTermChange}
                  defaultValue={loanTerm}
                >
                  <option value={3}>36 Months</option>
                  <option value={4}>48 Months</option>
                  <option value={5}>60 Months</option>
                  <option value={6}>72 Months</option>
                </select>
              </label>
            </div>
            <div className="input__form-box">
              <label className="input__sub-title">
                Interest Rate:
                <input
                  className="input__input"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  type="number"
                  min={0}
                />
              </label>
            </div>
            <input
            type="submit"
            />
          </form>
      </>
    );
  }
  
  export default AutoLoans;
  