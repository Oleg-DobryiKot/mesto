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
  profilePopup,
  cardPopup,
  imgPopup,
  profileInputName,
  profileInputDescription,
  cardInputName,
  cardInputLink,
  imgPictureLoad,  //можно убрать, выбор в классе попапа с картинкой
  imgTitleLoad,    //тоже самое и из констант тоже можно заремить.
  popupEditButton,
  cardAddButton,
  profileNewName,
  profileNewDescription,
  formCard,
  formProfile,
  // elementsContainer,
  cardTemplate,
} from '../utils/constants.js';

// const cardTemplate = '#cardTemplate';
const elementsContainer = '.elements';

const userProfileInfo = new UserInfo({
	userName: profileInputName,
	userDescription: profileInputDescription
});

const cardImageDialog = new PopupWithImage('.popup_type-image');

const cardImageClick = (name, link) => {
	cardImageDialog.open(name, link);
}

const createCardInstance = function (cardModel, cardTemplate) {
	const card = new Card({
		data: cardModel,
		handleCardClick: (cardModel) => {
			cardImageClick(cardModel.name, cardModel.link);
		},
	}, cardTemplate);

	return card;
}

const initialCardsLoad = new Section({
	data: {},
	renderer: (cardModel) => {
		const card = createCardInstance(cardModel, cardTemplate);
    const cardElement = card.createCard();
    
		initialCardsLoad.setItemAppend(cardElement);
	},
}, elementsContainer
);

initialCardsLoad.setRenderedItems(initialCards);
initialCardsLoad.addItem();

const popupEditProfile = new PopupWithForm({
	popupSelector: profilePopup,
	handleFormSubmit: () => {
		userProfileInfo.setUserInfo(profileInputName.value, profileInputDescription.value);
    popupEditProfile.close();
	}
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
//   elementsContainer.prepend(cardElement);
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
//   if (profileInputName.value !== '') {
//     profileNewName.textContent = profileInputName.value;
//     profileNewDescription.textContent = profileInputDescription.value;
//   }
//   closePopup(profilePopup);
// }

// function savePopupCardElement() {
//   const elementModel = {};

//   if (cardInputName.value !== '') {
//     elementModel.name = cardInputName.value;
//     elementModel.link = cardInputLink.value;
//     prependCard(elementModel);
//   }
//   closePopup(cardPopup);
// }

// popupEditButton.addEventListener('click', () => {
//   profileInputName.value = profileNewName.textContent;
//   profileInputDescription.value = profileNewDescription.textContent;
//   openPopup(profilePopup);
// });

// formProfile.addEventListener("submit", event => {
//   event.preventDefault();
//   savePopupProfileChanges();
// });

// cardAddButton.addEventListener('click', () => {
//   formCard.reset();
//   openPopup(cardPopup);
// });

// cardPopup.addEventListener('submit', event => {
//   event.preventDefault();
//   savePopupCardElement();
// });

// renderCards();

//валидация
const profilePopupValidator = new FormValidator(initValidationConfig, profilePopup);
const cardPopupValidator = new FormValidator(initValidationConfig, cardPopup);

profilePopupValidator.enableValidation();
cardPopupValidator.enableValidation();

cardImageDialog.setEventListeners();
popupEditProfile.setEventListeners();