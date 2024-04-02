import React from 'react';
import './BudgetingForm.scss';

const BudgetingForm = ({
  budgetingStyle,
  setBudgetingStyle,
  income,
  setIncome,
  expenses,
  setExpenses,
  calculateBudget,
  formatCurrency,
}) => {
  const handleIncomeChange = (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setIncome(value);
    }
  };

  const handleExpenseChange = (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setExpenses({ ...expenses, total: value });
    }
  };

  return (
    <div className="budgeting-form">
      <div className="budgeting-form__card">
        <label className="budgeting-form__label">
          Budgeting Style:
          <select
            className="budgeting-form__select"
            value={budgetingStyle}
            onChange={(e) => setBudgetingStyle(e.target.value)}
          >
            <option value="50/30/20 Rule">50/30/20 Rule</option>
            <option value="Zero-Based Budgeting">Zero-Based Budgeting</option>
            <option value="Pay Yourself First">Pay Yourself First</option>
            <option value="70/20/10 Rule">70/20/10 Rule</option>
          </select>
        </label>
        <label className="budgeting-form__label">
          Monthly Income:
          <input
            type="number"
            className="budgeting-form__input"
            value={income}
            onChange={handleIncomeChange}
          />
        </label>
        <label className="budgeting-form__label">
          Total Expenses:
          <input
            type="number"
            className="budgeting-form__input"
            value={expenses.total || 0}
            onChange={handleExpenseChange}
          />
        </label>
        <button className="budgeting-form__button" onClick={calculateBudget}>
          Calculate Budget
        </button>
      </div>
    </div>
  );
};

export default BudgetingForm;