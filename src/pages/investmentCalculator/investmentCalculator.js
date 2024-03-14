import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./InvestmentCalculator.scss";

function InvestmentCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);
  const [expenseRatio, setExpenseRatio] = useState(0.35);
  const [interestRate, setInterestRate] = useState(0.04);
  const [loanTerm, setLoanTerm] = useState(30);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(30);
  const [occupancyRate, setOccupancyRate] = useState(0.95);
  const [formMode, setFormMode] = useState("advanced");
  const [isPurchasePriceFocused, setIsPurchasePriceFocused] = useState(false);
  const [isRentalIncomeFocused, setIsRentalIncomeFocused] = useState(false);
  const [isExpenseRatioFocused, setIsExpenseRatioFocused] = useState(false);
  const [isInterestRateFocused, setIsInterestRateFocused] = useState(false);
  const [isDownPaymentPercentageFocused, setIsDownPaymentPercentageFocused] =
    useState(false);

  const handleRentalIncomeFocus = () => setIsRentalIncomeFocused(true);
  const handleRentalIncomeBlur = () => setIsRentalIncomeFocused(false);

  const handleExpenseRatioFocus = () => setIsExpenseRatioFocused(true);
  const handleExpenseRatioBlur = () => setIsExpenseRatioFocused(false);

  const handleInterestRateFocus = () => setIsInterestRateFocused(true);
  const handleInterestRateBlur = () => setIsInterestRateFocused(false);

  const handleDownPaymentPercentageFocus = () =>
    setIsDownPaymentPercentageFocused(true);
  const handleDownPaymentPercentageBlur = () =>
    setIsDownPaymentPercentageFocused(false);

  const handlePurchasePriceFocus = () => {
    setIsPurchasePriceFocused(true);
  };

  const handlePurchasePriceBlur = () => {
    setIsPurchasePriceFocused(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const calculateMetrics = () => {
    const annualRentalIncome = rentalIncome * 12 * occupancyRate;
    const operatingExpenses = annualRentalIncome * expenseRatio;
    const noi = annualRentalIncome - operatingExpenses;
    const capRate = (noi / purchasePrice) * 100;

    const downPayment = purchasePrice * (downPaymentPercentage / 100);
    const loanAmount = purchasePrice - downPayment;
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyMortgagePayment =
      (loanAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    const annualMortgagePayment = monthlyMortgagePayment * 12;

    const annualCashFlow = noi - annualMortgagePayment;
    const roi = (annualCashFlow / downPayment) * 100;

    return {
      noi,
      annualMortgagePayment,
      downPayment,
      capRate,
      annualCashFlow,
      roi,
    };
  };

  const {
    noi,
    annualMortgagePayment,
    downPayment,
    capRate,
    annualCashFlow,
    roi,
  } = calculateMetrics();
  const years = Array.from({ length: loanTerm }, (_, i) => `Year ${i + 1}`);

  const incomeData = Array.from(
    { length: loanTerm },
    (_, i) => rentalIncome * 12 * Math.pow(1.05, i)
  );
  const expensesData = Array.from(
    { length: loanTerm },
    (_, i) => incomeData[i] * expenseRatio
  );
  const noiData = incomeData.map(
    (income, index) => income - expensesData[index]
  );

  const capRateData = noiData.map((noi) => (noi / purchasePrice) * 100);
  const roiData = noiData.map(
    (noi, index) => ((noi - annualMortgagePayment) / downPayment) * 100
  );

  const graphDataNOI = {
    labels: years,
    datasets: [
      {
        label: "Gross Rental Income",
        data: incomeData,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Operating Expenses",
        data: expensesData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Net Operating Income",
        data: noiData,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const graphDataMetrics = {
    labels: years,
    datasets: [
      {
        label: "Cap Rate",
        data: capRateData,
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
      {
        label: "ROI",
        data: roiData,
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
    ],
  };

  const toggleFormMode = () => {
    const newMode = formMode === "advanced" ? "simple" : "advanced";
    setFormMode(newMode);
    console.log("Form mode set to:", newMode);
  };

  const formattedAnnualCashFlow = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(annualCashFlow);

  const formattedCapRate = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(capRate / 100);

  const formattedROI = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(roi / 100);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatPercentage = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  return (
    <div className="investment-calculator">
      <h2 className="investment-calculator__title">
        Real Estate Investment Calculator
      </h2>
      <div className="investment-calculator__content">
        <form className="investment-calculator__form">
          <div className="investment-calculator__form-group">
            {/* Common fields */}
            <label className="investment-calculator__form-label">
              Purchase Price:
              <input
                type="text"
                className="investment-calculator__form-input"
                value={
                  isPurchasePriceFocused
                    ? purchasePrice
                    : formatCurrency(purchasePrice)
                }
                onChange={(e) =>
                  setPurchasePrice(
                    Number(e.target.value.replace(/[^0-9.-]+/g, ""))
                  )
                }
                onFocus={handlePurchasePriceFocus}
                onBlur={handlePurchasePriceBlur}
              />
            </label>
            <label className="investment-calculator__form-label">
              Monthly Rental Income:
              <input
                type="text"
                className="investment-calculator__form-input"
                value={
                  isRentalIncomeFocused
                    ? rentalIncome
                    : formatCurrency(rentalIncome)
                }
                onChange={(e) =>
                  setRentalIncome(
                    Number(e.target.value.replace(/[^0-9.-]+/g, ""))
                  )
                }
                onFocus={handleRentalIncomeFocus}
                onBlur={handleRentalIncomeBlur}
              />
            </label>

            {/* Advanced fields */}
            {formMode === "advanced" && (
              <>
                <label className="investment-calculator__form-label">
                  Expense Ratio:
                  <input
                    type="text"
                    className="investment-calculator__form-input"
                    value={
                      isExpenseRatioFocused
                        ? expenseRatio
                        : formatPercentage(expenseRatio)
                    }
                    onChange={(e) =>
                      setExpenseRatio(
                        Number(e.target.value.replace(/[^0-9.-]+/g, ""))
                      )
                    }
                    onFocus={handleExpenseRatioFocus}
                    onBlur={handleExpenseRatioBlur}
                  />
                </label>
                <label className="investment-calculator__form-label">
                  Interest Rate:
                  <input
                    type="text"
                    className="investment-calculator__form-input"
                    value={
                      isInterestRateFocused
                        ? interestRate
                        : formatPercentage(interestRate)
                    }
                    onChange={(e) =>
                      setInterestRate(
                        Number(e.target.value.replace(/[^0-9.-]+/g, ""))
                      )
                    }
                    onFocus={handleInterestRateFocus}
                    onBlur={handleInterestRateBlur}
                  />
                </label>
                <label className="investment-calculator__form-label">
                  Down Payment Percentage:
                  <input
                    type="text"
                    className="investment-calculator__form-input"
                    value={
                      isDownPaymentPercentageFocused
                        ? downPaymentPercentage
                        : formatPercentage(downPaymentPercentage)
                    }
                    onChange={(e) =>
                      setDownPaymentPercentage(
                        Number(e.target.value.replace(/[^0-9.-]+/g, ""))
                      )
                    }
                    onFocus={handleDownPaymentPercentageFocus}
                    onBlur={handleDownPaymentPercentageBlur}
                  />
                </label>
              </>
            )}
          </div>
        </form>
        <button
          type="button"
          className="investment-calculator__toggle"
          onClick={() =>
            setFormMode(formMode === "advanced" ? "simple" : "advanced")
          }
        >
          {formMode === "advanced" ? "Switch to Simple" : "Switch to Advanced"}
        </button>
        <div className="investment-calculator__results">
          <p>Cap Rate: {formattedCapRate}</p>
          <p>Annual Cash Flow: {formattedAnnualCashFlow}</p>
          <p>ROI: {formattedROI}</p>
        </div>
      </div>
      <div className="investment-calculator__graphs">
        <div className="investment-calculator__graph">
          <h3>Income and Expenses</h3>
          <Line data={graphDataNOI} options={{ responsive: true }} />
        </div>
        <div className="investment-calculator__graph">
          <h3>Investment Metrics</h3>
          <Line data={graphDataMetrics} options={{ responsive: true }} />
        </div>
      </div>

      <div className="calculator-terms">
        <h3>Terms and Definitions</h3>
        <Slider {...sliderSettings}>
          <p>
            <strong>Cap Rate (Capitalization Rate):</strong> A measure of the
            potential return on a real estate investment, calculated as the Net
            Operating Income divided by the purchase price.
          </p>
          <p className="calculator-formula">
            Formula: Cap Rate = (NOI / Purchase Price) * 100
          </p>

          <div className="calculator-term">
            <p>
              <strong>Net Operating Income (NOI):</strong> The total income
              generated by the property minus operating expenses.
            </p>
            <p className="calculator-formula">
              Formula: NOI = Gross Rental Income - Operating Expenses
            </p>
          </div>
          <div className="calculator-term">
            <p>
              <strong>ROI (Return on Investment):</strong> A measure of the
              profitability of an investment, calculated as the net profit
              divided by the initial investment cost.
            </p>
            <p className="calculator-formula">
              Formula: ROI = (Annual Cash Flow / Down Payment) * 100
            </p>
          </div>
          <li>
            <strong>Expense Ratio:</strong> The ratio of operating expenses to
            the gross income of the property, indicating the efficiency of
            property management.
            <br />
            <em>
              Formula: Expense Ratio = Operating Expenses / Gross Rental Income
            </em>
          </li>
          <li>
            <strong>Interest Rate:</strong> The percentage charged on the
            borrowed capital, affecting the monthly mortgage payments.
          </li>
          <li>
            <strong>Loan Term:</strong> The duration over which the loan is
            scheduled to be repaid, typically expressed in years.
          </li>
          <li>
            <strong>Down Payment Percentage:</strong> The portion of the
            property's purchase price paid upfront, expressed as a percentage of
            the total price.
          </li>
          <li>
            <strong>Occupancy Rate:</strong> The ratio of rented or used space
            to the total available space, indicating the property's ability to
            attract and retain tenants.
          </li>
        </Slider>
      </div>
    </div>
  );
}

export default InvestmentCalculator;
