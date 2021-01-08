class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener('click', this._closePopupOnOverlay.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    document.removeEventListener('click', this._closePopupOnOverlay.bind(this));
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      //const openedPopup = document.querySelector(".popup_is-opened");  
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
  }

  takePopup() {
    return this._popup;
  }
};

export default Popup;

// нужно не забыть: публичное: открыть - есть, закрыть - есть
//     события :  по еск - есть, оверлей - есть, крестик - есть. 