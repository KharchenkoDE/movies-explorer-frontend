import React from 'react';
import './Techs.css'

function Techs() {
  return (
    <section className='techs' id='techs'>
      <h2 className='techs__title'>
        Технологии
      </h2>
      <h3 className='techs__subtitle'>
        7 технологий
      </h3>
      <p className='techs__paragraph'>
        На курсе веб-разработки мы освоили технологии,
        которые применили в дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className='techs__unit'>
          HTML</li>
        <li className='techs__unit'>
          CSS
        </li>
        <li className='techs__unit'>
          JS
        </li>
        <li className='techs__unit'>
          React
        </li>
        <li className='techs__unit'>
          Git
        </li>
        <li className='techs__unit'>
          Express.js
        </li>
        <li className='techs__unit'>
          mongoDB
        </li>
      </ul>
    </section>
  );
}

export default Techs;
