import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgTitleLoad = this._popup.querySelector('.popup__title_type-image');
    this._imgPictureLoad = this._popup.querySelector('.popup__fullpic');
  }

  open(name, link) {
    super.open();
    this._imgTitleLoad.textContent = name;
    this._imgPictureLoad.src = link;
    this._imgPictureLoad.alt = name;
  }

};

export default PopupWithImage;