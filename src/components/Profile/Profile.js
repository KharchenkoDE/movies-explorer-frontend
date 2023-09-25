import React, { useEffect, useState } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { validator } from '../../utils/validation';

function Profile({ isLoggedIn, handleChangeProfile, onSignOut }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [formDataErrors, setFormDataErrors] = useState({
    name: "",
    email: "",
  });

  const [isEditable, setIsEditable] = useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormDataErrors((prevFormData) => ({
      ...prevFormData,
      [name]: value ? validator({ type: name, value }) : 'Поле обязательно для заполнения',
    }));
  };

  function handleButtonClick(evt) {
    evt.preventDefault();
    if (isEditable) {
      handleChangeProfile(formData);
      setIsEditable(prevState => !prevState)
    } else {
      setIsEditable(prevState => !prevState)
    }

  }

  useEffect(() => {
    if (currentUser.name && currentUser.email) {
      setFormData(
        {
          name: currentUser.name,
          email: currentUser.email,
        }
      )
    }
  }, [currentUser]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className='profile'>
        <div className='profile__container'>
          <h1 className='profile__name'>
            Привет, {currentUser.name}!
          </h1>
          <form className='profile__form'>
            <label className='profile__label profile__label-name'>
              Имя
              <input
                disabled={!isEditable}
                className='profile__input'
                value={formData.name}
                onChange={handleChange}
                name='name'
                type='text'
                placeholder='Имя'
                autoComplete='off'
                required />
            </label>
            {formDataErrors.name && <p className='profile__error'>{formDataErrors.name}</p>}
            <label className='profile__label profile__label-email'>
              E-mail
              <input
                disabled={!isEditable}
                className='profile__input'
                value={formData.email}
                onChange={handleChange}
                name='email'
                type='email'
                placeholder='E-mail'
                autoComplete='off'
                required />
            </label>
            {formDataErrors.email && <p className='profile__error'>{formDataErrors.email}</p>}
            <div className='profile__action'>
              <button
                disabled={isEditable && (formDataErrors.name || formDataErrors.email)}
                onClick={handleButtonClick}
                className='profile__btn-edit'
                type={'submit'}>
                {isEditable ? 'Сохранить' : 'Редактировать'}
              </button>
              <button onClick={onSignOut} className='profile__btn-exit' >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;