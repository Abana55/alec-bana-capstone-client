import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';

const BudgetSummary = ({
  budgetingStyle,
  budgetSummary,
  doughnutChartData,
  barChartData,
  formatCurrency,
}) => {
  return (
    <div className="budgeting-page__summary">
      <h2 className="budgeting-page__summary-title">Summary</h2>
      {budgetingStyle === "50/30/20 Rule" && (
        <div className="budgeting-page__chart-container">
          <div className="budgeting-page__chart">
            <Doughnut data={doughnutChartData} />
          </div>
          <div className="budgeting-page__chart-legend">
            <p>Necessities: {formatCurrency(budgetSummary.necessities)}</p>
            <p>Wants: {formatCurrency(budgetSummary.wants)}</p>
            <p>Savings: {formatCurrency(budgetSummary.savings)}</p>
          </div>
        </div>
      )}
      {budgetingStyle === "Zero-Based Budgeting" && (
        <div className="budgeting-page__chart-container">
          <div className="budgeting-page__chart">
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>
          <div className="budgeting-page__chart-legend">
            <p>Total Expenses: {formatCurrency(budgetSummary.totalExpenses)}</p>
            <p>Remaining: {formatCurrency(budgetSummary.remaining)}</p>
          </div>
        </div>
      )}
      {budgetingStyle === "Pay Yourself First" && (
        <div>
          <p>Savings: {formatCurrency(budgetSummary.savings)}</p>
          <p>Remaining for Expenses: {formatCurrency(budgetSummary.remainingForExpenses)}</p>
        </div>
      )}
      {budgetingStyle === "70/20/10 Rule" && (
        <div>
          <p>Living Expenses: {formatCurrency(budgetSummary.livingExpenses)}</p>
          <p>Savings: {formatCurrency(budgetSummary.savings)}</p>
          <p>Debt Repayment: {formatCurrency(budgetSummary.debtRepayment)}</p>
        </div>
      )}
    </div>
  );
};

export default BudgetSummary;