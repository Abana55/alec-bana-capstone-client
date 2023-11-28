import "./AmortizationTable.scss";
import React, { useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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
  legend: {
    name: 'Position: left',
    handler(chart) {
      chart.options.plugins.legend.position = 'left';
      chart.update();
    }
  },
};

function AmortizationTable({ loanAmount, downPaymentAmount, loanDetails, totalInterestPaid }) {
const [totalCost, setTotalCost] = useState({});

const handleTotalCost = (event) => {
  setTotalCost(Number(event.target.value));
  const totalCosts = totalInterestPaid + loanAmount;

}

console.log('LOOK HERE: ',loanDetails)

// function currencyFormat(num) {
//   return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
// 


  return (
    <div>
      <section className="amortization">
        <h2 className="amortization__title">Amortization costs</h2>
        <div className="amortization__sub-title-box">
          <div className="amortization__p-box">
            <p className="amortization__sub-title">Principal: </p>
            <p>{loanDetails.loanAmount}</p>
          </div>
          <p className="amortization__sub-title">Interest: {loanDetails.totalInterestPaid}</p>
          <p className="amortization__sub-title">Total cost of loan: {loanDetails.totalCost}</p>
        </div>
        <Line width={300} height={300}
          className="amortization__chart"
          data={{
            datasets: [
              {
                type: "line",
                label: "Principal Paid",
                borderColor: "offwhite",
                data: loanDetails.yearlyPrincipalPaid,
                tension: 0.1,
                borderWidth: 3,
                pointRadius: 2,
                pointHoverRadius: 1,
                usePointStyle: true,

              },
              {
                type: "line",
                label: "Interest Paid",
                borderColor: "grey",
                data: loanDetails.yearlyInterestPaid,
                tension: 0.1,
                borderWidth: 3,
                pointRadius: 2,
                pointHoverRadius: 1

              },
              {
                type: "line",
                label: "Remaining Principal",
                borderColor: "gold",
                data: loanDetails.yearlyRemainingPrincipal,
                tension: 0.5,
                borderWidth: 3,
                pointRadius: 1,
                pointHoverRadius: 1

              },
            ],
            labels: loanDetails.years,
          }}
          options={lineChartOptions}
        />
        {/* line chart goes here */}
      </section>
      <table className="table__container table__container--warehouse">
        <thead>
          <tr>
            <th>Date</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Remaining Balance</th>
          </tr>
        </thead>
        
        <tbody>
    {loanDetails ? loanDetails.yearlyInterestPaid.map((loanDetails) => (
        <tr key={loanDetails.id}>
            <td className="table__position">
            </td>
            <td className="table__position"><p>Date: {loanDetails}</p></td>
            <td className="table__position"><p>Principal: {loanDetails.yearlyPrincipalPaid}</p></td>
            <td className="table__position"><p>Interest: {loanDetails.yearlyInterestPaid}</p></td>
            <td className="table__position"><p>Remaining Balance: {loanDetails.yearlyRemainingPrincipal}</p></td>
        </tr> 
     )) : <div>loading</div>}
</tbody>
      </table>
    </div>
  );
}

export default AmortizationTable;
