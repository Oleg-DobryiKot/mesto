import Popup from './Popup.js'

class PopupWithConfirm extends Popup {
  constructor({
    popupSelector,
    handleFormSubmit
  }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.popupFormElement = this._popup.querySelector('.popup__input-form');
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._deleteElement);
    })
    super.setEventListeners();
  }

  open(elementWithId) {
    this._deleteElement = elementWithId;
    super.open();
  }
}

export default PopupWithConfirm;