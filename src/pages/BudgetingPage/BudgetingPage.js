import React, { useState } from "react";
import "./BudgetingPage.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function BudgetingPage() {
  const [budgetingStyle, setBudgetingStyle] = useState("50/30/20 Rule");
  const [income, setIncome] = useState(0);
  const [formattedIncome, setFormattedIncome] = useState("$0");
  const [budgetSummary, setBudgetSummary] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [expenses, setExpenses] = useState({
    housing: 0,
    utilities: 0,
    groceries: 0,
    transportation: 0,
    entertainment: 0,
    other: 0,
  });

  const handleExpenseChange = (category, event) => {
    const numericValue = parseFloat(event.target.value.replace(/[^0-9.]/g, ""));
    if (!isNaN(numericValue)) {
      setExpenses((prevExpenses) => ({
        ...prevExpenses,
        [category]: numericValue,
      }));
    } else {
      setExpenses((prevExpenses) => ({
        ...prevExpenses,
        [category]: 0,
      }));
    }
  };
  const handleBudgetingStyleChange = (event) => {
    setBudgetingStyle(event.target.value);
  };

  const handleIncomeChange = (event) => {
    const numericValue = parseFloat(event.target.value.replace(/[^0-9.]/g, ""));
    if (!isNaN(numericValue)) {
      setIncome(numericValue);
      setFormattedIncome(formatCurrency(numericValue));
    } else {
      setIncome(0);
      setFormattedIncome("$0");
    }
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
        const totalExpenses = Object.values(expenses).reduce(
          (sum, expense) => sum + expense,
          0
        );
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

    // Update monthly data for graph/table
    setMonthlyData((prevData) => [
      ...prevData,
      {
        month: new Date().toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        income: income,
        expenses: Object.values(expenses).reduce(
          (sum, expense) => sum + expense,
          0
        ),
        ...summary,
      },
    ]);
  };

  const lineGraphData = {
    labels: monthlyData.map((data) => data.month),
    datasets: [
      {
        label: "Income",
        data: monthlyData.map((data) => data.income),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Expenses",
        data: monthlyData.map((data) => data.expenses),
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="budgeting-page">
      <h1 className="budgeting-page__title">Budgeting Page</h1>
      <div className="budgeting-page__form">
        <div className="budgeting-page__form-card">
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
              type="text"
              className="budgeting-page__form-input"
              value={expenses.housing}
              onChange={(e) => handleExpenseChange("housing", e)}
              onBlur={(e) =>
                setExpenses((prevExpenses) => ({
                  ...prevExpenses,
                  housing: formatCurrency(prevExpenses.housing),
                }))
              }
            />
          </label>
          <div className="budgeting-page__expenses">
  <label className="budgeting-page__form-label">
    Housing:
    <input
      type="text"
      className="budgeting-page__form-input"
      value={formatCurrency(expenses.housing)}
      onChange={(e) => handleExpenseChange("housing", e.target.value)}
    />
  </label>
  <label className="budgeting-page__form-label">
    Utilities:
    <input
      type="text"
      className="budgeting-page__form-input"
      value={formatCurrency(expenses.utilities)}
      onChange={(e) => handleExpenseChange("utilities", e.target.value)}
    />
  </label>
  <label className="budgeting-page__form-label">
    Groceries:
    <input
      type="text"
      className="budgeting-page__form-input"
      value={formatCurrency(expenses.groceries)}
      onChange={(e) => handleExpenseChange("groceries", e.target.value)}
    />
  </label>
  <label className="budgeting-page__form-label">
    Transportation:
    <input
      type="text"
      className="budgeting-page__form-input"
      value={formatCurrency(expenses.transportation)}
      onChange={(e) => handleExpenseChange("transportation", e.target.value)}
    />
  </label>
  <label className="budgeting-page__form-label">
    Entertainment:
    <input
      type="text"
      className="budgeting-page__form-input"
      value={formatCurrency(expenses.entertainment)}
      onChange={(e) => handleExpenseChange("entertainment", e.target.value)}
    />
  </label>
  <label className="budgeting-page__form-label">
    Other:
    <input
      type="text"
      className="budgeting-page__form-input"
      value={formatCurrency(expenses.other)}
      onChange={(e) => handleExpenseChange("other", e.target.value)}
    />
  </label>
</div>
          <button
            className="budgeting-page__form-button"
            onClick={calculateBudget}
          >
            Calculate Budget
          </button>
        </div>
      </div>
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
              <p>
                Total Expenses: {formatCurrency(budgetSummary.totalExpenses)}
              </p>
              <p>Remaining: {formatCurrency(budgetSummary.remaining)}</p>
            </div>
          </div>
        )}
        {budgetingStyle === "Pay Yourself First" && (
          <div className="budgeting-page__method-info">
            <p className="budgeting-page__method-info-title">
              Savings: {formatCurrency(budgetSummary.savings)}
            </p>
            <p className="budgeting-page__method-info-text">
              Remaining for Expenses:{" "}
              {formatCurrency(budgetSummary.remainingForExpenses)}
            </p>
          </div>
        )}
        {budgetingStyle === "70/20/10 Rule" && (
          <div className="budgeting-page__method-info">
            <p className="budgeting-page__method-info-title">
              Living Expenses: {formatCurrency(budgetSummary.livingExpenses)}
            </p>
            <p className="budgeting-page__method-info-text">
              Savings: {formatCurrency(budgetSummary.savings)}
            </p>
            <p className="budgeting-page__method-info-text">
              Debt Repayment: {formatCurrency(budgetSummary.debtRepayment)}
            </p>
          </div>
        )}
      </div>
      <div className="budgeting-page__line-graph">
        <Line data={lineGraphData} options={{ responsive: true }} />
      </div>
      <div className="budgeting-page__table">
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
      <div className="budgeting-page__method-info">
        <h2 className="budgeting-page__method-info-title">
          Budgeting Method Definitions and Benefits
        </h2>
        <Slider {...sliderSettings}>
          <div className="budgeting-page__definition-card">
            <p className="budgeting-page__method-info-text">
              <strong>50/30/20 Rule:</strong> A simple and straightforward
              method that divides your after-tax income into three categories:
              necessities, wants, and savings. It's beneficial for those who
              want a balanced approach to budgeting without strict constraints.
            </p>
          </div>
          <div className="budgeting-page__definition-card">
            <p className="budgeting-page__method-info-text">
              <strong>Zero-Based Budgeting:</strong> Every dollar of income is
              assigned a specific purpose, whether it's spending or saving,
              ensuring that your income minus your expenses equals zero. This
              method is beneficial for those who want to have complete control
              over their finances and avoid overspending.
            </p>
          </div>
          <div className="budgeting-page__definition-card">
            <p className="budgeting-page__method-info-text">
              <strong>Pay Yourself First:</strong> Prioritizes saving by setting
              aside a portion of your income for savings or investments before
              allocating money to other expenses. It's beneficial for those who
              want to ensure they consistently save a portion of their income.
            </p>
          </div>
          <div className="budgeting-page__definition-card">
            <p className="budgeting-page__method-info-text">
              <strong>70/20/10 Rule:</strong> Similar to the 50/30/20 rule, but
              with a focus on allocating more towards living expenses and less
              towards wants. It's beneficial for those who have higher living
              costs or are focused on debt repayment.
            </p>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default BudgetingPage;
