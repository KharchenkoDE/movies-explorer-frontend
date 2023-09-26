export const BASE_URL = 'http://localhost:8000';


// export const BASE_URL = 'https://api.kharchenkode.nomoreparties.co';

function checkError(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

export function loginUser(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkError(res))
    .catch(error => {
      return Promise.reject(error)
    })
}

export function regUser(regData) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...regData }),
  })
    .then((res) => checkError(res))
    .catch(error => {
      return Promise.reject(error)
    })
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': "application/json",
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((res) => checkError(res));
}

export function setUserInfo(userData) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify(userData),
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    }
  })
    .then((res) => checkError(res));
}

export function getMyMovies() {
  return fetch(`${BASE_URL}/movies`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    }
  })
    .then((res) => checkError(res));
}

export function addNewMovie(cardData) {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    body: JSON.stringify(cardData),
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    }
  })
    .then((res) => checkError(res));
}

export function deleteMovie(cardId) {
  return fetch(`${BASE_URL}/movies/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    }
  })
    .then((res) => checkError(res));
}
