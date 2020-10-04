// попап редактирования профиля -- определения
const profilePopup = document.querySelector('.popup');
//console.log(profilePopup);
const popupCloseButton = document.querySelector('.popup__close');
const popupSaveButton = document.querySelector('.popup__input-btn');
const inputName = document.querySelector('.popup__input-text_name');
const inputDescription = document.querySelector('.popup__input-text_description');
const formName = document.querySelector('.popup__title');

// попап добавления карточки -- определения
const cardPopup = document.querySelector('.card-popup');
const cardPopupCloseButton = document.querySelector('.card-popup__close');
const cardInputName = document.querySelector('.card-popup__input-text_name');
const cardInputLink = document.querySelector('.card-popup__input-text_link');

//console.log(cardPopup);

// попап всплывающей картинки -- определения 
const imgShowPopup = document.querySelector('.img-popup');
const imgClosePopup = document.querySelector('.img-popup__close');
const imgPictureLoad = document.querySelector('.img-popup__fullpic');
const imgTitleLoad = document.querySelector('.img-popup__title');

// кнопки профиля, редактирование и добавление
const popupEditButton = document.querySelector('.profile__edit-btn');
const cardAddButton = document.querySelector('.profile__add-btn');

const profileNewName = document.querySelector('.profile__title');
const profileNewDescription = document.querySelector('.profile__description');

const formElements = document.forms.inputCard;
const formProfile = document.forms.inputForm;
// console.log(formElements);
const elementsContainer = document.querySelector('.elements');
const elemCardContainer = document.querySelector('#elem__container').content;

function createCard(elementModel) {
  const element = elemCardContainer.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__title');
  if (elementModel.link) {
    elementImage.src = elementModel.link;
    elementImage.alt = elementModel.name;
  }
  if (elementModel.name) {
    elementName.textContent = elementModel.name;
  }
  element.querySelector('.element__like-icon').addEventListener('click', function (event) {
    event.target.classList.toggle('element__like-icon_active');
  });
  return element;
}

function appendCard(elementModel) {
  const element = createCard(elementModel);
  elementsContainer.append(element);
}

function prependCard(elementModel) {
  const element = createCard(elementModel);
  elementsContainer.prepend(element);
}

initialCards.forEach(appendCard);

elementsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('element__trash-icon')) {
    const element = event.target.closest('.element');
    element.remove();
  } else if (event.target.classList.contains('element__image')) {
    //присваиваем картинку и показываем попап
    //console.log(event.target);
    imgPictureLoad.src = event.target.attributes.src.value;
    imgTitleLoad.textContent = event.target.attributes.alt.value;
    imgPopupOpen();
  }
});

function popupOpen(popup, openClass) {
  if (openClass) {
    popup.classList.add(openClass);
  }
}

function popupClose(popup, openClass) {
  if (openClass) {
    popup.classList.remove(openClass);
  }
}

function handleEventPopupCloseOnOverspace(popup, openClass) {
  return function (event) {
    if (event.target === event.currentTarget) {
      popupClose(popup, openClass);
    }
  }
}

const imgPopupOpen = function (event) {
  imgShowPopup.classList.add('img-popup_show');
}

const imgPopupClose = function (event) {
  imgShowPopup.classList.remove('img-popup_show');
}

function popupSaveNewData() {
  // console.log('popupSaveNewData');
  if (inputName.value !== '') {
    profileNewName.textContent = inputName.value;
    profileNewDescription.textContent = inputDescription.value;
  }
  popupClose(profilePopup, 'popup_is-opened');
}

function popupSaveNewElement() {
  // debugger;
  // event.preventDefault();
  const elementModel = {};

  if (cardInputName.value !== '') {
    elementModel.name = cardInputName.value;
    elementModel.link = cardInputLink.value;
    prependCard(elementModel);
  }
  popupClose(cardPopup, 'card-popup_is-opened');
}

popupEditButton.addEventListener('click', () => {
  inputName.textContent = '';
  inputDescription.textContent = '';
  popupOpen(profilePopup, 'popup_is-opened');
});

formProfile.addEventListener("submit", event => {
  event.preventDefault();
  popupSaveNewData();
});

popupCloseButton.addEventListener('click', () => {
  popupClose(profilePopup, 'popup_is-opened');
});

profilePopup.addEventListener('click', handleEventPopupCloseOnOverspace(profilePopup, 'popup_is-opened'));
cardPopup.addEventListener('click', handleEventPopupCloseOnOverspace(cardPopup, 'card-popup_is-opened'));

cardAddButton.addEventListener('click', () => {
  cardInputLink.textContent = '';
  cardInputName.textContent = '';
  popupOpen(cardPopup, 'card-popup_is-opened');
});

cardPopupCloseButton.addEventListener('click', () => {
  popupClose(cardPopup, 'card-popup_is-opened');
});

cardPopup.addEventListener('submit', event => {
  event.preventDefault();
  popupSaveNewElement();
});

imgClosePopup.addEventListener('click', imgPopupClose);
