import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({
  searchValue, 
  handleChangeSearchValue, 
  isShortMovie, 
  onSearchFormsubmit, 
  handleChangeIsShort
}) {

  const [error, setError] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    if(!searchValue) {
      setError('Поле поиска обязательно для заполнения');
      return
    }
    onSearchFormsubmit();
  };

  return (
    <section>
      <form className="search-form" onSubmit={onSubmit}>
        <div className="search-form__container">
          <input
            className="search-form__input"
            type="text"
            name="search"
            placeholder="Фильм"
            value={searchValue}
            onFocus={() => setError('')}
            onChange={(evt) => handleChangeSearchValue(evt.target.value)} />
          <button
            className="search-form__btn"
            type='submit' />
        </div>
        {error && <div style={{color: 'red'}}>{error}</div>}
        <div className="search-form__toggle-container">
          <label className="search-form__toggle">
            <input
              className="search-form__checkbox-input"
              type="checkbox"
              checked={isShortMovie} onChange={(evt) => handleChangeIsShort(evt.target.checked)} />
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