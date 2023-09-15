import React from "react";
import "./Page404.css";
import { Link } from 'react-router-dom';

function Page404() {
  return (
    <main className="page-error">
      <div className="page-error__text">
        <h1 className="page-error__title">
          404
        </h1>
        <p className="page-error__subtitle">
          Страница не найдена
        </p>
      </div>
      <Link to="/" className="page-error__btn">
        Назад
      </Link>
    </main>
  );
}

export default Page404;
