const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`${config.errorSelector}${inputElement.name}`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}; // перенес в класс, приватный метод

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`${config.errorSelector}${inputElement.name}`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
}; // перенес в класс, приватный метод

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}; // перенес в класс, вх.параметр только inputElement, остальное в конструкторе.

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; // перенес как _hasInvalidInput(), приватный метод 

const toggleButtonState = (inputList, buttonElement) => {
  buttonElement.disabled = hasInvalidInput(inputList);
}; // перенес в класс и исправил

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; // перенес в коасс

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', function (event) {
      event.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}; //перенес в класс

// инициализация конфигурации для всех попапов ввода сразу.
// продумать где ее теперь вызвать. теоретически перенести в index.js

enableValidation({
  formSelector: '.popup__input-form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__input-btn',
  inputErrorClass: 'popup__input-text_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_visible'
});