import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/summa-high-resolution-logo-white-transparent.png';
import CustomDropdown from '../DropDown/DropDown'; 
import './Header.scss';

function Header() {
    return (
        <header>
            <section className="header">
                <NavLink className="header__logo" to="/">
                    <img className="header__img" src={Logo} alt="header-Logo" />
                </NavLink>
                <div className="header__box">
                    <NavLink to="/login" className="header__login">
                        Login
                    </NavLink>
                    <CustomDropdown /> 
                </div>
            </section>
            
        </header>
    );
}

export default Header;