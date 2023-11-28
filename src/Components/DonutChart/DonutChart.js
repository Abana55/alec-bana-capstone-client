import React, { useState } from "react";
import "./DonutChart.scss";
import { Doughnut } from "react-chartjs-2";

function Donut({ loanDetails }) {
  const [propertyTax, setPropertyTax] = useState(350);
  const [homeownersInsurance, setHomeownersInsurance] = useState(350);
  const [hoaFee, setHoaFee] = useState(0);

  const handleHomeownersChange = (event) => {
    setHomeownersInsurance(Number(event.taget.value));
  };

  const handleHoaFee = (event) => {
    setHoaFee(Number(event.target.value));
  }

  const handlePropertyTaxChange = (event) => {
    setPropertyTax(Number(event.target.value));
  };

  const monthlyPayment = loanDetails.monthlyPayment || 0;
  const totalMonthlyPayment = monthlyPayment + propertyTax;
  const totalMonthlyPayments = totalMonthlyPayment + homeownersInsurance + hoaFee;

  return (
    <div className="donut">
      <div className="donut__form-box">
        <label className="donut__total">Total Monthly Payment: {Math.round(totalMonthlyPayments)}</label>
        <label className="donut__input">
          PropertyTax:
          <input
          className="donut__form"
          type="number"
          value={propertyTax}
          onChange={handlePropertyTaxChange}
          min={0}
          />
        </label>
        <label className="donut__input">
          Homeowner's Insurance:
          <input
          className="donut__form"
          type="number"
          value={homeownersInsurance}
          onChange={handleHomeownersChange}
          min={0}
          />
        </label>
        <label className="donut__input">
          HOA fee's:
          <input
          className="donut__form"
          type="number"
          value={hoaFee}
          onChange={handleHoaFee}
          min={0}
          />
        </label>
      </div>
      <Doughnut
      className="donut__chart"
      height={400}
      width={400}
        data={{
          labels: ["Monthly Payment", "Property Tax", "Homeowner's insurance", "Hoa Fee's"],
          datasets: [
            {
              label: "Monthly Payment Breakdown",
              data: [
                monthlyPayment, propertyTax, homeownersInsurance, hoaFee
              ],
              backgroundColor: ["black", "gold", "grey", "silver"],
              hoverOffset: 100,
              borderWidth:3,
              
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Payment Breakdown",
            },
          },
        }}  
      />
    </div>
  );
}

export default Donut;
