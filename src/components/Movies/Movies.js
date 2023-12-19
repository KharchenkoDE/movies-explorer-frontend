import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesWrapper from '../MoviesWrapper/MoviesWrapper';

function Movies({ isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='movies'>
        <MoviesWrapper isMyMoviesPage={false} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;