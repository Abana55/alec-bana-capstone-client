import React from "react";
import "./DonutChart.scss";
import { Doughnut } from "react-chartjs-2";

function Donut({ loanAmount, downPaymentAmount, loanDetails }) {
  return (
    <div className="donut">
      <Doughnut
        data={{
          labels: ["Principal", "Interest"],
          datasets: [
            {
              label: "Home Loan Details",
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
