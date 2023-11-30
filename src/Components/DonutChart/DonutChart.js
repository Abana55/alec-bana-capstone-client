import React, { useState } from "react";
import "./DonutChart.scss";
import { Doughnut } from "react-chartjs-2";

function Donut({ loanDetails }) {
  const [propertyTax, setPropertyTax] = useState(350);
  const [homeownersInsurance, setHomeownersInsurance] = useState(350);
  const [hoaFee, setHoaFee] = useState(0);
  const [other, setOther] = useState(0);

  const handleOther = (event) => {
    setOther(Number(event.target.value));
  }

  const handleHomeownersInsuranceChange = (event) => {
    setHomeownersInsurance(Number(event.target.value));
  };

  const handleHoaFee = (event) => {
    setHoaFee(Number(event.target.value));
  }

  const handlePropertyTaxChange = (event) => {
    setPropertyTax(Number(event.target.value));
  };

  const monthlyPayment = loanDetails.monthlyPayment || 0;
  const totalMonthlyPayment = monthlyPayment + propertyTax;
  const totalMonthlyPayments = totalMonthlyPayment + homeownersInsurance + hoaFee + other;

  return (
    <div className="donut">
      <div className="donut__form-box">
        <label className="donut__input">
          <span className="donut__icon--color"></span>
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
          <span className="donut__icon--color1"></span>
          Homeowner's Insurance:
          <input
          className="donut__form"
          type="number"
          value={homeownersInsurance}
          onChange={handleHomeownersInsuranceChange}
          min={0}
          />
        </label>
        <label className="donut__input">
          <span className="donut__icon--color2"></span>
          HOA fee's:
          <input
          className="donut__form"
          type="number"
          value={hoaFee}
          onChange={handleHoaFee}
          min={0}
          />
        </label>
        <label className="donut__input">
          <span className="donut__icon--color3"></span>
          Other:
          <input
          className="donut__form"
          type="number"
          value={other}
          onChange={handleOther}
          min={0}
          />
        </label>
        <div>
        <label className="donut__total">Monthly Payments {Math.round(totalMonthlyPayments)}</label>
      </div>
      </div>
      <Doughnut
      className="donut__chart"
      height={400}
      width={400}
        data={{
          labels: ["Monthly Payment", "Property Tax", "Homeowner's insurance", "Hoa Fee's, Other"],
          datasets: [
            {
              label: "Monthly Payment Breakdown",
              data: [
                monthlyPayment, propertyTax, homeownersInsurance, hoaFee, other
              ],
              backgroundColor: ["#028174", "#f14666", "#ee8980", "#ffcdaa", "#0ab68b"],
              hoverOffset: 30,
              borderWidth: 3,
              
            },
          ],
        }}
        options={{
          cutout: 40,
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
