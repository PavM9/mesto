export default class Card {
  constructor({ item, userId, handleCardClick, handleLikeClick, handleCardDelete }, cardSelector) {
    this._item = item;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardDelete = handleCardDelete;
    this._cardSelector = cardSelector;

    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._buttonDelete = this._element.querySelector('.card__delete-button');
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  initializeCard () {
    this._likes = this._item.likes;
    this._id = this._item._id;
    this._ownerId = this._item.owner._id;
    this._cardImage.src = this._item.link;
    this._cardImage.alt = this._item.alt ? this._item.alt : this._item.name;
    this._cardTitle.textContent = this._item.name;
    this._setEventListeners();
    this.getLikes(this._likes);
    if(this._ownerId !== this._userId) {
      this._buttonDelete.style.display = 'none'
    }
    return this._element;
  }

  _activateLike = () => {
    this._buttonLike.classList.add('card__like-button_is-active');
  }

  _disableLike = () => {
    this._buttonLike.classList.remove('card__like-button_is-active');
  }

  isLiked = () => {
    return (this._likes.find(user => user._id === this._userId));
  }

  getLikes(newLikes) {
    this._likes = newLikes;
    const likesCounter = this._element.querySelector('.card__like-counter');
    likesCounter.textContent = this._likes.length;
    if(this.isLiked()) {
      this._activateLike()
    } else {
      this._disableLike()
    }
  }

  deleteCard () {
    this._element.remove();
    this._element = null;
  }

  _openPopupWithImage = () => {
    this._handleCardClick({
      name: this._item.name,
      alt: this._item.alt ? this._item.alt : this._item.name,
      src: this._item.link
    });
  }

  _setEventListeners () {
    this._buttonLike.addEventListener('click', () => this._handleLikeClick(this._id));
    this._buttonDelete.addEventListener('click', () => this._handleCardDelete(this._id));
    this._cardImage.addEventListener('click', this._openPopupWithImage);
  };
}

