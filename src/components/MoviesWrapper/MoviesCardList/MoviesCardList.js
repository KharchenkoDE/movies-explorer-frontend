import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import ButtonLoadMore from '../ButtonLoadMore/ButtonLoadMore'
import {COUNTERS_FROM_SIZE, STEP_FROM_SIZE} from '../../../config';

function MoviesCardList({ isMyMoviesPage, movies, isShort, handleAddMovie, handleDeleteMovie }) {

  const [currentSize, setCurrentSize] = useState('desktop');

  const [stepLoadMore, setStepLoadMore] = useState(STEP_FROM_SIZE.desktop);

  const [visibleCardsLength, setVisibleCardsLength] = useState(COUNTERS_FROM_SIZE.desktop)

  const [isAllCardsLoaded, setIsAllCardsLoaded] = useState(false);

  useEffect(() => {

    const setParamsFromSize = (size) => {
      setStepLoadMore(STEP_FROM_SIZE[size]);
      setVisibleCardsLength(COUNTERS_FROM_SIZE[size]);
    };

    const handleResize = () => {
      if(currentSize !== 'desktop' && window.innerWidth >= 768) {
        setCurrentSize('desktop');
        setParamsFromSize('desktop');
      } else if(currentSize !== 'tablet' && window.innerWidth < 768 && window.innerWidth >= 541) {
        setCurrentSize('tablet')
        setParamsFromSize('tablet');
      } else if(currentSize !== 'mobile' && window.innerWidth < 541) {
        setCurrentSize('mobile');
        setParamsFromSize('mobile');
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [currentSize])

  const getFilteredByDurationList = () => {
    return movies.filter(item => {
      if (isShort) {
        return item.duration <= 40
      }
      return item
    })
  }

  const clearParams = () => {
    setVisibleCardsLength(COUNTERS_FROM_SIZE.desktop);
    setIsAllCardsLoaded(getFilteredByDurationList().length <= COUNTERS_FROM_SIZE[currentSize]);
  }

  useEffect(() => {
    clearParams();
  }, []);

  useEffect(() => {
    clearParams();
  }, [movies]);

  const handleButtonClick = () => {
    const newLength = visibleCardsLength + stepLoadMore;
    if (newLength >= movies.length) {
      setIsAllCardsLoaded(true);
    }
    setVisibleCardsLength(newLength);
  };

  useEffect(() => {
    if(getFilteredByDurationList().length <= COUNTERS_FROM_SIZE[currentSize]) {
      setIsAllCardsLoaded(true);
    } else {
      setIsAllCardsLoaded( visibleCardsLength >= movies.length)
    }
  }, [isShort]);

  return (
    <section className='galery'>
      {movies && movies.length &&
        <>
          <div className='galery__items'>
            {
              getFilteredByDurationList().length ?
              getFilteredByDurationList()
              .slice(0, visibleCardsLength)
              .map(movie => (
                <MoviesCard
                  isMyMoviesPage={isMyMoviesPage}
                  movie={movie}
                  key={movie.id}
                  handleClickSave={(movie) => {
                    handleAddMovie(
                      {
                        country: movie.country,
                        director: movie.director,
                        duration: movie.duration,
                        year: movie.year,
                        description: movie.director,
                        image: `https://api.nomoreparties.co${movie.image.url}`,
                        trailerLink: movie.trailerLink,
                        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
                        movieId: movie.id,
                        nameRU: movie.nameRU,
                        nameEN: movie.nameEN,
                      }
                    )
                  }}
                  handleClickDelete={(movieId) => {
                    handleDeleteMovie(movieId)
                  }}
                />
              )) : <p>Ничего не найдено</p>}
          </div>
          {
            !isMyMoviesPage && !isAllCardsLoaded &&
            <ButtonLoadMore onClick={() => handleButtonClick()}/>
          }

        </>
      }
    </section>
  );
}

export default MoviesCardList;
