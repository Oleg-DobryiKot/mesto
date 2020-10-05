const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(config.inputErrorClass);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(config.inputErrorClass);
  inputElement.classList.remove(config.errorClass);
  errorElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
    });
  });
};

const enableValidation = (config) => {
  //  debugger
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', function (event) {
      event.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

// инициализация конфигураций для разных попапов
enableValidation({
  formSelector: '.popup__input-form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__input-btn',
  inactiveButtonClass: 'popup__input-btn_disabled',
  inputErrorClass: 'popup__input-text_type_error',  
  errorClass: 'popup__error_visible' 
});

enableValidation({
  formSelector: '.card-popup__input-form',
  inputSelector: '.card-popup__input-text',
  submitButtonSelector: '.card-popup__input-btn',
  inactiveButtonClass: 'card-popup__input-btn_disabled',
  inputErrorClass: 'card-popup__input-text_type_error',
  errorClass: 'card-popup__error_visible'
});
