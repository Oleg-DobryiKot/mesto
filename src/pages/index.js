import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import {
  initialCards,
  initValidationConfig,
  profileNameInputElement,
  profileDescriptionInputElement,
  profileEditButtonElement,
  cardAddButtonElement,
  profileNameElement,
  profileDescriptionElement,
  cardTemplate,
  elementsContainerSelector,
  profilePopupSelector,
  cardPopupSelector,
} from '../utils/constants.js';

const profileUserInfo = new UserInfo({
  userNameInputElement: profileNameInputElement,
  userDescriptionInputElement: profileDescriptionInputElement,
  userNameElement: profileNameElement,
  userDescriptionElement: profileDescriptionElement
});

const cardPopupWithImage = new PopupWithImage('.popup_type-image');

const cardImageClick = (cardModel) => {
  cardPopupWithImage.open(cardModel.name, cardModel.link);
}

const createCardInstance = function (cardModel, cardTemplate) {
  const card = new Card({
    cardData: cardModel,
    handleCardClick: cardImageClick,
  }, cardTemplate);

  return card;
}

const initialCardsSection = new Section({
    items: initialCards,
    renderer: (cardModel) => {
      const card = createCardInstance(cardModel, cardTemplate);
      const cardElement = card.createCardElement();

      initialCardsSection.appendItem(cardElement);
    },
  },
  elementsContainerSelector
);

initialCardsSection.addItem();

const editProfilePopupWithForm = new PopupWithForm({
  popupSelector: profilePopupSelector,
  handleFormSubmit: (prfoileData) => {
    profileUserInfo.setUserInfo(prfoileData.name, prfoileData.description);
    editProfilePopupWithForm.close();
  }
});

const addCardPopupWithForm = new PopupWithForm({
  popupSelector: cardPopupSelector,
  handleFormSubmit: (cardModel) => {
    const newCard = createCardInstance(cardModel, cardTemplate);
    initialCardsSection.prependItem(newCard.createCardElement());
    addCardPopupWithForm.close();
  },
});

profileEditButtonElement.addEventListener('click', () => {
  editProfilePopupWithForm.open();
});

cardAddButtonElement.addEventListener('click', () => {
  addCardPopupWithForm.open();
});

const editProfileFormValidator = new FormValidator(initValidationConfig, editProfilePopupWithForm.popupFormElement);
const addCardFormValidator = new FormValidator(initValidationConfig, addCardPopupWithForm.popupFormElement);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

cardPopupWithImage.setEventListeners();
editProfilePopupWithForm.setEventListeners();
addCardPopupWithForm.setEventListeners();