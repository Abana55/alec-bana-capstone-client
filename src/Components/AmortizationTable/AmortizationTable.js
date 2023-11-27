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
};

function AmortizationTable({ loanAmount, downPaymentAmount, loanDetails, totalInterestPaid }) {


  return (
    <div>
      <section className="amortization">
        <h2>Amortization costs</h2>
        <p>Principal: {}</p>
        <p>Interest: {Math.round(loanDetails.yearlyInterestPaid)}</p>
        <p>total cost of loan:</p>
        <Line width={500} height={500}
          className=""
          data={{
            datasets: [
              {
                type: "line",
                label: "Principal Paid",
                borderColor: "rgb(54, 162, 235)",
                data: loanDetails.yearlyPrincipalPaid,
                tension: 0.1,
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 1

              },
              {
                type: "line",
                label: "Interest Paid",
                borderColor: "rgb(255, 99, 132)",
                data: loanDetails.yearlyInterestPaid,
                tension: 0.1,
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 1

              },
              {
                type: "line",
                label: "Remaining Principal",
                borderColor: "purple",
                data: loanDetails.yearlyRemainingPrincipal,
                tension: 0.5,
                borderWidth: 3,
                pointRadius: 0,
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
        {/* <tbody>
    {loanDetails.map((loanDetail) => (
        <tr key={loanDetail.id}>
            <td className="table__position1">
            </td>
            <td className="table__position2"><p>Date: {loanDetail.date}</p></td>
            <td className="table__position3"><p>Principal: {loanAmount.principal}</p></td>
            <td className="table__position4"><p>Interest: {loanDetail.interest}</p></td>
            <td className="table__position5"><p>Remaining Balance: {downPaymentAmount.remainingBalance}</p></td>
        </tr> 
     ))}
</tbody> */}
      </table>
      {/* <section className='table__modal'>
                {deleteModal && <DeleteWarehouse openDelete={setDeleteModal} warehouse={selectedWarehouse} />}
            </section> */}
    </div>
  );
}

export default AmortizationTable;
