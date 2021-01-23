class Card {
  constructor({
    cardData,
    userData,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  }, cardTemplate) {
    this._cardTemplateNode = cardTemplate;
    this._data = cardData;
    this._userData = userData;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getCardTemplate() {
    const cardElement = this._cardTemplateNode
      .cloneNode(true)
      .querySelector('.element');

    return cardElement;
  }

  createCardElement() {
    this._element = this._getCardTemplate();
    this._cardElementImage = this._element.querySelector('.element__image');
    this._cardDeleteIcon = this._element.querySelector('.element__trash-icon');
    this._cardLikeIcon = this._element.querySelector('.element__like-icon');
    this._likeCounter = this._element.querySelector('.element__like-count');

    this._setDeleteIcon();
    this.updateLikeCount(this._data);
    this._setEventListeners();

    this._cardElementImage.src = this._data.link;
    this._cardElementImage.alt = this._data.name;
    this._element.querySelector('.element__title').textContent = this._data.name;

    return this._element;
  }

  isLiked() {
    return this._data.likes.some(like => like._id === this._userData._id);
  }

  updateLikeCount(response) {
    this._data = response;
    this._likeCounter.textContent = response.likes.length;
    this._toggleLikeIcon();
  }

  _toggleLikeIcon() {
    if (this.isLiked()) {
      this._cardLikeIcon.classList.add('element__like-icon_active');
    } else {
      this._cardLikeIcon.classList.remove('element__like-icon_active');
    }
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setDeleteIcon() {
    if (this._userData._id !== this._data.owner._id) {
      this._cardDeleteIcon.remove();
    }
  }

  _setEventListeners() {
    this._cardLikeIcon.addEventListener('click', () => {
      this._handleLikeClick(this._data._id)
    });
    this._cardDeleteIcon.addEventListener('click', () => {
      this._handleDeleteClick(this._element, this._data._id)
    });
    this._cardElementImage.addEventListener('click', () => {
      this._handleCardClick(this._data)
    });
  }
}

export default Card;