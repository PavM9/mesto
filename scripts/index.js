import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './cardsData.js';
import { settingsObj } from './cardsData.js';
import { openPopup } from "./utils.js";
import { closePopup } from "./utils.js";
import { closePopupByClick } from "./utils.js";

// переменные элементов страницы
const cardsContainer = document.querySelector('.cards__container');
const popupElements = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


//переменные для кнопок
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-card-button');

// переменные для popupEditProfile
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form-container');
const popupProfileName =  formEditProfile.querySelector('.popup__form-item_input_name');
const popupProfileDescription = formEditProfile.querySelector('.popup__form-item_input_description');


// переменные для popupAddCard
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.popup__form-container');
const cardNameInputValue = formAddCard.querySelector('.popup__form-item_card_title');
const cardLinkInputValue = formAddCard.querySelector('.popup__form-item_card_link');


// переменные для валидации форм
const profileValidation = new FormValidator(settingsObj, formEditProfile);
const addCardValidation = new FormValidator(settingsObj, formAddCard);

profileValidation.enableValidation();
addCardValidation.enableValidation();

const initializeNewCard = (data, cardSelector) => {
  const card = new Card(data, cardSelector);
  return card.initializeCard();
};

const renderCards = (data, cardSelector) => {
  const cardElement = initializeNewCard(data, cardSelector);
  cardsContainer.prepend(cardElement);
};

initialCards.forEach((data) => {
  renderCards(data, '#card-template');
});

const addCardSubmitHandler = (evt) => {
  evt.preventDefault();
  addCardValidation.toggleButtonState();
  renderCards({
    name: cardNameInputValue.value,
    link: cardLinkInputValue.value,
    alt: cardNameInputValue.value
  },'#card-template');
  closePopup(popupAddCard);
  formAddCard.reset();
  addCardValidation.toggleButtonState();
};

const editProfileSubmitHandler = (evt) => {
    evt.preventDefault();
    profileValidation.toggleButtonState();
    profileName.textContent = popupProfileName.value;
    profileDescription.textContent = popupProfileDescription.value;
    closePopup(popupEditProfile);
    formEditProfile.reset();
    profileValidation.toggleButtonState();
};

const addInputValues = () => {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
};

const fillProfileForm = () => {
  addInputValues();
  openPopup(popupEditProfile);
};

formAddCard.addEventListener('submit', addCardSubmitHandler);
formEditProfile.addEventListener('submit', editProfileSubmitHandler);
buttonEditProfile.addEventListener('click', fillProfileForm);
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
  formAddCard.reset();
});
popupElements.forEach(closePopupByClick);
