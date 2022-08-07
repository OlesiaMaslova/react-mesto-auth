import React from "react";
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';
import EditAvatarPopup from "./EditAvatarPopup";
import AddNewCardPopup from "./AddNewCardPopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/Auth.js";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";


function App() {

    const [isEditProfilePopupOpen, setEditProfileOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
    const [signupSuccess, setSignupSuccess] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

    const [isLoading, setIsLoading] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});

    const [userData, setUserData] = React.useState({
        email: '',
    });
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const location = useLocation();


    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setEditProfileOpen(true);
    }
    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }
    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfileOpen(false);
        setAddPlacePopupOpen(false);
        setInfoTooltipOpen(false);
        setSelectedCard({ name: '', link: '' });

    }
    function handleCardClick(selectedCard) {
        setSelectedCard(selectedCard);
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api.updateUserInfo(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleAvatarUpdate(data) {
        setIsLoading(true);
        api.updateUserAvatar(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            })

    }

    function handleAddNewCard(data) {
        setIsLoading(true);
        api.postNewCard(data)
            .then((data) => {
                setCards([data, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }


    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }, [])


    const [cards, setCards] = React.useState([]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeStatus(card, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    function handleCardDelete(card) {
        api.deleteCard(card).then((card) => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    React.useEffect(() => {

        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })

    }, [])

    React.useEffect(() => {
        if (isLoggedIn) {
            history.push('/');
        }
    }, [isLoggedIn]);

    React.useEffect(() => {
        getContent();

    }, []);

    function getContent() {
        const jwt = localStorage.getItem('token');

        if (!jwt) {
            return;
        }
        auth.tokenCheck(jwt)
            .then((data) => {
                setIsLoggedIn(true);
                setUserData(data.data);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    function onLogin(data) {

        return auth.authorize(data)
            .then(({ token }) => {
                setIsLoggedIn(true);
                localStorage.setItem('token', token);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function onLogout() {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        history.push('/signin');
    }

    function forwardSignup() {
        history.push('/signup')
    }

    function forwardSignin() {
        history.push('/signin')
    }

    function onRegister(data) {

        return auth.register(data)
            .then(() => {
                setSignupSuccess(true);
                setInfoTooltipOpen(true);
                history.push('/signin');
            })
            .catch((err) => {
                console.log(err);
                setSignupSuccess(false);
                setInfoTooltipOpen(true);
            })
    }




    return (

        <div className="App">
            <CurrentUserContext.Provider value={currentUser}>

                <Header userData={userData} onLogout={onLogout} isLoggedIn={isLoggedIn} location={location} onForwardSignin={forwardSignin} onForwardSignup={forwardSignup} />
                <Switch>
                    <ProtectedRoute
                        exact path="/"
                        isLoggedIn={isLoggedIn}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                        component={Main}
                    />


                    <Route path="/signin">
                        <Login onLogin={onLogin} />
                    </Route>

                    <Route path="/signup">
                        <Register onRegister={onRegister} />
                    </Route>

                    <Route>
                        {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
                    </Route>

                </Switch>


                <Footer />

                <InfoTooltip isOpen={isInfoTooltipOpen} isSucceed={signupSuccess} onClose={closeAllPopups} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleAvatarUpdate} isLoading={isLoading} />
                <AddNewCardPopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddNewCard} isLoading={isLoading} />


                {/* <div className="popup popup_type_delete-confirmation">
            <form className="popup__form popup__form_place_cofirmation" name="confirmation" noValidate>
                <button className="popup__close-button" type="button"></button>
                <h3 className="popup__heading popup__heading_place_confirmation">Вы уверены?</h3>
                <button className="popup__submit-button popup__submit-button_place_confirmation" type="submit">Да</button>
            </form>
        </div> */}
            </CurrentUserContext.Provider>
        </div>

    );
}

export default App;
