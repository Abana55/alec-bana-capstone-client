import React, { useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import "./BudgetingPage.scss";

function BudgetingPage() {
  const [budgetingStyle, setBudgetingStyle] = useState("50/30/20 Rule");
  const [income, setIncome] = useState(0);
  const [budgetSummary, setBudgetSummary] = useState({});

  const handleBudgetingStyleChange = (event) => {
    setBudgetingStyle(event.target.value);
  };

  const handleIncomeChange = (event) => {
    setIncome(event.target.value);
  };

  const calculateBudget = () => {
    let summary = {};
    switch (budgetingStyle) {
      case "50/30/20 Rule":
        summary.necessities = income * 0.5;
        summary.wants = income * 0.3;
        summary.savings = income * 0.2;
        break;
      case "Zero-Based Budgeting":
        const totalExpenses = 0.8 * income;
        summary.totalExpenses = totalExpenses;
        summary.remaining = income - totalExpenses;
        break;
      case "Pay Yourself First":
        summary.savings = income * 0.2;
        summary.remainingForExpenses = income - summary.savings;
        break;
      case "70/20/10 Rule":
        summary.livingExpenses = income * 0.7;
        summary.savings = income * 0.2;
        summary.debtRepayment = income * 0.1;
        break;
      default:
        summary = {};
    }
    setBudgetSummary(summary);
  };
  const doughnutChartData = {
    labels: ["Necessities", "Wants", "Savings"],
    datasets: [
      {
        data: [
          budgetSummary.necessities,
          budgetSummary.wants,
          budgetSummary.savings,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  const barChartData = {
    labels: ["Total Expenses", "Remaining"],
    datasets: [
      {
        label: "Amount",
        data: [budgetSummary.totalExpenses, budgetSummary.remaining],
        backgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };
  const envelopeDoughnutChartData = {
    labels: Object.keys(budgetSummary.envelopes),
    datasets: [
      {
        data: Object.values(budgetSummary.envelopes),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="budgeting-page">
      <h1 className="budgeting-page__title">Budgeting Page</h1>
      <div className="budgeting-page__form">
        <label className="budgeting-page__form-label">
          Budgeting Style:
          <select
            className="budgeting-page__form-select"
            value={budgetingStyle}
            onChange={handleBudgetingStyleChange}
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
            type="number"
            className="budgeting-page__form-input"
            value={income}
            onChange={handleIncomeChange}
          />
        </label>
        <button
          className="budgeting-page__form-button"
          onClick={calculateBudget}
        >
          Calculate Budget
        </button>
      </div>
      <div className="budgeting-page__summary">
        <h2 className="budgeting-page__summary-title">Summary</h2>
        {/* Summary will be displayed based on the selected budgeting style */}
      </div>
      <div className="budgeting-page__method-info">
        <h2 className="budgeting-page__method-info-title">
          Budgeting Method Definitions and Benefits
        </h2>
        <p className="budgeting-page__method-info-text">
          <strong>50/30/20 Rule:</strong> A simple and straightforward method
          that divides your after-tax income into three categories: necessities,
          wants, and savings. It's beneficial for those who want a balanced
          approach to budgeting without strict constraints.
        </p>
        <p className="budgeting-page__method-info-text">
          <strong>Zero-Based Budgeting:</strong> Every dollar of income is
          assigned a specific purpose, whether it's spending or saving, ensuring
          that your income minus your expenses equals zero. This method is
          beneficial for those who want to have complete control over their
          finances and avoid overspending.
        </p>
        <p className="budgeting-page__method-info-text">
          <strong>Pay Yourself First:</strong> Prioritizes saving by setting
          aside a portion of your income for savings or investments before
          allocating money to other expenses. It's beneficial for those who want
          to ensure they consistently save a portion of their income.
        </p>
        <p className="budgeting-page__method-info-text">
          <strong>70/20/10 Rule:</strong> Similar to the 50/30/20 rule, but with
          a focus on allocating more towards living expenses and less towards
          wants. It's beneficial for those who have higher living costs or are
          focused on debt repayment.
        </p>
      </div>
    </div>
  );
}

export default BudgetingPage;
