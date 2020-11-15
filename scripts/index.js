// попап редактирования профиля -- определения
const profilePopup = document.querySelector('.popup_type-profile');
const cardPopup = document.querySelector('.popup_type-card');
const imgPopup = document.querySelector('.popup_type-image');

const popupSaveButton = document.querySelector('.popup__input-btn');
const profileInputName = document.querySelector('.popup__input-text_name');
const profileInputDescription = document.querySelector('.popup__input-text_description');
// const formName = document.querySelector('.popup__title');
const popupCloseButton = document.querySelector('.popup__close_type-profile');

const cardPopupCloseButton = document.querySelector('.popup__close_type-card');
const cardInputName = document.querySelector('.popup__input-text_title');
const cardInputLink = document.querySelector('.popup__input-text_link');

//console.log(cardPopup);

// попап всплывающей картинки -- определения 
const imgPopupCloseBtn = document.querySelector('.popup__close_type-image')
const imgPictureLoad = document.querySelector('.popup__fullpic');
const imgTitleLoad = document.querySelector('.popup__title_type-image');

// кнопки профиля, редактирование и добавление
const popupEditButton = document.querySelector('.profile__edit-btn');
const cardAddButton = document.querySelector('.profile__add-btn');

const profileNewName = document.querySelector('.profile__title');
const profileNewDescription = document.querySelector('.profile__description');

const formElements = document.forms.inputFormCard;
const formProfile = document.forms.inputFormProfile;
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

// эту функцию улучшу позже, не совсем понял 
// что имелось ввиду про делегирование
// скорее всего к сдаче 6-й работы 
elementsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('element__trash-icon')) {
    const element = event.target.closest('.element');
    element.remove();
  } else if (event.target.classList.contains('element__image')) {
    imgPictureLoad.src = event.target.attributes.src.value;
    imgTitleLoad.textContent = event.target.attributes.alt.value;
    openPopup(imgPopup);
  }
});

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

function handleEventPopupCloseOnOverspace(popup) {
  return function (event) {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
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
  profileInputName.value = '';
  profileInputDescription.value = '';
  openPopup(profilePopup);
});

formProfile.addEventListener("submit", event => {
  event.preventDefault();
  savePopupProfileChanges();
});

popupCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
});

profilePopup.addEventListener('click', handleEventPopupCloseOnOverspace(profilePopup));
cardPopup.addEventListener('click', handleEventPopupCloseOnOverspace(cardPopup));

cardAddButton.addEventListener('click', () => {
  cardInputLink.value = '';
  cardInputName.value = '';
  openPopup(cardPopup);
});

cardPopupCloseButton.addEventListener('click', () => {
  closePopup(cardPopup);
});

cardPopup.addEventListener('submit', event => {
  event.preventDefault();
  savePopupCardElement();
});

imgPopupCloseBtn.addEventListener('click', () => {
  closePopup(imgPopup)
});
