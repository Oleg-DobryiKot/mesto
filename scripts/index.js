import Card from './Card.js';
import FormValidator from './FormValidator.js';

// перекинуть бы все определяшки в какой-нить инишиал.жис как в тренажере.

// карточки из кардс чтоб три файла как в задании.
const initialCards = [{
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

const initValidationConfig = {
  formSelector: '.popup__input-form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__input-btn',
  inputErrorClass: 'popup__input-text_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_visible'
};

// попап редактирования профиля -- определения
const profilePopup = document.querySelector('.popup_type-profile');
const cardPopup = document.querySelector('.popup_type-card');
const imgPopup = document.querySelector('.popup_type-image');

const profileSaveButton = document.querySelector('.popup__input-btn_type-profile');
const profileInputName = document.querySelector('.popup__input-text_name');
const profileInputDescription = document.querySelector('.popup__input-text_description');

const cardInputName = document.querySelector('.popup__input-text_title');
const cardInputLink = document.querySelector('.popup__input-text_link');
const cardSaveButton = document.querySelector('.popup__input-btn_type-card');

// попап всплывающей картинки -- определения 
const imgPictureLoad = document.querySelector('.popup__fullpic');
const imgTitleLoad = document.querySelector('.popup__title_type-image');

// кнопки профиля, редактирование и добавление
const popupEditButton = document.querySelector('.profile__edit-btn');
const cardAddButton = document.querySelector('.profile__add-btn');

const popupCloseButton = document.querySelector('.popup__close');

const profileNewName = document.querySelector('.profile__title');
const profileNewDescription = document.querySelector('.profile__description');

const formElements = document.forms.inputFormCard;
const formProfile = document.forms.inputFormProfile;

const elementsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#cardTemplate').content;

function openPopupImage(cardElement) {
  imgPictureLoad.src = cardElement.link
  imgTitleLoad.textContent = cardElement.name
  openPopup(imgPopup);
}

function prependCard(elementModel) {
  const card = new Card(elementModel, cardTemplate);
  const cardElement = card.createCard();
  elementsContainer.prepend(cardElement);
}

function handleCardImageClick(card) {
  //console.log(card);
  card.onImageClick(event => {
    openPopupImage(card.getData());
  });
}

const renderCards = () => {
  initialCards.forEach((item) => {
    const card = new Card(item, cardTemplate);
    const cardElement = card.createCard();
    handleCardImageClick(card);
    elementsContainer.append(cardElement);
  });
};

renderCards();

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener("keydown", closeByEscape);

  function closeCurrentPopup() {
    handleClosePopup(popup);
    popupCloseButton.removeEventListener('click', closeCurrentPopup);
  };

  popupCloseButton.addEventListener('click', closeCurrentPopup);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", closeByEscape);
}

function handleClosePopup(popup) {
  return function (event) {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
    if (event.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  }
}

function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

function savePopupProfileChanges() {
  if (profileInputName.value !== '') {
    profileNewName.textContent = profileInputName.value;
    profileNewDescription.textContent = profileInputDescription.value;
  }
  closePopup(profilePopup);
}

function savePopupCardElement() {
  const elementModel = {};

  if (cardInputName.value !== '') {
    elementModel.name = cardInputName.value;
    elementModel.link = cardInputLink.value;
    prependCard(elementModel);
  }
  closePopup(cardPopup);
}

popupEditButton.addEventListener('click', () => {
  profileInputName.value = profileNewName.textContent;
  profileInputDescription.value = profileNewDescription.textContent;
  openPopup(profilePopup);
});

formProfile.addEventListener("submit", event => {
  event.preventDefault();
  savePopupProfileChanges();
});

profilePopup.addEventListener('click', handleClosePopup(profilePopup));
cardPopup.addEventListener('click', handleClosePopup(cardPopup));
imgPopup.addEventListener('click', handleClosePopup(imgPopup));

cardAddButton.addEventListener('click', () => {
  cardInputLink.value = '';
  cardInputName.value = '';
  openPopup(cardPopup);
});

cardPopup.addEventListener('submit', event => {
  event.preventDefault();
  savePopupCardElement();
});

//валидация
const profilePopupValidator = new FormValidator(initValidationConfig, profilePopup);
const cardPopupValidator = new FormValidator(initValidationConfig, cardPopup);

profilePopupValidator.enableValidation();
cardPopupValidator.enableValidation();