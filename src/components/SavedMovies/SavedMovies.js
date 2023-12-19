import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesWrapper from '../MoviesWrapper/MoviesWrapper';

function SavedMovies({ isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='saved-movies'>
        <MoviesWrapper isMyMoviesPage={true} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
