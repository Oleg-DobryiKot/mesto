class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupOnOverlay = this._closePopupOnOverlay.bind(this);
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _closePopupOnOverlay(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('click', this._closePopupOnOverlay);
  }
};

export default Popup;