import React from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import './BudgetingCharts.scss';

function BudgetingCharts({ budgetingStyle, budgetSummary, lineGraphData, monthlyData, formatCurrency }) {
  const doughnutChartData = {
    labels: ['Necessities', 'Wants', 'Savings'],
    datasets: [
      {
        data: [
          budgetSummary.necessities,
          budgetSummary.wants,
          budgetSummary.savings,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const barChartData = {
    labels: ['Total Expenses', 'Remaining'],
    datasets: [
      {
        label: 'Amount',
        data: [budgetSummary.totalExpenses, budgetSummary.remaining],
        backgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="budgeting-charts">
      {budgetingStyle === '50/30/20 Rule' && (
        <div className="budgeting-charts__container">
          <Doughnut data={doughnutChartData} />
          {/* Doughnut chart legend */}
        </div>
      )}

      {budgetingStyle === 'Zero-Based Budgeting' && (
        <div className="budgeting-charts__container">
          <Bar data={barChartData} options={{ responsive: true }} />
          {/* Bar chart legend */}
        </div>
      )}

      <div className="budgeting-charts__line-graph">
        <Line data={lineGraphData} options={{ responsive: true }} />
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
            {monthlyData.map((data, index) => (
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