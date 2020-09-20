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

const elementsContainer = document.querySelector('.elements');
const elemCardContainer = document.querySelector('#elem__container').content;

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
  // element.querySelector('.element__trash-icon').addEventListener('click', () => {
  //   debugger;
  //   element.remove();
  // });
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

const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-btn');
const popupAddButton = document.querySelector('.profile__add-btn');
const popupCloseButton = document.querySelector('.popup__close');
const popupSaveButton = document.querySelector('.popup__input-btn');
const profileNewName = document.querySelector('.profile__title');
const profileNewDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input-text_name');
const inputDescription = document.querySelector('.popup__input-text_description');
const form = document.querySelector("form");

const popupOpen = function (event) {
  if (event.target.classList.value === 'profile__edit-btn') {
  //console.log(event.target.classList.value);
    inputName.value = profileNewName.textContent;
    inputDescription.value = profileNewDescription.textContent;
  }
  if (event.target.classList.value === 'profile__add-btn') {
    inputName.value = 'test-text';
    inputDescription.value = profileNewDescription.textContent;
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

form.addEventListener("submit", popupSaveNewData);

popupEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popupAddButton.addEventListener('click', popupOpen);
popup.addEventListener('click', popupCloseOnOverspace);