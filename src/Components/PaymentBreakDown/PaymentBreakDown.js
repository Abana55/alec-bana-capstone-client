import { Doughnut } from "react-chartjs-2";
import React, { useState } from "react";

function PaymentBreakdown ({monthlyPayment}) {
    const [propertyTax, setPropertyTax] = useState(0);

    const handlePropertyTaxChange = (event) => {
        setPropertyTax(Number(event.target.value));
    };

    return(
        <>
        <div className="donut">
        <Doughnut
          data={{
            labels: ["Principal & Interest", "Property Tax"],
            datasets: [
              {
                label: "Monthly Payment Breakdown",
                data: [
                  monthlyPayment, propertyTax
                ],
                backgroundColor: ["rgb(100, 162, 235)", "rgb(255, 99, 132)", "rgb(25, 99, 1)"],
                hoverOffset: 4,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Payment Breakup",
              },
            },
          }}
        />
      </div>
      <div className="added-payments">
        <label>Principal &interest - {Math.round(monthlyPayment)}</label>
        <label>
          Property Tax:
          <input
          type="number"
          value={propertyTax} 
          onChange={handlePropertyTaxChange}
          min={0} 
          />
        </label>
      </div>
      </>
)}


export default PaymentBreakdown;
