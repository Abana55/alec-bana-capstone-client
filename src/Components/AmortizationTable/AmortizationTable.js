import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import './AmortizationTable.scss';

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
      text: 'Yearly Payment Breakdown',
    },
  },
  scales: {
    x: {
      title: {
        color: 'grey',
        display: true,
        text: 'Years',
      },
      maxTicksLimit: 1,
    },
    y: {
      title: {
        color: 'grey',
        display: true,
        text: '$ Amount',
      },
    },
  },
  legend: {
    position: 'left',
  },
};

function AmortizationTable({ loanDetails }) {
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);

  const formatCurrency = (value) => {
    try {
      if (value !== undefined && value !== null) {
        return typeof value === 'number' && !isNaN(value)
          ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
          : '';
      }
      return '';
    } catch (error) {
      console.error('Error formatting currency:', error);
      return '';
    }
  };

  return (
    <div>
      <section className="amortization">
        <h2 className="amortization__title">Amortization costs</h2>
        <div className="amortization__sub-title-box">
          <div className="amortization__p-box">
            <p className="amortization__sub-title">Principal: </p>
            <p>{formatCurrency(loanDetails.loanAmount)}</p>
          </div>
          <p className="amortization__sub-title">
            Interest: {formatCurrency(loanDetails.totalInterestPaid)}
          </p>
          <p className="amortization__sub-title">
            Total loan amount: {formatCurrency(totalLoanAmount)}
          </p>
        </div>
        <Line
          width={300}
          height={300}
          className="amortization__chart"
          data={{
            datasets: [
              {
                type: 'line',
                label: 'Principal Paid',
                borderColor: '#028174',
                data: loanDetails.yearlyPrincipalPaid,
                tension: 0.1,
                borderWidth: 3,
                pointRadius: 2,
                pointHoverRadius: 1,
                usePointStyle: true,
              },
              {
                type: 'line',
                label: 'Interest Paid',
                borderColor: '#f14666',
                data: loanDetails.yearlyInterestPaid,
                tension: 0.1,
                borderWidth: 3,
                pointRadius: 2,
                pointHoverRadius: 1,
              },
              {
                type: 'line',
                label: 'Remaining Principal',
                borderColor: '#ee8980',
                data: loanDetails.yearlyRemainingPrincipal,
                tension: 0.5,
                borderWidth: 3,
                pointRadius: 1,
                pointHoverRadius: 1,
              },
            ],
            labels: loanDetails.years,
          }}
          options={lineChartOptions}
        />
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
          {loanDetails.years.map((year, index) => (
            <tr key={index}>
              <td className="table__position">{year}</td>
              <td className="table__position">
                <p className="amortization__p">
                  {formatCurrency(loanDetails.yearlyPrincipalPaid[index])}
                </p>
              </td>
              <td className="table__position">
                <p className="amortization__p">
                  {formatCurrency(loanDetails.yearlyInterestPaid[index])}
                </p>
              </td>
              <td className="table__position">
                <p className="amortization__p">
                  {formatCurrency(loanDetails.yearlyRemainingPrincipal[index])}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AmortizationTable;