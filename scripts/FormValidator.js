class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
  }
  //приватные методы класса 
  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`${this._config.errorSelector}${inputElement.name}`);
    inputElement.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`${this._config.errorSelector}${inputElement.name}`);
    inputElement.classList.remove(this._config.inputErrorClass);
    this._errorElement.classList.remove(this._config.errorClass);
    this._errorElement.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    this._buttonElement.disabled = this._hasInvalidInput();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  };
};

export default FormValidator;