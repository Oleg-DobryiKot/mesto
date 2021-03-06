export const initValidationConfig = {
  formSelector: '.popup__input-form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__input-btn',
  inputErrorClass: 'popup__input-text_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_visible'
};

export const profileNameInputElement = document.querySelector('.popup__input-text_name');
export const profileDescriptionInputElement = document.querySelector('.popup__input-text_description');

// export const cardInputName = document.querySelector('.popup__input-text_title');
// export const cardInputLink = document.querySelector('.popup__input-text_link');

export const profileEditButtonElement = document.querySelector('.profile__edit-btn');
export const cardAddButtonElement = document.querySelector('.profile__add-btn');

export const profileNameElement = document.querySelector('.profile__title');
export const profileDescriptionElement = document.querySelector('.profile__description');
export const profileAvatarElement = document.querySelector('.profile__avatar');
export const profileAvatarOverlayElement = document.querySelector('.profile__overlay');

// export const elementsContainer = document.querySelector('.elements');
export const cardTemplate = document.querySelector('#cardTemplate').content;

export const elementsContainerSelector = '.elements';
export const profilePopupSelector = '.popup_type-profile';
export const cardPopupSelector = '.popup_type-card';
export const deletePopupSelector = '.popup_type-delete';
export const updateAvatarPopupSelector = '.popup_type-update-avatar';
export const popupFormButtonSelector = '.popup__input-btn';
