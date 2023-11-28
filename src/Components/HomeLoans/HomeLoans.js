import "./HomeLoans.scss";
import DonutChart from "../DonutChart/DonutChart";
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
import { Line } from "react-chartjs-2";
import AmortizationTable from "../AmortizationTable/AmortizationTable";

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

const lineChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Yearly Payment Breakdown",
    },
  },
  scales: {
    x: {
      title: {
        color: "grey",
        display: true,
        text: "Years",
      },
    },
    y: {
      title: {
        color: "grey",
        display: true,
        text: "$ Amount",
      },
    },
  },
};

function HomeLoans() {
  const [loanAmount, setLoanAmount] = useState(500_000);
  const [downPaymentAmount, setDownPaymentAmount] = useState(10_000);
  const [interestRate, setInterestRate] = useState(8);
  const [loanTerm, setLoanTerm] = useState(15);
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

  const handleInterestRateChange = (event) => {
    const newInterestRate = Number(event.target.value);

    setInterestRate(newInterestRate);
  };

  const handleLoanTermChange = (event) => {
    const newLoanTerm = Number(event.target.value);

    setLoanTerm(newLoanTerm);
  };

  const handleDonutButtonClick = () => {
    setActiveGraph("donut");
  };

  const handleLineButtonClick = () => {
    setActiveGraph("line");
  };

  const handleSubmit = async(event) => {
    console.log("hello world")
    event.preventDefault()
    
    const res = await axios.post('http://localhost:8080/api/calculators/calculate-loan-details', {interestRate, loanTerm, principalAmount:loanAmount - downPaymentAmount});
    console.log(res)
    setLoanDetails(res.data)
    
  }
  
  return (
    
      <section className="input">
        <section className="input__top-box">
          <h1 className="input__title">Mortgage Calculator</h1>
          <div className="input__under-title">
            <ul className="input__list">
              <li className="input__hover">
                <button
                variant="outline-secondary" 
                className="input__button "
                onClick={handleDonutButtonClick}
                >Payment Breakdown</button>
              </li>
              <li className="input__hover">
                <button 
                variant="outline-secondary"
                className="input__button"
                onClick={handleLineButtonClick}
                >Amortization chart</button>
              </li>
            </ul>
          </div>
          <section className="input__contains">
          <form 
          className="input__box"
          onSubmit={handleSubmit}
          >
            <div className="input__form-box">
              <label className="input__sub-title">Home Price:</label>
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
                  <option value={5}>5 Years</option>
                  <option value={10}>10 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={30}>30 Years</option>
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
        <section className="input__body">
          
          { activeGraph === "donut" ? (
            <DonutChart
              loanAmount={loanAmount}
              loanDetails={loanDetails}
              downPaymentAmount={downPaymentAmount}
            />
            ) : (
            <AmortizationTable
            loanAmount={loanAmount}
            loanDetails={loanDetails}
            downPaymentAmount={downPaymentAmount}e
            />
          )}
          </section>
          </section>
          </section>

      </section>

  );
}

export default HomeLoans;
