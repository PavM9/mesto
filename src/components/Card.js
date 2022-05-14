export default class Card {
  constructor({ item, handleCardClick, handleLikeClick, handleCardDelete }, cardSelector) {
    this._item = item;
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
    this._cardImage.src = this._item.link;
    this._cardImage.alt = this._item.alt ? this._item.alt : this._item.title;
    this._cardTitle.textContent = this._item.name;
    this._setEventListeners();
    return this._element;
  }

  deleteCard () {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners () {
    this._buttonLike.addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like-button_is-active');
    });
    this._buttonDelete.addEventListener('click', () => {
      this._handleCardDelete();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({
        name: this._item.name,
        alt: this._item.alt ? this._item.alt : this._item.name,
        src: this._item.link
      });
      });
  };
}

