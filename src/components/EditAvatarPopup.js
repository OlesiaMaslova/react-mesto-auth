import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleAvatarSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);


  return (
    <PopupWithForm
      name='new-avatar'
      title='Обновить аватар'
      buttonName={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClosePopup={props.onClose}
      onSubmit={handleAvatarSubmit}>
      <label className="popup__label">
        <input className="popup__input popup__input_picture-link"
          id="avatar"
          ref={avatarRef}
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          required />
        <span className="popup__error" id="avatar-error"></span>
      </label></PopupWithForm>
  )
}

export default EditAvatarPopup;