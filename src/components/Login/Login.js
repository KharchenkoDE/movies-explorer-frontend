import React, {useState} from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';

function Login() {

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
  };
  function handleSubmit(evt) {
    evt.preventDefault();
    // отправка данных на сервер
    setFormDataErrors({
      email: formData.email ? '' : 'Заполните поле',
      password: formData.password ? '' : 'Заполните поле',
    });
    if( !formData.email || !formData.password) {
      return
    }
    console.log(formData)
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
                errorText={formDataErrors.email}
              />
              <Input
                nameText='Пароль'
                placeholder='Пароль'
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                errorText={formDataErrors.password}
              />
            </div>
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