import React from 'react';
import './BudgetingForm.scss';

const BudgetingForm = ({
  budgetingStyle,
  setBudgetingStyle,
  formattedIncome,
  handleIncomeChange,
  expenses,
  handleExpenseChange,
  calculateBudget,
}) => {
  return (
    <div className="budgeting-page__form">
      <div className="budgeting-page__form-card">
        <label className="budgeting-page__form-label">
          Budgeting Style:
          <select
            className="budgeting-page__form-select"
            value={budgetingStyle}
            onChange={(e) => setBudgetingStyle(e.target.value)}
          >
            <option value="50/30/20 Rule">50/30/20 Rule</option>
            <option value="Zero-Based Budgeting">Zero-Based Budgeting</option>
            <option value="Pay Yourself First">Pay Yourself First</option>
            <option value="70/20/10 Rule">70/20/10 Rule</option>
          </select>
        </label>
        <label className="budgeting-page__form-label">
          Monthly Income:
          <input
            type="text"
            className="budgeting-page__form-input"
            value={formattedIncome}
            onChange={handleIncomeChange}
          />
        </label>
        {Object.entries(expenses).map(([category, value]) => (
          <label key={category} className="budgeting-page__form-label">
            {category.charAt(0).toUpperCase() + category.slice(1)}:
            <input
              type="text"
              className="budgeting-page__form-input"
              value={value}
              onChange={(e) => handleExpenseChange(category, e.target.value)}
            />
          </label>
        ))}
        <button
          className="budgeting-page__form-button"
          onClick={calculateBudget}
        >
          Calculate Budget
        </button>
      </div>
    </div>
  );
};

export default BudgetingForm;