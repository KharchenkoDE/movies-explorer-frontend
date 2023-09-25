import React, { useState } from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import { validator } from '../../utils/validation';

function Register({ onRegister, signError, setSignError }) {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [formDataErrors, setFormDataErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

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

  function handleSubmit(evt) {
    evt.preventDefault();
    setFormDataErrors((prevFormData) => ({
      name: formData.name ? validator({ type: 'name', value: formData.name }) : 'Поле обязательно для заполнения',
      email: formData.email ? validator({ type: 'email', value: formData.email }) : 'Поле обязательно для заполнения',
      password: formData.password ? '' : 'Поле обязательно для заполнения',
    }));
    if (!formData.name || !formData.email || !formData.password) {
      return
    }
    onRegister(formData)
  };

  return (
    <>
      <main className='register'>
        <Link to="/">
          <img
            src={logo}
            alt="Логотип"
            className="register__logo" />
        </Link>
        <section className='register__container'>
          <h1 className='register__title'>
            Добро пожаловать!
          </h1>
          <form className='register__form' onSubmit={handleSubmit}>
            <div className='register__inputs'>
              <Input
                nameText='Имя'
                placeholder='Имя'
                name='name'
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setSignError('')}
                errorText={formDataErrors.name}
              />
              <Input
                nameText='E-mail'
                placeholder='E-mail'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setSignError('')}
                errorText={formDataErrors.email}
              />
              <Input
                nameText='Пароль'
                placeholder='Пароль'
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setSignError('')}
                errorText={formDataErrors.password}
              />
            </div>
            {signError && <p className='register__error'>{signError}</p>}
            <button
              className='register__btn'
              type='submit'>
              Зарегистрироваться
            </button>
          </form>
          <p className='register__subtitle'>Уже зарегистрированы?{' '}
            <Link className='register__link' to='/signin'>
              <span className="register__signin">Войти</span>
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default Register;