import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {

    const currentUserInfo = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUserInfo._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? '' : 'card__delete-button_state_hidden'}`
      ); 
    
    const isLiked = props.card.likes.some(i => i._id === currentUserInfo._id);
    const cardLikeButtonClassName = `card__like-button ${isLiked? 'card__like-button_active' : ''}`; 

    function handleClick() {
        props.onCardClick(props.card);
      }  
    function handleLike() {
        props.onCardLike(props.card);
    }
    function handleDelete() {
        props.onCardDelete(props.card);
    }

   
   
    return(
        <li className="card">
            <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <div className="card__wrap">
                <h2 className="card__name">{props.card.name}</h2>
                <div className="card__button-wrap">
                <button className={cardLikeButtonClassName} type="button" onClick={handleLike}></button>
                <p className="card__like-counter">{props.card.likes.length}</p>
            </div>
                <button className={cardDeleteButtonClassName} type="button" onClick={handleDelete}></button>
            </div>
        </li>
    )
}

export default Card;