const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-btn');
const popupCloseButton = document.querySelector('.popup__close');
const popupSaveButton = document.querySelector('.popup__input-btn');
const SaveButton = document.querySelector('.popup__input-btn_save');
const profileNewName = document.querySelector('.profile__title');
const profileNewDescription = document.querySelector('.profile__description')

const popupToggle = function () {
  popup.classList.toggle('popup_is-opened');
}

const ClosePopupOnOverspace = function () {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupToggle();
}

function SaveNewData() {
  let name = document.querySelector('.popup__input-text_name');
  let description = document.querySelector('.popup__input-text_description');
  
  if (name !== '') {
    profileNewName.textContent = name.value;
    profileNewDescription.textContent = description.value;
  }
  return;
}

SaveButton.addEventListener('click', SaveNewData);

popupEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
popupSaveButton.addEventListener('click', popupToggle);
popup.addEventListener('click', ClosePopupOnOverspace);