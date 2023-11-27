import './Header.scss';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/summa-high-resolution-logo-transparent.png';
import NavModal from '../DropDown/DropDown';

function Header() {

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
                        <button>
                            <NavLink to='/' className={` [] ? 'active' : ''}`}>
                                Login
                            </NavLink>
                        </button>
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