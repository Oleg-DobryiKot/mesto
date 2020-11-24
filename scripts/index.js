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

function createCard(elementModel) {
  const element = cardTemplate.cloneNode(true).querySelector('.element');
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__title');
  if (elementModel.link) {
    elementImage.src = elementModel.link;
    elementImage.alt = elementModel.name;
  }
  if (elementModel.name) {
    elementName.textContent = elementModel.name;
  }
  element.addEventListener('click', function (event) {
    if (event.target.classList.contains('element__like-icon')) {
      toggleLikeIcon(event.target);
      return;
    }
    if (event.target.classList.contains('element__trash-icon')) {
      removeCard(event.currentTarget);
      return;
    }
    if (event.target.classList.contains('element__image')) {
      openPopupImage(elementModel);
      return;
    }
  });
  return element;
}

function openPopupImage(imageElement) {
  imgPictureLoad.src = imageElement.link
  imgTitleLoad.textContent = imageElement.name
  openPopup(imgPopup);
}

function toggleLikeIcon(iconElement) {
  iconElement.classList.toggle('element__like-icon_active');
}

function prependCard(elementModel) {
  const element = createCard(elementModel);
  elementsContainer.prepend(element);
}

function appendCard(elementModel) {
  const element = createCard(elementModel);
  elementsContainer.append(element);
}

function removeCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach(appendCard);

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener("keydown", closeByEscape);
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
