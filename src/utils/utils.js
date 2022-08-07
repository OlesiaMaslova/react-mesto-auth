export const popupPic = document.querySelector('.popup__image');
export const popupPicCaption = document.querySelector('.popup__caption');
export const popupPicWindow = document.querySelector('.popup_type_image');
export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  export const buttonEdit = document.querySelector('.profile__edit-button');
  export const windowEdit = document.querySelector('.popup_type_edit');
  export const buttonAdd = document.querySelector('.profile__add-button');
  export const windowAdd = document.querySelector('.popup_type_new-card');
  export const avatarEdit = document.querySelector('.profile__avatar-overlay');
  export const avatarEditWindow = document.querySelector('.popup_type_new-avatar');
  export const userAvatar = document.querySelector('.profile__avatar');

  export const formUserElement = document.querySelector('.popup__form_userinfo');
  export const formPicElement = document.querySelector('.popup__form_picture');
  export const formAvatarElement = document.querySelector('.popup__form_avatar')

  export const nameInput = document.querySelector('.popup__input_username');
  export const jobInput = document.querySelector('.popup__input_job');
  export const nameField = document.querySelector('.profile__name');
  export const subnameField = document.querySelector('.profile__subname');
  export const imgNameInput = document.querySelector('.popup__input_picture-name');
  export const imgLinkInput = document.querySelector('.popup__input_picture-link');


  export const cardContainer = document.querySelector('.gallery__list');
  export const config = {
    inputSelector : '.popup__input',
    buttonSelector : '.popup__submit-button',
    buttonSelectorError : 'popup__submit-button_type_block',
    inputSelectorError : '.popup__input_type_error'
};


export function openWindow(popup) {
    popup.classList.add('popup_is-active');
    document.addEventListener('keydown', handleEscape);
 }

export function closeWindow(popup) {
    popup.classList.remove('popup_is-active');
    document.removeEventListener('keydown', handleEscape);
}

export  function handleEscape(event) {
        if(event.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_is-active')
         closeWindow(popupOpened);
        }
    }