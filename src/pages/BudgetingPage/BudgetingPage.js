import React, { useState } from 'react';

function BudgetingPage() {
    const [budgetingStyle, setBudgetingStyle] = useState('50/30/20 Rule');
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState({
        necessities: 0,
        wants: 0,
        savings: 0,
        debtRepayment: 0
    });
    
  return (
    <div>BudgetingPage</div>
  )
}

export default BudgetingPage