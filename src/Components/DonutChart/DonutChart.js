import React, { useState } from "react";
import "./DonutChart.scss";
import { Doughnut } from "react-chartjs-2";


function Donut({ loanAmount, downPaymentAmount, loanDetails }) {
  const PaymentBreakdown = ({ monthlyPayment }) => {
    const [propertyTax, setPropertyTax] = useState(0);
    const handlePropertyTaxChange = (event) => {
      setPropertyTax(Number(event.target.value));
    }
  }
  return (
    <div className="donut">
      <Doughnut
        data={{
          labels: ["Principal", "Interest", "Property Tax"],
          datasets: [
            {
              label: "Monthly Payment Breakdown",
              data: [
                loanAmount - downPaymentAmount,
                loanDetails.totalInterestPaid,
              ],
              backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
              hoverOffset: 4,
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
