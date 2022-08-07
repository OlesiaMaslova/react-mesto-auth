import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddNewCardPopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    const [errorMessageName, setErrorMessageName] = React.useState('');
    const [errorMessageLink, setErrorMessageLink] = React.useState('');


    function handleChangeName(event) {
        setName(event.target.value);
        if (event.target.validity.valid) {
            setErrorMessageName('');

        } else {
            setErrorMessageName(event.target.validationMessage);
        }

    }

    function handleChangeLink(event) {
        setLink(event.target.value);
        if (event.target.validity.valid) {
            setErrorMessageLink('');

        } else {
            setErrorMessageLink(event.target.validationMessage);
        }
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    function handleCardSumbit(event) {
        event.preventDefault();

        props.onAddCard({ name: name, link: link })

    }

    return (
        <PopupWithForm
            name='new-card'
            title='Новое место'
            buttonName={props.isLoading ? 'Сохранение...' : 'Создать'}
            isOpen={props.isOpen}
            onClosePopup={props.onClose}
            onSubmit={handleCardSumbit}>
                <label className="popup__label">
                <input className="popup__input popup__input_picture-name"
                    id="picture-input"
                    value={name}
                    onChange={handleChangeName}
                    type="text"
                    name="name"
                    placeholder="Название"
                    minLength="2" maxLength="30" required />
                <span className="popup__error" id="picture-input-error">{errorMessageName}</span>
                </label>
                <label className="popup__label">
                    <input className="popup__input popup__input_picture-link"
                        id="link-input"
                        value={link}
                        onChange={handleChangeLink}
                        type="url"
                        name="link"
                        placeholder="Ссылка на картинку" required />
                    <span className="popup__error" id="link-input-error">{errorMessageLink}</span>
                </label>
        </PopupWithForm>
    )
}

export default AddNewCardPopup;