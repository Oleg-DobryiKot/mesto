class Api {
  constructor(login) {
    this._server = login.server;
    this._auth = login.auth;
    this._cohort = login.cohort;
    this._path = `${this._server}${this._cohort}`;
  }

  getInitialCards() {
    return fetch(`${this._path}/cards`, {
        method: 'GET',
        headers: {
          authorization: this._auth
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getUserInfo() {
    return fetch(`${this._path}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this._auth,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  sendUserInfo(data) {
    return fetch(`${this._path}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          about: data.description
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  addNewCard(data) {
    return fetch(`${this._path}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._path}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._auth,
          'Content-Type': 'application/json'
        },
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  likeCard(cardId) {
    return fetch(`${this._path}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._auth,
          'Content-Type': 'application/json'
        },
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  unlikeCard(cardId) {
    return fetch(`${this._path}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._auth,
          'Content-Type': 'application/json'
        },
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  editAvatar(data) {
    return fetch(`${this._path}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._auth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

}
//считать json с параметрами логина и сервера
const login = {
  "server": "https://mesto.nomoreparties.co/v1/",
  "auth": "ca5f4285-decb-4fbb-b094-52f199996ef3",
  "cohort": "cohort-19"
}

export const api = new Api(login);