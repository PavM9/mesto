// переменные элементов страницы
const cardsContainer = document.querySelector('.cards__container');
const popupElements = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardTemplate = document.querySelector('#card-template').content;

//переменные для кнопок
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-card-button');
const popupCloseButton = document.querySelector('.popup__close-button');

// переменные для editProfilePopup
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileForm = editProfilePopup.querySelector('.popup__form-container');
const popupProfileName =  editProfileForm.querySelector('.popup__form-item_input_name');
const popupProfileDescription = editProfileForm.querySelector('.popup__form-item_input_description');
const editProfileSubmitButton = editProfileForm.querySelector('.popup__submit-button');

// переменные для addCardPopup
const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardForm = addCardPopup.querySelector('.popup__form-container');
const cardNameInputValue = addCardForm.querySelector('.popup__form-item_card_title');
const cardLinkInputValue = addCardForm.querySelector('.popup__form-item_card_link');
const addCardSubmitButton = addCardForm.querySelector('.popup__submit-button');

// переменные для fullScreenPopup
const fullScreenPopup = document.querySelector('.popup_type_image-fullscreen')
const popupImageContainer = fullScreenPopup.querySelector('.popup__image-container');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupImageCaption = popupImageContainer.querySelector('.popup__image-caption');

const likeCard = function(event) {
  event.target.classList.toggle('card__like-button_is-active');
};
const deleteCard = function (event) {
    event.target.closest('.card').remove();
};

const openFullScreenPopup = function (item) {
  popupImage.src = item.link;
  popupImage.alt = item.alt ? item.alt : item.name;
  popupImageCaption.textContent = item.name;
  openPopup(fullScreenPopup);
};

const initializeCard = function (item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardImage.src = item.link;
  cardImage.alt = item.alt ? item.alt : item.name;
  cardTitle.textContent = item.name;
  likeButton.addEventListener('click', likeCard);
  deleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', function () {
    openFullScreenPopup (item)
  });
  return cardElement;
};

const renderCards = function (item, cardsContainer) {
  const cardElement = initializeCard(item);
  cardsContainer.prepend(cardElement);
};

initialCards.forEach(function(item) {
  renderCards(item, cardsContainer);
});

const preventSubmitReactivation = function (item) {
  item.classList.add('popup__submit-button_disabled');
  item.disabled = true;
}

const addCardSubmitHandler = function (event) {
  event.preventDefault();
  preventSubmitReactivation(addCardSubmitButton);
  renderCards({
    name: cardNameInputValue.value,
    link: cardLinkInputValue.value,
    alt: cardNameInputValue.value
  }, cardsContainer);
  addCardForm.reset();
  closePopup(addCardPopup);
};
addCardForm.addEventListener('submit', addCardSubmitHandler);

const openPopup = function(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc)
}
const closePopup = function(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc)
}

const closePopupByClick = function(popup) {
  popup.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    };
    if (event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    };
  });
};

const closePopupByEsc = function(event) {
    if (event.key === "Escape") {
      const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);
    };
};
popupElements.forEach(closePopupByClick);
popupElements.forEach(closePopupByEsc);

const addInputValues = function() {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
}

function editProfileSubmitHandler (event) {
    event.preventDefault();
    preventSubmitReactivation(editProfileSubmitButton);
    profileName.textContent = popupProfileName.value;
    profileDescription.textContent = popupProfileDescription.value;
    closePopup(editProfilePopup);
}

const fillProfileForm = function() {
  openPopup(editProfilePopup);
  addInputValues();
};
editProfileForm.addEventListener('submit', editProfileSubmitHandler);
editProfileButton.addEventListener('click', fillProfileForm);
addCardButton.addEventListener('click', function() {
  openPopup(addCardPopup);
});




