class Card {
  constructor(cardData, cardTemplateSelector) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._name = cardData.name;
    this._link = cardData.link;
	this._data = cardData;
  }

  _getCardTemplate() {
	const cardElement = this._cardTempateSelector
	  .cloneNode(true)
      .querySelector('.element');

    return cardElement;
  }

  createCard() {
    this._element = this._getCardTemplate();
    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _toggleLikeIcon() {
	  this._cardLikeIcon.classList.toggle('element__like-icon_active');
  }

  _deleteCard() {
	  this._element.remove();	  
  }

  _setEventListeners() {
    this._cardDeleteIcon = this._element.querySelector('.element__trash-icon');
    this._cardLikeIcon = this._element.querySelector('.element__like-icon');
    this._cardElementImage = this._element.querySelector('.element__image');

    this._cardLikeIcon.addEventListener('click', () => {this._toggleLikeIcon()});

    this._cardDeleteIcon.addEventListener('click', () => {this._deleteCard()});

    // this._elementImage.addEventListener('click', () => {
    //   this._handleImageClick(this._name, this._link)
    //});
  }
}

export default Card;