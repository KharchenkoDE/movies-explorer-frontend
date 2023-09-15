import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import savePic from '../../../images/save-btn (movies-card).svg';
import savedPic from '../../../images/saved-btn (movies-card).svg';
import deletePic from '../../../images/delete-btn (movies-card).svg';

function MoviesCard({ link, name, timeOfTheFilm, isSave }) {
  const location = useLocation();

  return (
    <div className='movies-card'>
      <a
        className='movies-card__link'
        href='заглушка'
        target='_blank' >
        <img
          src={link}
          className='movies-card__image' 
          alt={name} />
      </a>
      <div className='movies-card__info'>
        <h2 className='movies-card__title'>
          {name}
        </h2>
        <span className='movies-card__time'>
          {timeOfTheFilm}
        </span>
      </div>
      {location.pathname === '/movies' &&
        <button
          className={isSave ? 'movies-card__btn-save' : 'movies-card__btn-saved'}
          type='button'>{isSave ?
            <img className="movies-card__btn-save-pic"
              alt='добавить в сохраненные'
              src={savePic} /> :
            <img
              className='movies-card__btn-saved-pic'
              alt='добавлено в сохраненные'
              src={savedPic} />}
        </button>
      }
      {location.pathname === '/saved-movies' &&
        <button
          className='movies-card__btn-delete'
          type='button'>
          <img
            className='movies-card__btn-delete-pic'
            alt='удалить'
            src={deletePic} />
        </button>
      }
    </div>
  );
}

export default MoviesCard;
