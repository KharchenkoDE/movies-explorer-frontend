function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject('Ошибка загрузки фильма');
}

export function getMovies() {
    return fetch('https://api.nomoreparties.co/beatfilm-movies', {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((res) => checkResponse(res, ));
}

