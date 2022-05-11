export default class Card {
  constructor({ item, handleCardClick }, cardSelector) {
    // this._title = data.name;
    // this._link = data.link;
    // this._alt = data.alt;
    this._item = item;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardTemplate;
  }

  initializeCard () {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    // this._cardImage.src = this._link;
    // this._cardImage.alt = this._alt ? this._alt : this._title;
    // this._cardTitle.textContent = this._title;
    this._cardImage.src = this._item.link;
    this._cardImage.alt = this._item.alt ? this._item.alt : this._item.title;
    this._cardTitle.textContent = this._item.name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners () {
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._buttonDelete = this._element.querySelector('.card__delete-button');
    this._buttonLike.addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like-button_is-active');
    });
    this._buttonDelete.addEventListener('click', (evt) => {
      evt.target.closest('.card').remove();
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

