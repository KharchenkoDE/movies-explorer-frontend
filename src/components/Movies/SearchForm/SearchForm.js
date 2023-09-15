import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm() {

  const [searchInputValue, setSearchInputValue] = useState('');

  const [isShortMovie, setIsShortMovie] = useState(false)

  return (
    <section>
      <form noValidate className="search-form">
        <div className="search-form__container">
          <input
            className="search-form__input"
            type="text"
            name="search"
            placeholder="Фильм"
            required
            value={searchInputValue}
            onChange={(evt) => setSearchInputValue(evt.target.value)} />
          <button
            className="search-form__btn"
            type='submit' />
        </div>
        <div className="search-form__toggle-container">
          <label className="search-form__toggle">
            <input
              className="search-form__checkbox-input"
              type="checkbox"
              checked={isShortMovie} onChange={() => setIsShortMovie(prevState => !prevState)} />
            <span className="search-form__checkbox-inner"></span>
          </label>
          <p className='search-form__checkbox-text'>
            Короткометражки
          </p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;