const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-btn');
const popupCloseButton = document.querySelector('.popup__close');
const popupSaveButton = document.querySelector('.popup__input-btn');
const profileNewName = document.querySelector('.profile__title');
const profileNewDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input-text_name');
const inputDescription = document.querySelector('.popup__input-text_description');

const popupOpen = function () {
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
  if (inputName.value !== '') {
    profileNewName.textContent = inputName.value;
    profileNewDescription.textContent = inputDescription.value;
  }
  popupClose();
  return;
}

var form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  popupSaveNewData();
});

popupEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);

popup.addEventListener('click', popupCloseOnOverspace);