import React, { useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";


function Register({ onRegister }) {
    const [registerData, setRegisterData] = useState(
        {
            password: '',
            email: '',
        });


    function handleChange(e) {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(registerData)
    }

    return (
        <div className="access-form">
            <p className="access-form__title">Регистрация</p>
            <form className="access-form__form" onSubmit={handleSubmit}>
                <input className="access-form__input" id="email" type="email" name="email" placeholder="Email" value={registerData.email} onChange={handleChange} />
                <input className="access-form__input" id="password" type="password" name="password" placeholder="Пароль" value={registerData.password} onChange={handleChange} />
                <button className="access-form__button" type="submit">Зарегистрироваться</button>
            </form>
            <div className="access-form__register-message">
                <p className="access-form__register-messagetext">Уже зарегистрированы?</p>
                <Link to='/signin'>Войти</Link>
            </div>
        </div>
    )
}

export default Register;