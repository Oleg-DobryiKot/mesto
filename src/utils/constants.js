export const initialCards = [{
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

export const initValidationConfig = {
  formSelector: '.popup__input-form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__input-btn',
  inputErrorClass: 'popup__input-text_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_visible'
};

export const profilePopup = document.querySelector('.popup_type-profile');
export const cardPopup = document.querySelector('.popup_type-card');
export const imgPopup = document.querySelector('.popup_type-image');

export const profileNameInputElement = document.querySelector('.popup__input-text_name');
export const profileDescriptionInputElement = document.querySelector('.popup__input-text_description');

export const cardInputName = document.querySelector('.popup__input-text_title');
export const cardInputLink = document.querySelector('.popup__input-text_link');

export const profileEditButtonElement = document.querySelector('.profile__edit-btn');
export const cardAddButtonElement = document.querySelector('.profile__add-btn');

export const profileNameElement = document.querySelector('.profile__title');
export const profileDescriptionElement = document.querySelector('.profile__description');

export const elementsContainer = document.querySelector('.elements');
export const cardTemplate = document.querySelector('#cardTemplate').content;

export const elementsContainerSelector = '.elements';
export const profilePopupSelector = '.popup_type-profile';
export const cardPopupSelector = '.popup_type-card';
