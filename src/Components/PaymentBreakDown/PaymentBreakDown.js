import { Doughnut } from "react-chartjs-2";
import React, { useState } from "react";

const PaymentBreakdown =({monthlyPayment}) => {
    const [propertyTax, setPropertyTax] = useState(0);

    const handlePropertyTaxChange = (event) => {
        setPropertyTax(Number(event.target.value));
    };
    return(
        <>
        <div className="donut">
        <Doughnut
          data={{
            labels: ["Principal", "Interest", "Property Tax"],
            datasets: [
              {
                label: "Monthly Payment Breakdown",
                data: [
                  monthlyPayment, propertyTax
                ],
                backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
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
          onChange={handlePropertyTaxChange}
          type="number"
          min={0}
          value={propertyTax}
          />
        </label>
      </div>
      </>
)}
