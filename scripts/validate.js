const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`${config.errorSelector}${inputElement.name}`); 
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`${config.errorSelector}${inputElement.name}`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  // errorElement.textContent = '';
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

const toggleButtonState = (inputList, buttonElement) => {
  buttonElement.disabled = hasInvalidInput(inputList);
};

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
  formSelector: '.popup__input-form_type-profile',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__input-btn_type-profile',
  // inactiveButtonClass: 'popup__input-btn_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_visible'
});

enableValidation({
  formSelector: '.popup__input-form_type-card',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__input-btn_type-card',
  // inactiveButtonClass: 'popup__input-btn_disabled',
  inputErrorClass: 'popup__input-text_type_error',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_visible'
});