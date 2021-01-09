import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({
    popupSelector,
    handleFormSubmit
  }) {
    super(popupSelector);
    this._popup = super.takePopup();
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = this._popup.querySelectorAll('.popup__input-text');
    this._popupFormButton = this._popup.querySelector('.popup__input-btn');
  }

  _getInputValues() {
    const formValues = {};
    this._inputList = Array.from(this._inputElements);
    this._inputList.forEach(input => formValues[input.name] = input.value);

    return formValues;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })

    this.getForm().reset();
    super.setEventListeners();
  }

  close() {
    super.close();
  }

  getForm() {
    return this._popup.querySelector('.popup__input-form');
  }

};

export default PopupWithForm;