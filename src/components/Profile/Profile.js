import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';

function Profile(isLoggedIn) {

  const [formData, setFormData] = useState({
    name: "name",
    email: "email",
});

  const [isEditable, setIsEditable] = useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));
  };

  function handleButtonClick(evt) {
    evt.preventDefault();
    setIsEditable(prevState => !prevState)
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className='profile'>
        <div className='profile__container'>
          <h1 className='profile__name'>
            Привет, {formData.name}!
          </h1>
          <form className='profile__form'>
            <label className='profile__label-name'>
              Имя
              <input
                disabled={!isEditable}
                className='profile__input'
                value={formData.name}
                onChange={handleChange}
                name='name'
                type='text'
                placeholder='Имя'
                required />
            </label>
            <label className='profile__label-email'>
              E-mail
              <input
                disabled={!isEditable}
                className='profile__input'
                value={formData.email}
                onChange={handleChange}
                name='email'
                type='email'
                placeholder='E-mail'
                required />
            </label>
            <div className='profile__action'>
              <button
              onClick={handleButtonClick}
                className='profile__btn-edit'
                type='submit'>
                {isEditable ? 'Сохранить' : 'Редактировать'}
              </button>
              <Link to="/" className='profile__btn-exit' >
                Выйти из аккаунта
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;