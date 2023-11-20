import './Header.scss';
import { NavLink, useLocation } from 'react-router-dom';

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
                <h2 className='header__title'>Summa</h2>
                <div>
                    <ul className='header__links'>
                        <li>
                            <NavLink to='/' className={`header__links-warehouses ${warehouseIsActive() ? 'active' : ''}`}>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/inventory' className={`header__links-inventory ${inventoryIsActive() ? 'active' : ''}`}>
                                Calculators
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </section>
        </header>
    );
}

export default Header;