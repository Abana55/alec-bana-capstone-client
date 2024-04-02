import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import './BudgetingSummary.scss';

const BudgetSummary = ({
  budgetingStyle,
  income,
  totalExpenses,
  formatCurrency,
}) => {
  let summary = {};

  switch (budgetingStyle) {
    case '50/30/20 Rule':
      summary = {
        necessities: income * 0.5,
        wants: income * 0.3,
        savings: income * 0.2,
      };
      break;
    case 'Zero-Based Budgeting':
      summary = {
        totalExpenses: totalExpenses,
        remaining: income - totalExpenses,
      };
      break;
    case 'Pay Yourself First':
      summary = {
        savings: income * 0.2,
        remainingForExpenses: income - income * 0.2,
      };
      break;
    case '70/20/10 Rule':
      summary = {
        livingExpenses: income * 0.7,
        savings: income * 0.2,
        debtRepayment: income * 0.1,
      };
      break;
    default:
      summary = {};
  }

  return (
    <div className="budget-summary">
      <h2 className="budget-summary__title">Summary</h2>
      {Object.entries(summary).map(([key, value]) => (
        <p key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)}: {formatCurrency(value)}
        </p>
      ))}
    </div>
  );
};

export default BudgetSummary;