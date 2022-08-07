class Api {
    constructor(url, cohortId, token) { 
        this._url = url;
        this._token = token;
        this._cohortId = cohortId;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    setInitialState() {
       return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    getInitialCards() {
        return fetch(`${this._url}/${this._cohortId}/cards`, {
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponse);
    }
    getUserInfo() {
        return fetch(`${this._url}/${this._cohortId}/users/me`, {
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponse);
    }
    updateUserInfo(data) {
        return fetch(`${this._url}/${this._cohortId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
              })
        })
        .then(this._checkResponse);
    }
    updateUserAvatar(data) {
        return fetch(`${this._url}/${this._cohortId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar:data.avatar
              })
        })
        .then(this._checkResponse);
    }
    

    postNewCard(data) {
        return fetch(`${this._url}/${this._cohortId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
              })
        }) 
        .then(this._checkResponse);
    }  

    deleteCard(data) {
        return fetch(`${this._url}/${this._cohortId}/cards/${data._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        }) 
        .then(this._checkResponse);
    }

    changeLikeStatus(data, isLiked) {
        return fetch(`${this._url}/${this._cohortId}/cards/${data._id}/likes`, {
            method: isLiked? 'PUT' : 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        }) 
        .then(this._checkResponse);
    }

}

export const api = new Api('https://mesto.nomoreparties.co/v1', 'cohort-43', '4772447b-886a-4135-9b3c-8735b1b9c3a9');