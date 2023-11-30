import React from 'react';
import './Footer.scss';
import facebook from '../../assets/Icon-facebook.svg'
import twitter from '../../assets/Icon-twitter.svg'
import instagram from '../../assets/Icon-instagram.svg'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__left">
          <h2 className="footer__left__name">Summa</h2>
          <p>&copy; 2023 Summa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;