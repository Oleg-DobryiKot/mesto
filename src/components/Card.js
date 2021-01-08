class Card {
  constructor({cardData, handleCardClick}, cardTemplate) {
    this._cardTemplateNode = cardTemplate;
    this._data = cardData;
    this._handleCardClick = handleCardClick;
  }

  _getCardTemplate() {
    const cardElement = this._cardTemplateNode
      .cloneNode(true)
      .querySelector('.element');

    return cardElement;
  }

  // getData() {
  //   return this._data;
  // }

  // onImageClick(callback) {
  //   this._cardElementImage.addEventListener('click', callback);
  // }

  createCard() {
    this._element = this._getCardTemplate();
    this._cardElementImage = this._element.querySelector('.element__image');
    this._cardDeleteIcon = this._element.querySelector('.element__trash-icon');
    this._cardLikeIcon = this._element.querySelector('.element__like-icon');

    this._setEventListeners();

    this._cardElementImage.src = this._data.link;
    this._cardElementImage.alt = this._data.name;
    this._element.querySelector('.element__title').textContent = this._data.name;

    return this._element;
  }

  _toggleLikeIcon() {
    this._cardLikeIcon.classList.toggle('element__like-icon_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardLikeIcon.addEventListener('click', () => {
      this._toggleLikeIcon()
    });
    this._cardDeleteIcon.addEventListener('click', () => {
      this._deleteCard()
    });
    this._cardElementImage.addEventListener('click', () => {
			this._handleCardClick(this._data)
		});
  }
}

export default Card;