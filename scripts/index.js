// переменные элементов страницы
const cardsContainer = document.querySelector('.cards__container');
const popupElements = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardTemplate = document.querySelector('#card-template').content;

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

// переменные для popupFullScreen
const popupFullScreen = document.querySelector('.popup_type_image-fullscreen')
const popupImageContainer = popupFullScreen.querySelector('.popup__image-container');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupImageCaption = popupImageContainer.querySelector('.popup__image-caption');

const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};
const deleteCard = (evt) => {
    evt.target.closest('.card').remove();
};

const openFullScreenPopup = (item) => {
  popupImage.src = item.link;
  popupImage.alt = item.alt ? item.alt : item.name;
  popupImageCaption.textContent = item.name;
  openPopup(popupFullScreen);
};

const initializeCard = (item) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const buttonLike = cardElement.querySelector('.card__like-button');
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  cardImage.src = item.link;
  cardImage.alt = item.alt ? item.alt : item.name;
  cardTitle.textContent = item.name;
  buttonLike.addEventListener('click', likeCard);
  buttonDelete.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => {
    openFullScreenPopup (item)
  });
  return cardElement;
};

const renderCards = (item, cardsContainer) => {
  const cardElement = initializeCard(item);
  cardsContainer.prepend(cardElement);
};

initialCards.forEach((item) => {
  renderCards(item, cardsContainer);
});

const preventSubmitReactivation = (item) => {
  item.classList.add('popup__submit-button_disabled');
  item.disabled = true;
}

const addCardSubmitHandler = (evt) => {
  evt.preventDefault();
  preventSubmitReactivation(submitButtonAddCard);
  renderCards({
    name: cardNameInputValue.value,
    link: cardLinkInputValue.value,
    alt: cardNameInputValue.value
  }, cardsContainer);
  formAddCard.reset();
  closePopup(popupAddCard);
};
formAddCard.addEventListener('submit', addCardSubmitHandler);

const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc)
}
const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc)
}

const closePopupByClick = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close-button')){
      closePopup(popup);
    };
  });
};

const closePopupByEsc = (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);
    };
};

const addInputValues = () => {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
}

const editProfileSubmitHandler = (evt) => {
    evt.preventDefault();
    preventSubmitReactivation(submitButtonEditProfile);
    profileName.textContent = popupProfileName.value;
    profileDescription.textContent = popupProfileDescription.value;
    closePopup(popupEditProfile);
}

const fillProfileForm = () => {
  openPopup(popupEditProfile);
  addInputValues();
};
formEditProfile.addEventListener('submit', editProfileSubmitHandler);
buttonEditProfile.addEventListener('click', fillProfileForm);
buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard);
  formAddCard.reset();
});
popupElements.forEach(closePopupByClick);




