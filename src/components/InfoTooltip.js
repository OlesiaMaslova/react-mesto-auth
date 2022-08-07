import React from "react";
import imgPathCheck from '../images/UnionPOPUP.svg';
import imgPathReject from '../images/UnionCANCELED.svg';


function InfoTooltip({ isOpen, onClose, isSucceed }) {

    return (
        <div className={`popup ${isOpen ? 'popup_is-active' : ''} `}>
            <form className="popup__form">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <div className="popup__message-container">
                    {
                        isSucceed ? (<><img className="popup__message-img" src={imgPathCheck} />
                            <p className="popup__message">Вы успешно зарегистрировались!</p></>) : (
                            <>
                                <img className="popup__message-img" src={imgPathReject} />
                                <p className="popup__message">Что-то пошло не так! Попробуйте ещё раз.</p>
                            </>
                        )
                    }
                </div>
            </form>
        </div>


    )
}

export default InfoTooltip;