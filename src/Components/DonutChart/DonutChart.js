import React, { useState } from "react";
import "./DonutChart.scss";
import { Doughnut } from "react-chartjs-2";
import PaymentBreakdown from "../PaymentBreakDown/PaymentBreakDown";


function Donut({ loanDetails }) {
  const [propertyTax, setPropertyTax] = useState(0);

  const handlePropertyTaxChange = (event) => {
    setPropertyTax(Number(event.target.value));
  };

  const monthlyPayment = loanDetails.monthlyPayment || 0;

  return (
    <div className="donut">
      <Doughnut
        data={{
          labels: ["Monthly Payment", "Property Tax"],
          datasets: [
            {
              label: "Monthly Payment Breakdown",
              data: [
                monthlyPayment, propertyTax
              ],
              backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
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
      <PaymentBreakdown/>
    </div>
  );
}

export default Donut;
