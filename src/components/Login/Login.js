import React, { useState } from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import { validator } from '../../utils/validation';

function Login({onLogin, signError, setSignError}) {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formDataErrors, setFormDataErrors] = useState({
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
    setFormDataErrors({
      email: formData.email ? '' : 'Поле обязательно для заполнения',
      password: formData.password ? '' : 'Поле обязательно для заполнения',
    });
    if (!formData.email || !formData.password) {
      return
    }
    onLogin({email: formData.email, password: formData.password});
  };

  return (
    <>
      <main className='login'>
        <Link to="/">
          <img
            className="login__logo"
            src={logo}
            alt="Логотип" />
        </Link>
        <section className='login__container'>
          <h1 className='login__title'>
            Рады видеть!
          </h1>
          <form className='login__form' onSubmit={handleSubmit}>
            <div className='login__inputs'>
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
                onFocus={() => setSignError('')}
                value={formData.password}
                onChange={handleChange}
                errorText={formDataErrors.password}
              />
            </div>
            {signError && <p className='login__error'>{signError}</p>}
            <button
              className='login__btn'
              type='submit'>
              Войти
            </button>
          </form>
          <p className='login__subtitle'>
            Еще не зарегистрированы?{' '}
            <Link className='login__link' to='/signup'>
              <span className="login__signin">
                Регистрация
              </span>
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default Login;