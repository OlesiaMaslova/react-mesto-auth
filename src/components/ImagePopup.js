function ImagePopup(props) {

    return (
        <div className={`popup popup_background-dark popup_type_image ${props.card.link ? 'popup_is-active' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button popup__close-button_place_image" type="button" onClick={props.onClose}></button>
                <figure className="popup__image-wrap">
                    <img className="popup__image" src={`${props.card && props.card.link}`} alt={`${props.card && props.card.name}`} />
                    <figcaption className="popup__caption">{`${props.card && props.card.name}`}</figcaption>
                </figure>
            </div>
        </div>
    )
}
export default ImagePopup;