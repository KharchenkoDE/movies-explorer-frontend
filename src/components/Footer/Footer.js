import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__container'>
        <p className="footer__copyright">
          © 2023
        </p>
        <ul className="footer__links">
          <li>
            <a
              rel="noreferrer"
              className="footer__link"
              href="https://practicum.yandex.ru/"
              target='_blank'>
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              rel="noreferrer"
              className="footer__link"
              href="https://github.com/KharchenkoDE"
              target='_blank'>
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
