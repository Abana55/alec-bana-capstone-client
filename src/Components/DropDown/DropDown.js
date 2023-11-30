import "./DropDown.scss";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function CustomDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <button 
      className="custom-dropdown__button" 
      onClick={handleDropdownToggle}>
        Dropdown
      </button>
      {dropdownOpen && (
        <div className="custom-dropdown__content" onMouseLeave={handleDropdownClose}>
          <NavLink
            to="/HomeLoans"
            className="custom-dropdown__link"
            activeClassName="active"
          >
            Mortgage Calculator
          </NavLink>
          <NavLink
            to="/autoLoans"
            className="custom-dropdown__link"
            activeClassName="active"
          >
            Auto Loans
          </NavLink>
          <NavLink
            to="/inflation-calculator"
            className="custom-dropdown__link"
            activeClassName="active"
          >
            Inflation Calculator
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;