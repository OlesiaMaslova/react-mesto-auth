
function Header({userData, onLogout, isLoggedIn, location, onForwardSignin, onForwardSignup}) {
    return(
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__navbar">
            {isLoggedIn? (<><p className="header__email">{userData}</p>
                <button className="header__button" onClick={() => {onLogout()}}>Выйти</button></>
            ) : ''}
           {location.pathname==='/signin' && (<><button className="header__button" onClick={() => {onForwardSignup()}}>Регистрация</button></>)}
           {location.pathname==='/signup' && (<><button className="header__button" onClick={() => {onForwardSignin()}}>Войти</button></>)}
            
            </div>
        </header>
    );
}

export default Header;


