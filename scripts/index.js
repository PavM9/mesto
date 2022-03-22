const cardsContainer = document.querySelector('.cards__container')

const editProfileButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.profile__add-card-button')
const popupElement = document.querySelectorAll('.popup')
const editProfilePopup = document.querySelector('.popup_type_edit-profile')
const addCardPopup = document.querySelector('.popup_type_add-card')
const fullScreenPopup = document.querySelector('.popup_type_image-fullscreen')
const popupImageContainer = fullScreenPopup.querySelector('.popup__image-container')
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupImageCaption = popupImageContainer.querySelector('.popup__image-caption');
const popupCloseButton = document.querySelector('.popup__close-button')
const popupForm = document.querySelector('.popup__form-container')
let popupProfileName =  popupForm.querySelector('.popup__form-item_input_name')
let popupProfileDescription = popupForm.querySelector('.popup__form-item_input_description')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

const initialCards = [
  {
    name: 'Териберка',
    link: 'images/teriberka.jpg',
    alt: 'Заброшенное судно на песчаном берегу'
  },
  {
    name: 'Камчатка',
    link: 'images/kamchatka.jpg',
    alt: 'Вершина горы в облаках'
  },
  {
    name: 'Кабардино-Балкария',
    link: 'images/kabardino-balkaria.jpg',
    alt: 'Река в горной долине'
  },
  {
    name: 'Алтай',
    link: 'images/altai.jpg',
    alt: 'Река в горной долине'
  },
  {
    name: 'Урал',
    link: 'images/ural.jpg',
    alt: 'Горный хребет на фоне заката'
  },
  {
    name: 'Карелия',
    link: 'images/karelia.jpg',
    alt: 'Деревянная церковь'
  }
];
const likeCard = function(event) {
  event.target.classList.toggle('card__like-button_is-active');
};
const deleteCard = function (event) {
    event.target.closest('.card').remove();
};

const openFullScreenPopup = function (item) {
  popupImage.src = item.link;
  popupImage.alt = item.alt;
  popupImageCaption.textContent = item.name;
  openPopup(fullScreenPopup);
};

const initializeCard = function (item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardImage.src = item.link;
  cardImage.alt = item.alt;
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
  cardsContainer.append(cardElement);
};

initialCards.forEach(function(item) {
  renderCards(item, cardsContainer);
});

// const handleCardFormSubmit = (evt) => {
//   evt.preventDefault();
//   renderCard({
//     name: cardNameInputValue.value,
//     link: cardLinkInputValue.value
//   }, placesWrap);
//   closeModalWindow(cardFormModalWindow);
// };

const openPopup = function(popup) {
  popup.classList.add('popup_is-opened')
}
const closePopup = function(popup) {
  popup.classList.remove('popup_is-opened')
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
popupElement.forEach(closePopupByClick);

const addInputValues = function() {
  popupProfileName.value = profileName.textContent
  popupProfileDescription.value = profileDescription.textContent
}

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = popupProfileName.value
    profileDescription.textContent = popupProfileDescription.value
    closePopup()
}

popupForm.addEventListener('submit', formSubmitHandler)
editProfileButton.addEventListener('click', function() {
  openPopup(editProfilePopup)
  addInputValues()
});
addCardButton.addEventListener('click', function() {
  openPopup(addCardPopup)
});




