const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-btn');
const popupAddButton = document.querySelector('.profile__add-btn');
const popupCloseButton = document.querySelector('.popup__close');
const popupSaveButton = document.querySelector('.popup__input-btn');
const profileNewName = document.querySelector('.profile__title');
const profileNewDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input-text_name');
const inputDescription = document.querySelector('.popup__input-text_description');
const formName = document.querySelector('.popup__title');
const form = document.querySelector("form");
const elementsContainer = document.querySelector('.elements');
const elemCardContainer = document.querySelector('#elem__container').content;
const initialCards = [
  {
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

function prepareElement(elementModel) {
  const element = elemCardContainer.cloneNode(true);
  if (elementModel.link) {
    element.querySelector('.element__image').src = elementModel.link;
  }
  if (elementModel.name) {
    element.querySelector('.element__title').textContent = elementModel.name;
  }
  element.querySelector('.element__like-icon').addEventListener('click', function (event) {
    event.target.classList.toggle('element__like-icon_active');
  });
  return element;
}

function appendElement(elementModel) {
  const element = prepareElement(elementModel);
  elementsContainer.append(element);
}

function prependElement(elementModel) {
  const element = prepareElement(elementModel);
  elementsContainer.prepend(element);
}

initialCards.forEach(appendElement);

elementsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('element__trash-icon')) {
    const element = event.target.closest('.element');
    element.remove();
  }
});

const popupOpen = function (event) {
  if (event.target.classList.value === 'profile__edit-btn') {
  //console.log(event.target.classList.value);
    formName.textContent = 'Редактировать профиль'
    inputName.value = profileNewName.textContent;
    inputDescription.value = profileNewDescription.textContent;
    form.addEventListener("submit", popupSaveNewData);
  } else {
  //if (event.target.classList.value === 'profile__add-btn') {
    formName.textContent = 'Новое место'
    inputName.value = 'Название';
    inputDescription.value = 'Ссылка на картинку';
    form.addEventListener("submit", popupSaveNewElement);
  }
  popup.classList.add('popup_is-opened');
}

const popupClose = function () {
  popup.classList.remove('popup_is-opened');
}
 
const popupCloseOnOverspace = function (event) {
  if (event.target === event.currentTarget) {
    popupClose();
  }
}

function popupSaveNewData() {
  event.preventDefault();
  if (inputName.value !== '') {
    profileNewName.textContent = inputName.value;
    profileNewDescription.textContent = inputDescription.value;
  }
  popupClose();
}

function popupSaveNewElement(elementModel) {
  event.preventDefault();
  if (inputName.value !== '') {
    elementModel.link = inputName.value;
    elementModel.name = inputDescription.value;
    prependElement(elementModel);
  }
  popupClose();
}

popupEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popup.addEventListener('click', popupCloseOnOverspace);
popupAddButton.addEventListener('click', popupOpen);