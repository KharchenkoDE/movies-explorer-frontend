import React from "react";
import "./Page404.css";
import { useNavigate } from 'react-router-dom';

function Page404() {
  const navigate = useNavigate();
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
      <button onClick={() => navigate(-1)} className="page-error__btn">
        Назад
      </button>
    </main>
  );
}

export default Page404;
