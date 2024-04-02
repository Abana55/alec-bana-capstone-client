import React from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import './BudgetingCharts.scss';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function BudgetingCharts({ budgetingStyle, budgetSummary, lineGraphData, monthlyData, formatCurrency }) {
  const chartOptions = { responsive: true };

  const getChartData = () => {
    switch (budgetingStyle) {
      case '50/30/20 Rule':
        return {
          type: Doughnut,
          data: {
            labels: ['Necessities', 'Wants', 'Savings'],
            datasets: [{
              data: [budgetSummary.necessities, budgetSummary.wants, budgetSummary.savings],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }],
          },
          options: chartOptions,
        };
      case 'Zero-Based Budgeting':
        return {
          type: Bar,
          data: {
            labels: ['Total Expenses', 'Remaining'],
            datasets: [{
              label: 'Amount',
              data: [budgetSummary.totalExpenses, budgetSummary.remaining],
              backgroundColor: ['#36A2EB', '#FFCE56'],
            }],
          },
          options: chartOptions,
        };
      default:
        return {
          type: null,
          data: {},
          options: {},
        };
    }
  };

  const { type: ChartComponent, data, options } = getChartData();

  return (
    <div className="budgeting-charts">
      {ChartComponent && (
        <div className="budgeting-charts__container">
          <ChartComponent data={data} options={options} />
        </div>
      )}

      <div className="budgeting-charts__line-graph">
        <Line data={lineGraphData} options={chartOptions} />
      </div>

      <div className="budgeting-charts__table">
  <table>
    <thead>
      <tr>
        <th>Month</th>
        <th>Income</th>
        <th>Expenses</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(monthlyData) && monthlyData.map((data, index) => (
        <tr key={index}>
          <td>{data.month}</td>
          <td>{formatCurrency(data.income)}</td>
          <td>{formatCurrency(data.expenses)}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}

export default BudgetingCharts;