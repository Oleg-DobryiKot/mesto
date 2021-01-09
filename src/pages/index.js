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
  //profilePopupSelector,
  //cardPopupSelector,
  imgPopup,
  profileNameInputElement,
  profileDescriptionInputElement,
  cardInputName,
  cardInputLink,
  profileEditButtonElement,
  cardAddButtonElement,
  profileNameElement,
  profileDescriptionElement,
  formCard,
  formProfile,
  // elementsContainerSelector,
  cardTemplate,
} from '../utils/constants.js';

// const cardTemplate = '#cardTemplate';
const elementsContainerSelector = '.elements';
const profilePopupSelector = '.popup_type-profile';
const cardPopupSelector = '.popup_type-card';

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

const initialCardsSection = new Section(
  {
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

// function openPopupImage(cardElement) {
//   imgPictureLoad.src = cardElement.link;
//   imgPictureLoad.alt = cardElement.name;
//   imgTitleLoad.textContent = cardElement.name;
//   openPopup(imgPopup);
// }

// function createCardInstance(cardModel) {
//   return new Card({
//     cardData: cardModel,
//     handleCardClick: (cardModel) => {
// 			cardImageClick(cardModel);
//   },
//   cardTemplate);
// }

// function prependCard(elementModel) {
//   const card = createCardInstance(elementModel);
//   const cardElement = card.createCard();
//   // handleCardImageClick(card);
//   elementsContainerSelector.prepend(cardElement);
// }  // now transfered to Section.setItemPrepend(element) 

// function handleCardImageClick(card) {
//   card.onImageClick(event => {
//     openPopupImage(card.getData());
//   });
// }

// const renderCards = () => {
//   initialCards.reverse().forEach(prependCard);
// };  //

// function openPopup(popup) {
//   popup.classList.add('popup_is-opened');
//   document.addEventListener("keydown", closeByEscape);

//   const closeHandler = event => {
//     if (event.target === event.currentTarget) {
//       closePopup(popup, closeHandler);
//     }
//     if (event.target.classList.contains("popup__close")) {
//       closePopup(popup, closeHandler);
//     }
//   }

//   popup.addEventListener('click', closeHandler);
// }

// function closePopup(popup, popupClickHandler) {
//   popup.classList.remove('popup_is-opened');
//   document.removeEventListener("keydown", closeByEscape);
//   popup.removeEventListener('click', popupClickHandler);
// }
//перенес в  _handleEscClose(event) класса попап
// function closeByEscape(event) {
//   if (event.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_is-opened");
//     closePopup(openedPopup);
//   }
// }

// function savePopupProfileChanges() {
//   if (profileNameInputElement.value !== '') {
//     profileNewName.textContent = profileNameInputElement.value;
//     profileNewDescription.textContent = profileDescriptionInputElement.value;
//   }
//   closePopup(profilePopupSelector);
// }

// function savePopupCardElement() {
//   const elementModel = {};

//   if (cardInputName.value !== '') {
//     elementModel.name = cardInputName.value;
//     elementModel.link = cardInputLink.value;
//     prependCard(elementModel);
//   }
//   closePopup(cardPopupSelector);
// }

// popupEditButton.addEventListener('click', () => {
//   profileNameInputElement.value = profileNewName.textContent;
//   profileDescriptionInputElement.value = profileNewDescription.textContent;
//   openPopup(profilePopupSelector);
// });

// formProfile.addEventListener("submit", event => {
//   event.preventDefault();
//   savePopupProfileChanges();
// });

// cardAddButton.addEventListener('click', () => {
//   formCard.reset();
//   openPopup(cardPopupSelector);
// });

// cardPopupSelector.addEventListener('submit', event => {
//   event.preventDefault();
//   savePopupCardElement();
// });

// renderCards();

//валидация
const editProfileFormValidator = new FormValidator(initValidationConfig, editProfilePopupWithForm.getForm());
const addCardFormValidator = new FormValidator(initValidationConfig, addCardPopupWithForm.getForm());

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

cardPopupWithImage.setEventListeners();
editProfilePopupWithForm.setEventListeners();
addCardPopupWithForm.setEventListeners();