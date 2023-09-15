import React from 'react';
import './Portfolio.css';
import goLink from '../../../images/text__COLOR_font-main.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>
        Портфолио
      </h2>
      <ul className='portfolio__container'>
        <li className='portfolio__unit'>
          <a
            className='portfolio__link'
            href='https://github.com/KharchenkoDE/how-to-learn'
            target='_blank' >
            Статичный сайт
            <img
              className='portfolio__go-link'
              src={goLink}
              alt='Ссылка на статичный сайт' />
          </a>
        </li>
        <li className='portfolio__unit'>
          <a
            className='portfolio__link'
            href='https://github.com/KharchenkoDE/russian-travel'
            target='_blank' >
            Адаптивный сайт
            <img
              className='portfolio__go-link'
              src={goLink}
              alt='Ссылка на адаптивный сайт' />
          </a>
        </li>
        <li className='portfolio__unit'>
          <a
            className='portfolio__link'
            href='https://github.com/KharchenkoDE/react-mesto-api-full-gha'
            target='_blank'>
            Одностраничное приложение
            <img
              className='portfolio__go-link'
              src={goLink}
              alt='Ссылка на одностраничное приложение' />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
