import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList() {
  const location = useLocation();
  const movies = [
    {
      link: 'https://gamebomb.ru/files/galleries/001/c/c3/281019_w350_h250_f.jpg',
      name: 'Начало',
      timeOfTheFilm: '2ч 49м',
      isSave:'',
    },
    {
      link: 'https://avatars.dzeninfra.ru/get-zen_doc/1937051/pub_5cbc8cc1569af600b33b2544_5cbc8f1072ca0a00b26c95e3/scale_1200',
      name: 'Остров проклятых',
      timeOfTheFilm: '3ч 0м',
      isSave: '+',
    },
    {
      link: 'https://www.meme-arsenal.com/memes/4741d08fbf5805a355f334551877ab31.jpg',
      name: 'Джанго освобожденный',
      timeOfTheFilm: '2ч 45м',
      isSave: '+',
    },
    {
      link: 'https://smart-lab.ru/uploads/images/01/82/58/2014/11/02/df428f.jpg',
      name: 'Волк с Уолл-Стрит',
      timeOfTheFilm: '3ч 0м',
      isSave:'+',
    },
    {
      link: 'https://imgprx.livejournal.net/3395206065eef0e43bfb3d9fac3493e03b15ff74/VRH8fIsaC24cpAb_Jo0ujS4XE_Ezo7NLBa8wcvbl5lcXTyOnFu6w7bkF5XIs0ZP3_3xsrjvuMoHMohgMv3y94s0uF-rZ-G9-dMRvVNQjAKM',
      name: 'Выживший',
      timeOfTheFilm: '2ч 36м',
      isSave: '',
    },
    {
      link: 'https://img.championat.com/s/735x490/news/big/f/w/umer-rik-dalton-personazh-leonardo-di-kaprio-iz-filma-odnazhdy-v-gollivude_1684580314234664118.jpg',
      name: 'Однажды… в Голливуде',
      timeOfTheFilm: '2ч 41м',
      isSave: '',
    }
  ]; 

  return (
    <section className='galery' aria-label='секция с фильмами'>
      {movies.map(movie => (
        (location.pathname === '/saved-movies' && movie.isSave === '') || location.pathname !== '/saved-movies' ? (
          <MoviesCard
            key={movie.name}
            link={movie.link}
            name={movie.name}
            timeOfTheFilm={movie.timeOfTheFilm}
            isSave={movie.isSave}
          />
        ) : null
      ))}
    </section>
  );
}

export default MoviesCardList;
