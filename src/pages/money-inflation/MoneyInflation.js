import './MoneyInflation.scss';
import React, { useState } from "react";

function InflationCalculator() {

  const [initialAmount, setInitialAmount] = useState(1000);
  const [initialYear, setInitialYear] = useState(2020);
  const [targetYear, setTargetYear] = useState(2025);
  const [inflationRate, setInflationRate] = useState(2); 

  const calculateAdjustedValue = () => {
    const yearsDifference = targetYear - initialYear;
    const adjustedValue = initialAmount * Math.pow(1 + inflationRate / 100, yearsDifference);
    return adjustedValue.toFixed(2);
  };

  return (
    <>
    <div>
      <h2>Inflation Calculator</h2>
      <div>
        <label>Initial Amount:</label>
        <input type="number" value={initialAmount} onChange={(e) => setInitialAmount(e.target.value)} />
      </div>
      <div>
        <label>Initial Year:</label>
        <input type="number" value={initialYear} onChange={(e) => setInitialYear(e.target.value)} />
      </div>
      <div>
        <label>Target Year:</label>
        <input type="number" value={targetYear} onChange={(e) => setTargetYear(e.target.value)} />
      </div>
      <div>
        <label>Inflation Rate (%):</label>
        <input type="number" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} />
      </div>
      <button onClick={calculateAdjustedValue}>Calculate Adjusted Value</button>
      <div>
        <p>Adjusted Value: ${calculateAdjustedValue()}</p>
      </div>
    </div>
    </>
  );
};


export default InflationCalculator;