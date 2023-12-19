import React from 'react';
import './AboutProject.css'

function AboutProject() {
  return (

    <section className='about-project' id='about-project'>
      <h2 className='about-project__title'>
        О проекте
      </h2>
      <div className='about-project__content'>
        <div className='about-project__description'>
          <h3 className='about-project__subtitle'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__info'>
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__description'>
          <h3 className='about-project__subtitle'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__info'>
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__columns'>
        <div className='about-project__first-column'>
          <p className='about-project__first-column-title'>
            1 неделя
          </p>
          <p className='about-project__column-subtitle'>
            Back-end
          </p>
        </div>
        <div className='about-project__second-column'>
          <p className='about-project__second-column-title'>
            4 недели
          </p>
          <p className='about-project__column-subtitle'>
            Front-end
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
