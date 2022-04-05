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
const cardsTemplate = document.querySelector('#card-template');

//переменные для кнопок
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-card-button');

// переменные для popupEditProfile
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form-container');
const popupProfileName =  formEditProfile.querySelector('.popup__form-item_input_name');
const popupProfileDescription = formEditProfile.querySelector('.popup__form-item_input_description');
const submitButtonEditProfile = formEditProfile.querySelector('.popup__submit-button');

// переменные для popupAddCard
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.popup__form-container');
const cardNameInputValue = formAddCard.querySelector('.popup__form-item_card_title');
const cardLinkInputValue = formAddCard.querySelector('.popup__form-item_card_link');
const submitButtonAddCard = formAddCard.querySelector('.popup__submit-button');

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

const preventSubmitReactivation = (item) => {
  item.classList.add('popup__submit-button_disabled');
  item.disabled = true;
};

const addCardSubmitHandler = (evt) => {
  evt.preventDefault();
  preventSubmitReactivation(submitButtonAddCard);
  renderCards({
    name: cardNameInputValue.value,
    link: cardLinkInputValue.value,
    alt: cardNameInputValue.value
  },'#card-template');
  formAddCard.reset();
  closePopup(popupAddCard);
};

const editProfileSubmitHandler = (evt) => {
    evt.preventDefault();
    preventSubmitReactivation(submitButtonEditProfile);
    profileName.textContent = popupProfileName.value;
    profileDescription.textContent = popupProfileDescription.value;
    closePopup(popupEditProfile);
};

const addInputValues = () => {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
};

const fillProfileForm = () => {
  openPopup(popupEditProfile);
  addInputValues();
};

formAddCard.addEventListener('submit', addCardSubmitHandler);
formEditProfile.addEventListener('submit', editProfileSubmitHandler);
buttonEditProfile.addEventListener('click', fillProfileForm);
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
  formAddCard.reset();
});
popupElements.forEach(closePopupByClick);
