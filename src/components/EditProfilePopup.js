import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

    const currentUserInfo = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [errorMessageName, setErrorMessageName] = React.useState('');
    const [errorMessageDescription, setErrorMessageDescription] = React.useState('');

    function handleNameChange(event) {
        setName(event.target.value);

        if (event.target.validity.valid) {
            setErrorMessageName('');

        } else {
            setErrorMessageName(event.target.validationMessage);
        }
    }
    function handleDescriptionChange(event) {
        setDescription(event.target.value);
        if (event.target.validity.valid) {
            setErrorMessageDescription('');

        } else {
            setErrorMessageDescription(event.target.validationMessage);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        props.onUpdateUser({ name, about: description });

    }

    React.useEffect(() => {
        setName(currentUserInfo.name);
        setDescription(currentUserInfo.about);
    }, [currentUserInfo, props.isOpen])


    return (

        <PopupWithForm
            name='userinfo'
            title='Редактировать профиль'
            buttonName={props.isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={props.isOpen}
            onClosePopup={props.onClose}
            onSubmit={handleSubmit}>
            <label className="popup__label">
                <input className="popup__input popup__input_username"
                    id="username-input"
                    type="text"
                    value={name || ''}
                    onChange={handleNameChange}
                    name="name"
                    minLength="2" maxLength="40" required />
                <span className="popup__error" id="username-input-error">{errorMessageName}</span>
            </label>
            <label className="popup__label">
                <input className="popup__input popup__input_job"
                    id="job-input"
                    type="text"
                    value={description || ''}
                    onChange={handleDescriptionChange}
                    name="about"
                    minLength="2" maxLength="200" required />
                <span className="popup__error" id="job-input-error">{errorMessageDescription}</span>
            </label>
        </PopupWithForm>

    )


}

export default EditProfilePopup;
