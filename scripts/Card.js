import { openPopup } from "./utils.js";

const popupFullScreen = document.querySelector('.popup_type_image-fullscreen')
const popupImageContainer = popupFullScreen.querySelector('.popup__image-container');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupImageCaption = popupImageContainer.querySelector('.popup__image-caption');

export class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._link = data.link;
    this._alt = data.alt;
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
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt ? this._alt : this._title;
    this._cardTitle.textContent = this._title;
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
      popupImage.src = this._link;
      popupImage.alt = this._alt ? this._alt : this._title;
      popupImageCaption.textContent = this._title;
      openPopup(popupFullScreen);
      });
  };
}

