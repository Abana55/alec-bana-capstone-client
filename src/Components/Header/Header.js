import "./Header.scss";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/summa-high-resolution-logo-white-transparent.png";
import NavModal from "../DropDown/DropDown";

function Header() {
  return (
    <header>
      <section className="header">
        <NavLink className="header__logo" to="/"></NavLink>
        <NavLink className="header__logo" to="/">
          <img className="header__img" src={Logo} alt="header-Logo"></img>
        </NavLink>
        <div className="header__box">
            <button className="header__login">
              <NavLink to="/" className={` [] ? 'active' : ''}`}>
                Login
              </NavLink>
            </button>
            <NavModal className="header__drop" />
        </div>
      </section>
    </header>
  );
}

export default Header;
