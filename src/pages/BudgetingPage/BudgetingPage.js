import React, { useState } from "react";
import "./BudgetingPage.scss";
import BudgetingCharts from "../../Components/BudgetingCharts/BudgetingCharts";
import BudgetSummary from "../../Components/BudgetingSummary/BudgetingSummary";
import BudgetingForm from "../../Components/BudgetingForm/BudgetingForm";
import BudgetingMethodDefinitions from "../../Components/BudgetingMethodDefinitions/BudgetingMethodDefinitions";

function BudgetingPage() {
  const [budgetSummary, setBudgetSummary] = useState({}); 
  const [monthlyData, setMonthlyData] = useState([]);
  const [budgetingStyle, setBudgetingStyle] = useState("50/30/20 Rule");
  const [income, setIncome] = useState(0);
  const [formattedIncome, setFormattedIncome] = useState("$0");
  const [expenses, setExpenses] = useState({
    housing: 0,
    utilities: 0,
    groceries: 0,
    transportation: 0,
    entertainment: 0,
    other: 0,
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const totalExpenses = Object.values(expenses).reduce(
    (sum, expense) => sum + expense,
    0
  );
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
        formattedIncome={formattedIncome}
        setFormattedIncome={setFormattedIncome}
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
      <BudgetingCharts
        budgetingStyle={budgetingStyle}
        budgetSummary={budgetSummary}
        lineGraphData={lineGraphData}
        monthlyData={monthlyData}
        formatCurrency={formatCurrency}
      />

      <BudgetingMethodDefinitions />
    </div>
  );
}

export default BudgetingPage;
