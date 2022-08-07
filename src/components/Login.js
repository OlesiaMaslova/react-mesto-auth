import React, { useState } from "react";
import {Link} from "react-router-dom";


function Login({onLogin}) {

    const [loginData, setLoginData] = useState({
        password:'',
        email:'',
    });


    function handleChange(e) {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]:value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(loginData)
    }

    return (
        <div className="access-form">
            <p className="access-form__title">Вход</p>
            <form className="access-form__form" onSubmit={handleSubmit}>
                <input className="access-form__input" type="email" name="email" placeholder="Email" onChange={handleChange} value={loginData.email}/>
                <input className="access-form__input" type="password" name="password" placeholder="Пароль" onChange={handleChange} value={loginData.password}/>
                <button className="access-form__button" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;