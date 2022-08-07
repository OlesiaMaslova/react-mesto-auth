import { BrowserRouter, Link, Route } from 'react-router-dom';


function Header({ userData, onLogout }) {
    return (
        <header className="header">
            <div className="header__logo"></div>
            <Route exact path="/">
                <div className="header__navbar">
                    <p className="header__email">{userData.email}</p>
                    <button className="header__button" onClick={() => { onLogout() }}>Выйти</button>
                </div>
            </Route>
            <Route path="/signup">
                <Link className="header__link" to="signin">
                    Войти
                </Link>
            </Route>
            <Route path="/signin">
                <Link className="header__link" to="signup">
                    Регистрация
                </Link>
            </Route>
        </header>
    );
}

export default Header;


