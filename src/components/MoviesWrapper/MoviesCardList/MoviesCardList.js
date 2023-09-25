import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import ButtonLoadMore from '../ButtonLoadMore/ButtonLoadMore'

const countersFromSize = {
  'desktop': 12,
  'tablet': 8,
  'mobile': 5,
};

const stepFromSize = {
  'desktop': 3,
  'tablet': 2,
  'mobile': 2,
};

function MoviesCardList({ isMyMoviesPage, movies, isShort, handleAddMovie, handleDeleteMovie }) {

  const [currentSize, setCurrentSize] = useState('desktop');

  const [stepLoadMore, setStepLoadMore] = useState(stepFromSize.desktop);

  const [visibleCardsLength, setVisibleCardsLength] = useState(countersFromSize.desktop)

  const [isAllCardsLoaded, setIsAllCardsLoaded] = useState(false);

  useEffect(() => {

    const setParamsFromSize = (size) => {
      setStepLoadMore(stepFromSize[size]);
      setVisibleCardsLength(countersFromSize[size]);
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
    setVisibleCardsLength(countersFromSize.desktop);
    setIsAllCardsLoaded(getFilteredByDurationList().length <= countersFromSize[currentSize]);
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
    if(getFilteredByDurationList().length <= countersFromSize[currentSize]) {
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
              getFilteredByDurationList()
              .slice(0, visibleCardsLength)
              .map(movie => (
                <MoviesCard
                  isMyMoviesPage={isMyMoviesPage}
                  movie={movie}
                  key={movie.nameEN}
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
              ))}
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
