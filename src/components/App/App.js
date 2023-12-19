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

import './App.css';

function App() {
    const [currentUser, setCurrentUser] = useState({
        name: '',
        email: '',
    });

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const [signError, setSignError] = useState('');

    const [isUpdateSuccess, setIsUpdateSucess] = useState(undefined);

    const navigate = useNavigate();

    function handleLoginUser(userData) {
        auth.loginUser(userData.email, userData.password)
            .then((data) => {
                if (data.token) {
                    setIsLoggedIn(true);
                    localStorage.setItem("jwt", data.token);
                    handleTokenCheck();
                    navigate('/movies', { replace: true });
                }
            })
            .catch(() => {
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
            .catch(() => {
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
        setIsUpdateSucess(undefined);
        auth.setUserInfo(userData)
            .then(response => {
                setCurrentUser(response);
                setIsUpdateSucess(true);
            })
            .catch(() => setIsUpdateSucess(false))
    }

    function handleSignOut() {
        localStorage.removeItem("jwt");
        setCurrentUser({
            name: '',
            email: '',
        })
        setIsUpdateSucess(undefined);
        setIsLoggedIn(false);
        navigate('/', { replace: true });
        localStorage.removeItem('searchValue');
        localStorage.removeItem('filteredMovies');
        localStorage.removeItem('allMovies');
        localStorage.removeItem('isShort');
        localStorage.removeItem('myMovies');
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
                                isUpdateSuccess={isUpdateSuccess}
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
                            <ProtectedRoute
                                element={Register}
                                isLoggedIn={!isLoggedIn}
                                onRegister={handleRegUser}
                                signError={signError}
                                setSignError={setSignError}
                            />
                        }
                    />
                    <Route
                        path='/signin'
                        element={
                            <ProtectedRoute
                                element={Login}
                                isLoggedIn={!isLoggedIn}
                                onLogin={handleLoginUser}
                                signError={signError}
                                setSignError={setSignError}
                            />
                        }
                    />
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
