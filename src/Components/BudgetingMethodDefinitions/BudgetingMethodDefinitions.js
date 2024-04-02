import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BudgetingMethodDefinitions.scss";

function BudgetingMethodDefinitions() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="budgeting-method-definitions">
      <h2 className="budgeting-method-definitions__title">
        Budgeting Method Definitions and Benefits
      </h2>
      <Slider {...sliderSettings}>
        <div className="budgeting-method-definitions__card">
          <p>
            <strong>50/30/20 Rule:</strong> A simple and straightforward method
            that divides your after-tax income into three categories:
            necessities, wants, and savings. It's beneficial for those who want
            a balanced approach to budgeting without strict constraints.
          </p>
        </div>
        <div className="budgeting-method-definitions__card">
          <p>
            <strong>Zero-Based Budgeting:</strong> Every dollar of income is
            assigned a specific purpose, whether it's spending or saving,
            ensuring that your income minus your expenses equals zero. This
            method is beneficial for those who want to have complete control
            over their finances and avoid overspending.
          </p>
        </div>
        <div className="budgeting-method-definitions__card">
          <p>
            <strong>Pay Yourself First:</strong> Prioritizes saving by setting
            aside a portion of your income for savings or investments before
            allocating money to other expenses. It's beneficial for those who
            want to ensure they consistently save a portion of their income.
          </p>
        </div>
        <div className="budgeting-method-definitions__card">
          <p>
            <strong>70/20/10 Rule:</strong> Similar to the 50/30/20 rule, but
            with a focus on allocating more towards living expenses and less
            towards wants. It's beneficial for those who have higher living
            costs or are focused on debt repayment.
          </p>
        </div>
      </Slider>
    </div>
  );
}

export default BudgetingMethodDefinitions;
