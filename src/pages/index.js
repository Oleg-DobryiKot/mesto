import './index.css';

import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import {
  initialCards,
  initValidationConfig,
  profilePopup,
  cardPopup,
  imgPopup,
  profileInputName,
  profileInputDescription,
  cardInputName,
  cardInputLink,
  imgPictureLoad,
  imgTitleLoad,
  popupEditButton,
  cardAddButton,
  profileNewName,
  profileNewDescription,
  formCard,
  formProfile,
  elementsContainer,
  cardTemplate,
} from '../scripts/constants.js';

function openPopupImage(cardElement) {
  imgPictureLoad.src = cardElement.link;
  imgPictureLoad.alt = cardElement.name;
  imgTitleLoad.textContent = cardElement.name;
  openPopup(imgPopup);
}

function createCardInstance(cardModel) {
  return new Card(cardModel, cardTemplate);
}

function prependCard(elementModel) {
  const card = createCardInstance(elementModel);
  const cardElement = card.createCard();
  handleCardImageClick(card);
  elementsContainer.prepend(cardElement);
}

function handleCardImageClick(card) {
  card.onImageClick(event => {
    openPopupImage(card.getData());
  });
}

const renderCards = () => {
  initialCards.reverse().forEach(prependCard);
};

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener("keydown", closeByEscape);

  const closeHandler = event => {
    if (event.target === event.currentTarget) {
      closePopup(popup, closeHandler);
    }
    if (event.target.classList.contains("popup__close")) {
      closePopup(popup, closeHandler);
    }
  }

  popup.addEventListener('click', closeHandler);
}

function closePopup(popup, popupClickHandler) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener("keydown", closeByEscape);
  popup.removeEventListener('click', popupClickHandler);
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

cardAddButton.addEventListener('click', () => {
  formCard.reset();
  openPopup(cardPopup);
});

cardPopup.addEventListener('submit', event => {
  event.preventDefault();
  savePopupCardElement();
});

renderCards();

//валидация
const profilePopupValidator = new FormValidator(initValidationConfig, profilePopup);
const cardPopupValidator = new FormValidator(initValidationConfig, cardPopup);

profilePopupValidator.enableValidation();
cardPopupValidator.enableValidation();