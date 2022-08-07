export const URL = 'https://auth.nomoreparties.co';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

const checkResponse = (response) => {
    return response.ok? response.json() : Promise.reject(new Error(`Обка ${response.status}: ${response.statusText}`))
 }

export const register = ({password, email}) => {
    console.log({password, email})
    return fetch(`${URL}/signup`, {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method:'POST',
        body: JSON.stringify({password, email})
    })
    .then(res => checkResponse(res));
}

export const authorize = ({password, email}) => {
    return fetch(`${URL}/signin`, {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method:'POST',
        body: JSON.stringify({password, email})
    })
    .then(res => checkResponse(res));
}

export const getContent = (jwt) => {
    
    return fetch(`${URL}/users/me`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        method:'GET',
    })
    .then(res => checkResponse(res));
}
