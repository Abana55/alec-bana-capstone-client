import React, { useState } from "react";
import "./DonutChart.scss";
import { Doughnut } from "react-chartjs-2";

function Donut({ loanDetails }) {
  const [propertyTax, setPropertyTax] = useState(0);
  const [homeownersInsurance, setHomeownersInsurance] = useState(0);

  const handleHomeownersChange = (event) => {
    setHomeownersInsurance(Number(event.taget.value));
  };

  const handlePropertyTaxChange = (event) => {
    setPropertyTax(Number(event.target.value));
  };

  const monthlyPayment = loanDetails.monthlyPayment || 0;
  const totalMonthlyPayment = monthlyPayment + propertyTax;
  const totalMonthlyPayments = totalMonthlyPayment + homeownersInsurance;

  return (
    <div className="donut">
      <div>
        <label>Total Monthly Payment: {Math.round(totalMonthlyPayments)}</label>
        <label>
          PropertyTax:
          <input
          type="number"
          value={propertyTax}
          onChange={handlePropertyTaxChange}
          min={0}
          />
        </label>
        <label>
          Homeowner's Insurance:
          <input
          type="number"
          value={homeownersInsurance}
          onChange={handleHomeownersChange}
          min={0}
          />
        </label>
      </div>
      <Doughnut
        data={{
          labels: ["Monthly Payment", "Property Tax", "Homeowner's insurance"],
          datasets: [
            {
              label: "Monthly Payment Breakdown",
              data: [
                monthlyPayment, propertyTax, homeownersInsurance
              ],
              backgroundColor: ["rgb(0, 0, 235)", "rgb(255, 0, 0)", "rgb(0, 200, 0"],
              hoverOffset: 100,
              borderWidth:10,
              
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Payment Breakup",
            },
          },
        }}  
      />
    </div>
  );
}

export default Donut;
