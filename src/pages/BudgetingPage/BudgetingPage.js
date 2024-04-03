import React, { useState } from "react";
import "./BudgetingPage.scss";
import BudgetSummary from "../../Components/BudgetingSummary/BudgetingSummary";
import BudgetingForm from "../../Components/BudgetingForm/BudgetingForm";
import BudgetingMethodDefinitions from "../../Components/BudgetingMethodDefinitions/BudgetingMethodDefinitions";
import { Doughnut, Bar, Line } from "react-chartjs-2";

function BudgetingPage() {
  const [budgetSummary, setBudgetSummary] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [budgetingStyle, setBudgetingStyle] = useState("50/30/20 Rule");
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const totalExpenses = expenses; 
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
        data: [formatCurrency(totalExpenses), formatCurrency(income - totalExpenses)],
        backgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
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

  return (
    <div className="budgeting-page">
      <h1 className="budgeting-page__title">Budgeting Page</h1>
      <BudgetingForm
        budgetingStyle={budgetingStyle}
        setBudgetingStyle={setBudgetingStyle}
        income={income}
        setIncome={setIncome}
        expenses={expenses}
        setExpenses={setExpenses}
        formatCurrency={formatCurrency}
      />
      <BudgetSummary
        budgetingStyle={budgetingStyle}
        income={income}
        totalExpenses={totalExpenses}
        formatCurrency={formatCurrency}
      />
      <div className="budgeting-charts">
        {budgetingStyle === "50/30/20 Rule" && (
          <Doughnut data={doughnutChartData} />
        )}
        {budgetingStyle === "Zero-Based Budgeting" && (
          <Bar data={barChartData} />
        )}
        <Line data={lineGraphData} />
      </div>
      <BudgetingMethodDefinitions />
    </div>
  );
}

export default BudgetingPage;