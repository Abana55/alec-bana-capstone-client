import './Header.scss';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../assets/summa-high-resolution-logo-transparent.png';
import HomeLoans from '../HomeLoans/HomeLoans';
import NavModal from '../DropDown/DropDown';

function Header() {
    const location = useLocation();

    const warehouseIsActive = () => {
        return location.pathname === '/' || location.pathname.startsWith('/warehouses');
    };

    const inventoryIsActive = () => {
        return location.pathname.startsWith('/inventory');
    };

    return (
        <header>
            <section className='header'>
                <NavLink className='header__logo' to="/">
                </NavLink>
                <NavLink className='header__logo' to="/">
                    <img className='header__img' src={Logo} alt='header-Logo'></img>
                </NavLink>
                <div>
                    <ul className='header__links'>
                        <li>
                            <NavLink to='/' className={` ${warehouseIsActive() ? 'active' : ''}`}>
                                Login
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink to='/Homeloans' className={`${HomeLoans() ? 'active' : ''}`}>
                                Calculators
                            </NavLink>
                        </li> */}
                        <NavModal/>
                        
                    </ul>
                </div>
            </section>
        </header>
    );
}

export default Header;