/*
Завершать загрузку везде по "finally"
*/
// debugger;

import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import {
  api
} from '../components/Api.js';

import {
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
  deletePopupSelector,
  popupFormButtonSelector,
  profileAvatarElement,
  profileAvatarOverlayElement,
  updateAvatarPopupSelector
} from '../utils/constants.js';

const cardPopupWithImage = new PopupWithImage('.popup_type-image');

const cardImageClick = (cardModel) => {
  cardPopupWithImage.open(cardModel.name, cardModel.link);
}

const createCardInstance = function (cardModel, userData, cardTemplate) {
  const card = new Card({
    cardData: cardModel,
    userData: userData,
    handleCardClick: cardImageClick,
    handleLikeClick: (cardId) => {
      if (card.isLiked()) {
        api.unlikeCard(cardId)
          .then((res) => {
            card.updateLikeCount(res)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        api.likeCard(cardId)
          .then((res) => {
            card.updateLikeCount(res)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    handleDeleteClick: (cardElement, cardId) => {
      deleteCardPopupWithConfirm.open({
        cardElement,
        cardId
      });
    },
  }, cardTemplate);

  return card;
}

const initialCardsSection = new Section({
    data: {},
    renderer: (cardModel, userData) => {
      const card = createCardInstance(cardModel, userData, cardTemplate);

      const cardElement = card.createCardElement();
      initialCardsSection.appendItem(cardElement);
    },
  },
  elementsContainerSelector
);

const promises = [api.getInitialCards(), api.getUserInfo()]

Promise.all(promises)
	.then(([resCard, resUser]) => {
    profileUserInfo.setUserInfo(resUser._id, resUser.name, resUser.about, resUser.avatar)
    initialCardsSection.setResolvedItems(resCard);
    initialCardsSection.addItems(resUser);
    
    //set click events: edit-avatar, edit-profile, add-newcard 
    profileEditButtonElement.addEventListener('click', () => {
      editProfilePopupWithForm.open();
    });
    
    cardAddButtonElement.addEventListener('click', () => {
      addCardPopupWithForm.open();
    });
    
		profileAvatarOverlayElement.addEventListener('click', () => {
      updateAvatarPopupWithForm.open();
      updateAvatarPopupWithForm.popupFormElement.avatar.value = profileUserInfo.getUserInfo().avatar;
		});
	})
	.catch((err) => {
		console.log(err)
	})

function renderLoading(popup, isLoading) {
	const popupFormButtonElement = document.querySelector(popup).querySelector(popupFormButtonSelector);
  popupFormButtonElement.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

const profileUserInfo = new UserInfo({
  userNameInputElement: profileNameInputElement,
  userDescriptionInputElement: profileDescriptionInputElement,
  userNameElement: profileNameElement,
  userDescriptionElement: profileDescriptionElement,
  userAvatarElement: profileAvatarElement
});
// debugger;
const deleteCardPopupWithConfirm = new PopupWithConfirm({
  popupSelector: deletePopupSelector,
  handleFormSubmit: ({
    cardElement,
    cardId
  }) => {
    // debugger;
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deleteCardPopupWithConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

const updateAvatarPopupWithForm = new PopupWithForm({
	popupSelector: updateAvatarPopupSelector,
	handleFormSubmit: (profileData) => {
		renderLoading(updateAvatarPopupSelector, true);
		api.editAvatar(profileData)
			.then(data => {
				profileUserInfo.setUserInfo(data._id, data.name, data.about, data.avatar);
        updateAvatarPopupWithForm.close();
			})
			.catch((err) => {
				console.log(err)
      })
      .finally(() => {
        renderLoading(updateAvatarPopupSelector, false);
      });
	}
});

const editProfilePopupWithForm = new PopupWithForm({
  popupSelector: profilePopupSelector,
  handleFormSubmit: (profileData) => {
    renderLoading(profilePopupSelector, true);
    api.sendUserInfo(profileData)
    .then(data => {
      profileUserInfo.setUserInfo(data._id, data.name, data.about, data.avatar);
      editProfilePopupWithForm.close();
      renderLoading(profilePopupSelector, false);
    })
    .catch((err) => {
      console.log(err)
    });
  }
});
 
const addCardPopupWithForm = new PopupWithForm({
  popupSelector: cardPopupSelector,
  handleFormSubmit: (cardModel) => {
    renderLoading(cardPopupSelector, true);
    // debugger;
		api.addNewCard(cardModel)
			.then(data => {
        // (cardModel, userData) => {
        //   const card = createCardInstance(cardModel, userData, cardTemplate);
        //   initialCardsSection.appendItem(card.createCardElement());
        // }
        // debugger;
        const userData = profileUserInfo.getUserInfo();
				const newCard = createCardInstance(data, profileUserInfo.getUserInfo(), cardTemplate);
        initialCardsSection.prependItem(newCard.createCardElement());
				addCardPopupWithForm.close();
				renderLoading(cardPopupSelector, false);
			})
			.catch((err) => {
				console.log(err);
			});
  },
});

const editProfileFormValidator = new FormValidator(initValidationConfig, editProfilePopupWithForm.popupFormElement);
const addCardFormValidator = new FormValidator(initValidationConfig, addCardPopupWithForm.popupFormElement);
const editAvatarFormValidator = new FormValidator(initValidationConfig, updateAvatarPopupWithForm.popupFormElement);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

cardPopupWithImage.setEventListeners();
editProfilePopupWithForm.setEventListeners();
addCardPopupWithForm.setEventListeners();
updateAvatarPopupWithForm.setEventListeners();
deleteCardPopupWithConfirm.setEventListeners();