import React from 'react';
import {api} from '../utils/Api.js'
import overlayImgPath from '../images/Vectoravatarvector.svg';
import Card from './Card.js';
import { CurrentUserContext } from './CurrentUserContext.js';

function Main(props) {
   const currentUserInfo = React.useContext(CurrentUserContext); 


   return(
    
        <main className="main">
            <section className="profile">
                <div className="profile__info">
                    <img className="profile__avatar" src= {currentUserInfo.avatar} alt="Фото пользователя (фото Жак-Ив Кусто)"/>
                    <div className="profile__avatar-overlay" onClick ={props.onEditAvatar}><img className = "profile__avatar-vector" src= {overlayImgPath}/></div>
                    <div className="profile__name-box">
                        <h1 className="profile__name">{currentUserInfo.name}</h1>
                        <p className="profile__subname">{currentUserInfo.about}</p>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
                </section>
                <section className="gallery">
                    <ul className="gallery__list">
                    { props.cards.map((card) => {
                       
                 return (
                    <Card card={card} onCardClick={props.onCardClick} key={card._id} onCardLike = {props.onCardLike} onCardDelete = {props.onCardDelete}/>
                    
                 )
        
        })}
                    </ul>
                </section>
        </main>
        
    );
    }

export default Main;
