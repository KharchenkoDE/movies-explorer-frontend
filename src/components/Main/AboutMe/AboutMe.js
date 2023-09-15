import React from 'react';
import './AboutMe.css';
import photo from '../../../images/profile.jpeg';

const AboutMe = () => {
  return (

    <section className='about-me' id='student'>
      <h2 className='about-me__title'>
        Студент
      </h2>
      <div className='about-me__section'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>
            Виталий
          </h3>
          <p className='about-me__job'>
            Фронтенд-разработчик, 30 лет
          </p>
          <p className='about-me__about'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и дочь. Я люблю слушать музыку,
            а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <div className="about-me__links">
            <a
              className="about-me__link"
              target="_blank"
              rel='noreferrer'
              href='https://github.com/KharchenkoDE'>
              Github
            </a>
          </div>
        </div>
        <img
          className="about-me__image"
          src={photo}
          alt="Фотография" />
      </div>
    </section>
  );
};

export default AboutMe;

// Доделать состояния !!!
