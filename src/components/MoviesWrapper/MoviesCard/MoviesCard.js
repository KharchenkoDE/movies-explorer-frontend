import React from 'react';
import './MoviesCard.css';
import savePic from '../../../images/save-btn (movies-card).svg';
import savedPic from '../../../images/saved-btn (movies-card).svg';
import deletePic from '../../../images/delete-btn (movies-card).svg';

function MoviesCard({ movie, handleClickSave, handleClickDelete, isMyMoviesPage }) {

  const getFormattedDuration = (duration) => {
    const hour = Math.floor(duration / 60)
    return `${hour !== 0 ? `${hour}ч ` : ''}${duration % 60}м`
  }

  const handleClickButton = (like) => {
    if(like) {
      handleClickSave(movie);
    } else {
      handleClickDelete(movie._id);
    }
  }

  return (
    <div className='movies-card'>
      <a
        href={movie.trailerLink}
        rel="noreferrer"
        target='_blank' >
        <img
          src={isMyMoviesPage ? movie.image : `https://api.nomoreparties.co${movie.image.url}`}
          className='movies-card__image' 
          alt={movie.nameRU} />
      </a>
      <div className='movies-card__info'>
        <h2 className='movies-card__title'>
          {movie.nameRU}
        </h2>
        <span className='movies-card__time'>
          {getFormattedDuration(movie.duration)}
        </span>
      </div>
      {!isMyMoviesPage &&
        <button
          onClick={() => handleClickButton(movie.isSave ? false : true)}
          className={movie.isSave ? 'movies-card__btn-saved' : 'movies-card__btn-save'}
          type='button'>{movie.isSave ?
            <img className="movies-card__btn-saved-pic"
              alt='добавлено в сохраненные'
              src={savedPic} /> :
            <img
              className='movies-card__btn-save-pic'
              alt='добавить в сохраненные'
              src={savePic} />}
        </button>
      }
      {isMyMoviesPage &&
        <button
          onClick={() => handleClickDelete(movie._id)}
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
