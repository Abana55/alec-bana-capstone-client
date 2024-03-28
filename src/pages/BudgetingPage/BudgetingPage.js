import React, { useState } from 'react';

function BudgetingPage() {
    const [budgetingStyle, setBudgetingStyle] = useState('50/30/20 Rule');
    const [income, setIncome] = useState(0);
    const [budgetSummary, setBudgetSummary] = useState({});
    const [expenses, setExpenses] = useState({
        necessities: 0,
        wants: 0,
        savings: 0,
        debtRepayment: 0
    });

    const handleBudgetingStyleChange = (event) => {
        setBudgetingStyle(event.target.value);
    };

    const handleIncomeChange = (event) => {
        setIncome(event.target.value);
    };

    const handleExpenseChange = (event, category) => {
        setExpenses({ ...expenses, [category]: event.target.value });
    };

    const calculateBudget = () => {
        let summary = {};
        switch (budgetingStyle) {
            case '50/30/20 Rule':
                summary.necessities = income * 0.5;
                summary.wants = income * 0.3;
                summary.savings = income * 0.2;
                break;
            case 'Zero-Based Budgeting':
                summary.totalExpenses = Object.values(expenses).reduce((acc, val) => acc + Number(val), 0);
                summary.remaining = income - summary.totalExpenses;
                break;
            case 'Envelope System':
                
                summary.envelopes = { ...expenses };
                break;
            case 'Pay Yourself First':
                summary.savings = income * 0.2; 
                summary.remainingForExpenses = income - summary.savings;
                break;
            case '70/20/10 Rule':
                summary.livingExpenses = income * 0.7;
                summary.savings = income * 0.2;
                summary.debtRepayment = income * 0.1;
                break;
            default:
                
                summary = {};
        }
        setBudgetSummary(summary);
    };

  return (
    <div>
            <h1>Budgeting Page</h1>
            <label>
                Budgeting Style:
                <select value={budgetingStyle} onChange={handleBudgetingStyleChange}>
                    <option value="50/30/20 Rule">50/30/20 Rule</option>
                    <option value="Zero-Based Budgeting">Zero-Based Budgeting</option>
                    <option value="Envelope System">Envelope System</option>
                    <option value="Pay Yourself First">Pay Yourself First</option>
                    <option value="70/20/10 Rule">70/20/10 Rule</option>
                </select>
            </label>
            <label>
                Monthly Income:
                <input type="number" value={income} onChange={handleIncomeChange} />
            </label>
          
            <button onClick={calculateBudget}>Calculate Budget</button>
            <div>
    <h2>Summary</h2>
    
    {budgetingStyle === '50/30/20 Rule' && (
        <div>
            <p>Necessities: {budgetSummary.necessities}</p>
            <p>Wants: {budgetSummary.wants}</p>
            <p>Savings: {budgetSummary.savings}</p>
        </div>
    )}
</div>
        </div>
  )
}

export default BudgetingPage;