function PopupWithForm(props) {

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_is-active' : ''}`}>
            <form className="popup__form popup__form_userinfo" name={props.name} onSubmit={props.onSubmit} noValidate>
                <button className="popup__close-button" type="button" onClick={props.onClosePopup}></button>
                <h3 className="popup__heading">{props.title}</h3>
                {props.children}
                <button className="popup__submit-button" type="submit">{props.buttonName}</button>
            </form>
        </div>
    );
}
export default PopupWithForm;