import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import * as auth from '../../utils/MainApi';
import { getErrorMessage } from '../../utils/getErrorMessage';

import './App.css';

function App() {
    const [currentUser, setCurrentUser] = useState({
        name: '',
        email: '',
    });
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const [signError, setSignError] = useState('');

    const navigate = useNavigate();

    function handleLoginUser(userData) {
        auth.loginUser(userData.email, userData.password)
            .then((data) => {
                if (data.token) {
                    setIsLoggedIn(true);
                    localStorage.setItem("jwt", data.token);
                    navigate('/movies', { replace: true });
                }
            })
            .catch((err) => {
                setSignError('Произошла ошибка');
            })
    }


    function handleRegUser(regData) {
        auth.regUser(regData)
            .then((data) => {
                if (data) {
                    handleLoginUser({
                        email: regData.email,
                        password: regData.password
                    })
                }
            })
            .catch((err) => {
                setSignError('Произошла ошибка');
            })
    }

    function handleTokenCheck() {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            auth.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setCurrentUser({
                            name: res.data.name,
                            email: res.data.email,
                        });
                        setIsLoggedIn(true);
                    }
                })
                .catch((err) => {
                    setIsLoggedIn(false);
                });
        } else {
            setIsLoggedIn(false);
        }
    }

    function handleChangeProfile(userData) {
        auth.setUserInfo(userData)
            .then(response => {
                setCurrentUser(response);
            })
            .catch((err) => console.log(err))
    }

    function handleSignOut() {
        localStorage.removeItem("jwt");
        setCurrentUser({
            name: '',
            email: '',
        })
        setIsLoggedIn(false);
        navigate('/', { replace: true });
        localStorage.removeItem('searchValue');
        localStorage.removeItem('filteredMovies');
        localStorage.removeItem('allMovies');
        localStorage.removeItem('isShort');
    };

    useEffect(() => {
        handleTokenCheck();
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='App'>
                <Routes>
                    <Route
                        path='/*'
                        element={<Page404 />}
                    />
                    <Route
                        path='/movies'
                        element={
                            <ProtectedRoute
                                element={Movies}
                                isLoggedIn={isLoggedIn}

                            />
                        }
                    />
                    <Route
                        path='/saved-movies'
                        element={<ProtectedRoute
                            element={SavedMovies}
                            isLoggedIn={isLoggedIn} />}
                    />
                    <Route
                        path='/profile'
                        element={
                            <ProtectedRoute
                                element={Profile}
                                isLoggedIn={isLoggedIn}
                                handleChangeProfile={handleChangeProfile}
                                onSignOut={handleSignOut}
                            />
                        }
                    />
                    <Route
                        path='/'
                        element={
                            <Main isLoggedIn={isLoggedIn} />
                        }
                    />
                    <Route
                        path='/signup'
                        element={
                            <Register onRegister={handleRegUser} signError={signError} setSignError={setSignError} />
                        }
                    />
                    <Route
                        path='/signin'
                        element={
                            <Login onLogin={handleLoginUser} signError={signError} setSignError={setSignError} />
                        }
                    />
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
