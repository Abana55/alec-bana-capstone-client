import "./HomeLoans.scss";
import DonutChart from '../DonutChart/DonutChart';
import { useState } from "react";

function HomeLoans() {
  const [loanAmount, setLoanAmount] = useState(500_000);
  const [downPaymentAmount, setDownPaymentAmount] = useState(100_000);
  const [interstRate, setInterestRate] = useState(8);
  const [loanTerm, setLoanTerm] = useState(15);

  const handleLoanAmountChange = (event) => {
    const newLoanAmount = Number(event.target.value);

    setLoanAmount(newLoanAmount)
  };

  const handleDownPaymentAmountChange = (event) => {
    const newDownPaymentAmountChange = Number(event.target.value);

    setDownPaymentAmount(newDownPaymentAmountChange);
  };

  const handleInterstRateChange = (event) => {
    const  newInterestRate = Number(event.target.value);

    setInterestRate(newInterestRate);
  }

  const handleloanTermChange = (event) => {
    const newLoanTerm = Number(event.target.value);
    
    setLoanTerm(newLoanTerm);
  };

  const calculateMonthlyPayment = () => {
    const monthlyInterest = interstRate / 100 / 12;
    const numberOfMonths = loanTerm * 12;
    const principal = loanAmount - downPaymentAmount;

    return (
      (principal * 
        monthlyInterest * 
        Math.pow(1 + monthlyInterest, numberOfMonths)) /
        (Math.pow(1 + monthlyInterest, numberOfMonths) - 1)
    );
  };

  const calculateLoanDetails = () => {
    const initialPrincipal = loanAmount - downPaymentAmount;
    let remainingPrincipal = initialPrincipal;
    const monthlyPayment = calculateMonthlyPayment();

    let counter = 0;
    let totalInterstPaid = 0;
    let year = 1;

    const years = [];
    const yearlyInterestPaid = [];
    const yearlyPrincipalPaid = [];
    const yearlyRemainingPrincipal = [];

    while (remainingPrincipal > 0) {
      const monthlyInterestPaid =
      remainingPrincipal * (interstRate / 100 / 12);

      const monthlyPaymentAmountTowardsPrincipal =
      monthlyPayment - monthlyInterestPaid;

      totalInterstPaid += monthlyInterestPaid;
      remainingPrincipal -= monthlyPaymentAmountTowardsPrincipal;

      counter++;

      //statement to clarify a year has been passed

      if (counter === 12) {
        yearlyInterestPaid.push(totalInterstPaid);
        yearlyPrincipalPaid.push(initialPrincipal - remainingPrincipal);
        yearlyRemainingPrincipal.push(remainingPrincipal);
        years.push(year);
        year++;
        counter = 0;
      }
    }
    return {
      yearlyInterestPaid,
      yearlyPrincipalPaid,
      yearlyRemainingPrincipal,
      years,
    };
  }
  const loanDetails = calculateLoanDetails();

  return (
    <>
    <section className="input">
    <section className="input__">
      <h1 className="input__title">Mortgage Calculator</h1>
          <div className="input__">
            <ul className="input__">
              <li className="input__">
                <button className="input__">Payment Breakdown</button>
              </li>
              <li className="input__">
                <button className="input__">Amortization chart</button>
              </li>
            </ul>
          </div>
        </section>
      <section className="input__body">
        <section className="input__box">
          <div className="input__">
            <label className="input__">Home Price</label>
            <div className="input__">
              <input className="input__" />
            </div>
          </div>
          <div className="input__">
            <label className="input__">Down Payment</label>
            <div className="input__">
              <input className="input__" />
            </div>
          </div>
          <div className="input__">
            {/*here is the dropdown to pick between 30/15/10/5 years */}
            <label className="input__">Loan Term</label>
            <div className="input__">
              <input className="input__" />
            </div>
          </div>
          <div className="input__">
            <label className="input__">Interest Rate</label>
            <div className="input__">
              <input className="input__" />
            </div>
          </div>     
        </section>
          <div>
            <DonutChart/>
          </div>
      </section>
      <section>
        
      </section>
      </section>
    </>
  );
}

export default HomeLoans;
