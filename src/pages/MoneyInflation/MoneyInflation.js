import './MoneyInflation.scss';
import React, { useState } from "react";

function InflationCalculator() {
  console.log('here');
  const [initialAmount, setInitialAmount] = useState(1000);
  const [initialYear, setInitialYear] = useState(2020);
  const [targetYear, setTargetYear] = useState(2025);
  const [inflationRate, setInflationRate] = useState(2); 

  const calculateAdjustedValue = () => {
    const yearsDifference = targetYear - initialYear;
    const adjustedValue = initialAmount * Math.pow(1 + inflationRate / 100, yearsDifference);
    return adjustedValue.toFixed(2);
  };
  console.log("hi")

  return (
    <div className='inflate'>
      <h2>Inflation Calculator</h2>
      <section className='inflate__box'>
      <div>
        <label className='inflate__form'>Initial Amount:</label>
        <input className='inflate__input' type="number" value={initialAmount} onChange={(e) => setInitialAmount(e.target.value)} />
      </div>
      <div>
        <label className='inflate__form'>Initial Year:</label>
        <input className='inflate__input' type="number" value={initialYear} onChange={(e) => setInitialYear(e.target.value)} />
      </div>
      <div>
        <label className='inflate__form'>Target Year:</label>
        <input className='inflate__input' type="number" value={targetYear} onChange={(e) => setTargetYear(e.target.value)} />
      </div>
      <div>
        <label className='inflate__form'>Inflation Rate (%):</label>
        <input className='inflate__input' type="number" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} />
      </div>
      <button className='inflate__button' onClick={calculateAdjustedValue}>Calculate</button>
      <div>
        <p>Adjusted Value: ${calculateAdjustedValue()}</p>
      </div>
      </section>
    </div>
  );
};


export default InflationCalculator;
