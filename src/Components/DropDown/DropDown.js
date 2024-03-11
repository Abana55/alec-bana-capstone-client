import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './DropDown.scss';

function CustomDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="custom-dropdown">
            <button onClick={toggleDropdown} className="custom-dropdown__button">
                Dropdown
            </button>
            {isOpen && (
                <div className="custom-dropdown__content">
                    <NavLink to="/HomeLoans" className="custom-dropdown__link">
                        Mortgage Calculator
                    </NavLink>
                    <NavLink to="/AutoLoans" className="custom-dropdown__link">
                        Auto Loans
                    </NavLink>
                    <NavLink to="/InflationCalculator" className="custom-dropdown__link">
                        Inflation Calcul
                    </NavLink>
                    <NavLink to="/InvestmentCalculator" className="custom-dropdown__link">
                        Investment Calculator
                    </NavLink>
                </div>
            )}
        </div>
    );
}

export default CustomDropdown;