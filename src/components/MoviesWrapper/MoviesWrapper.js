import React, { useState, useEffect } from 'react';
import './MoviesWrapper.css';
import SearchForm from "./SearchForm/SearchForm";
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';

const loadingErrorText = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

function MoviesWrapper({ isMyMoviesPage }) {

    const [allMovies, setAllMovies] = useState(undefined);

    const [myMovies, setMyMovies] = useState(undefined);

    const [filteredMovies, setFilteredMovies] = useState(undefined);

    const [searchValue, setSearchValue] = useState('');

    const [isShort, setIsShort] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [isLoadingError, setIsLoadingError] = useState(false);

    const getMyMoviesFromApi = () => {
        mainApi.getMyMovies()
            .then(response => {
                setMyMovies(response);
                window.localStorage.setItem('myMovies', JSON.stringify(response));
                if (isMyMoviesPage) {
                    handleMoviesFilter(response);
                }
            })
            .catch(() => {
                setIsLoadingError(loadingErrorText)
                setIsLoading(false);
            })
    }

    const getMyMovies = () => {
        if (isMyMoviesPage) {
            setIsLoading(true);
        }
        if (localStorage.getItem('myMovies') === null) {
            getMyMoviesFromApi();
        } else {
            try {
                const parsedMyMovies = JSON.parse(localStorage.getItem('myMovies'));
                if(Array.isArray(parsedMyMovies)) {
                    setMyMovies(parsedMyMovies);
                    if (isMyMoviesPage) {
                        handleMoviesFilter(parsedMyMovies);
                    }
                }
            } catch {
                getMyMoviesFromApi();
            }
        } 
    };

    const compareAllMoviesWithMyMovies = (moviesAll, moviesMy) => {
        return moviesAll.map(movie => {
            if (
                moviesMy &&
                moviesMy.length &&
                moviesMy.some(myMovie => myMovie.nameRU === movie.nameRU)
            ) {
                movie.isSave = true;
                movie._id = moviesMy.find(item => item.nameRU === movie.nameRU)._id;
                return movie
            }
            return movie
        })
    };

    const getAllMovies = () => {
        moviesApi.getMovies()
            .then(response => {
                const movies = compareAllMoviesWithMyMovies(response, myMovies)
                setInLocalStaroge('allMovies', movies)
                setAllMovies(movies);
                handleMoviesFilter(movies);
            })
            .catch(() => {
                setIsLoadingError(loadingErrorText)
                setIsLoading(false);
            })
    };

    const handleAddMovie = (movie) => {
        mainApi.addNewMovie(movie)
            .then(response => {
                const newMovieList = allMovies.map(item => {
                    if (item.nameRU === response.nameRU) {
                        item.isSave = true;
                        item._id = response._id;
                        return item
                    }
                    return item
                });
                setInLocalStaroge('allMovies', newMovieList);
                const newMyMovies = [...myMovies, response];
                window.localStorage.setItem('myMovies', JSON.stringify(newMyMovies));
                setMyMovies(newMyMovies);
                handleMoviesFilter(newMovieList);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleDeleteMovie = (id) => {
        mainApi.deleteMovie(id)
            .then(response => {
                try {
                    const myMoviesFromStor = window.localStorage.getItem('myMovies');
                    const parsedValue = JSON.parse(myMoviesFromStor);
                    if(Array.isArray(parsedValue) && parsedValue.length) {
                        window.localStorage.setItem('myMovies', JSON.stringify(
                            parsedValue.filter(item => item._id !== response._id)
                        ))
                    }
                } catch {
                    window.localStorage.setItem('myMovies', JSON.stringify([]));
                }
                if (!isMyMoviesPage) {
                    const newMovieList = allMovies.map(item => {
                        if (item._id === id) {
                            item.isSave = false;
                            return item
                        }
                        return item
                    });
                    setInLocalStaroge('allMovies', newMovieList);
                    setMyMovies(newMovieList);
                    handleMoviesFilter(newMovieList);
                } else {
                    const allMoviesInLocalStorage = getFromLocalStorage('allMovies', '', [], setAllMovies, true);
                    if (allMoviesInLocalStorage.length) {
                        allMoviesInLocalStorage.map(item => {
                            if (item._id === response._id) {
                                item.isSave = false;
                                return item
                            }
                            return item
                        })
                        window.localStorage.setItem('allMovies', JSON.stringify(allMoviesInLocalStorage))
                    };
                    const allFilteredMoviesInLocalStorage = getFromLocalStorage('filteredMovies', '', [], setFilteredMovies, true);
                    if (allFilteredMoviesInLocalStorage.length) {
                        allFilteredMoviesInLocalStorage.map(item => {
                            if (item._id === response._id) {
                                item.isSave = false;
                                return item
                            }
                            return item
                        })
                        window.localStorage.setItem('filteredMovies', JSON.stringify(allFilteredMoviesInLocalStorage))
                    };
                    const newMyMovies = myMovies.filter(item => item._id !== id);
                    setMyMovies(newMyMovies);
                    handleMoviesFilter(newMyMovies);
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleMoviesFilter = (movies) => {
        const loverCaseSearch = searchValue.toLowerCase();
        const newFilteredMovies = movies.filter(item => {
            if (
                item.nameRU.toLowerCase().indexOf(loverCaseSearch) !== -1 ||
                item.nameEN.toLowerCase().indexOf(loverCaseSearch) !== -1
            ) {
                return item
            }
            return false
        });
        setFilteredMovies(newFilteredMovies);
        if (!isMyMoviesPage) {
            setInLocalStaroge('filteredMovies', newFilteredMovies)
        }
        setIsLoading(false);
    };

    const handleFormSubmit = () => {
        setIsLoadingError(false);
        setIsLoading(true);
        if (isMyMoviesPage) {
            handleMoviesFilter(myMovies);
        } else if (allMovies.length === 0) {
            getAllMovies();
        } else {
            handleMoviesFilter(allMovies);
        }
    };

    const setInLocalStaroge = (name, value) => {
        if (!isMyMoviesPage) {
            window.localStorage.setItem(name, JSON.stringify(value))
        }
    };

    const getFromLocalStorage = (name, type = '', defaultValue, setValue, isArray = false) => {
        try {
            const storageValue = localStorage.getItem(name);
            const parsedValue = JSON.parse(storageValue);
            if (!isArray) {
                const value = typeof parsedValue === type ? parsedValue : defaultValue;
                setValue(value);
                setInLocalStaroge(name, value);
                return value
            } else {
                const value = Array.isArray(parsedValue) ? parsedValue : defaultValue;
                setValue(value);
                setInLocalStaroge(name, value);
                return value
            }
        } catch {
            setValue(defaultValue);
            setInLocalStaroge(name, defaultValue);
            return defaultValue
        }

    };

    useEffect(() => {
        getMyMovies();
        if (!isMyMoviesPage) {
            getFromLocalStorage('searchValue', 'string', '', setSearchValue);
            getFromLocalStorage('isShort', 'boolean', false, setIsShort);
            getFromLocalStorage('allMovies', '', [], setAllMovies, true);
            getFromLocalStorage('filteredMovies', '', [], setFilteredMovies, true);
        }
    }, []);

    return (
        <div className='movies__wrapper'>
            <SearchForm
                searchValue={searchValue}
                handleChangeSearchValue={(value) => {
                    setInLocalStaroge('searchValue', value)
                    setSearchValue(value);
                }}
                isShortMovie={isShort}
                onSearchFormsubmit={handleFormSubmit}
                handleChangeIsShort={() => {
                    const currentIsShort = isShort;
                    setInLocalStaroge('isShort', !currentIsShort)
                    setIsShort(prevState => !prevState)
                }}
            />
            {
                isLoadingError ?
                    <>
                        <p>{loadingErrorText}</p>
                    </>
                    :
                    <>
                        {isMyMoviesPage ?
                            <>
                                {isLoading ? <Preloader /> :
                                    <>
                                        {filteredMovies && filteredMovies.length ?
                                            <MoviesCardList
                                                isMyMoviesPage={isMyMoviesPage}
                                                movies={filteredMovies}
                                                isShort={isShort}
                                                handleAddMovie={handleAddMovie}
                                                handleDeleteMovie={handleDeleteMovie}
                                            />
                                            : <p>Ничего не найдено</p>}
                                    </>
                                }
                            </>
                            :
                            <>
                                {isLoading ? <Preloader /> :
                                    <>
                                        {filteredMovies && filteredMovies.length ?
                                            <MoviesCardList
                                                isMyMoviesPage={isMyMoviesPage}
                                                movies={filteredMovies}
                                                isShort={isShort}
                                                handleAddMovie={handleAddMovie}
                                                handleDeleteMovie={handleDeleteMovie}
                                            />
                                            :
                                            <>
                                                <p>Ничего не найдено</p>
                                            </>
                                        }
                                    </>
                                }
                            </>

                        }
                    </>
            }
        </div>
    );
}

export default MoviesWrapper;