const cardsContainer = document.querySelector('.cards__container')

const editProfileButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.profile__add-card-button')
const popupElement = document.querySelectorAll('.popup')
const editProfilePopup = document.querySelector('.popup_type_edit-profile')
const addCardPopup = document.querySelector('.popup_type_add-card')
const fullScreenPopup = document.querySelector('.popup_type_image-fullscreen')
// const popupImage = document.querySelector('.popup_image')
// const imageCaption = document.querySelector('.popup_image-caption')
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
const cardLike = function(event) {
  event.target.classList.toggle('card__like-button_is-active');
};
const deleteCard = function (event) {
    event.target.closest('.card').remove();
};
// const openFullScreenPopup = function (titleValue, linkValue, altValue) {
//     openPopup(fullScreenPopup);
//     popupImage.src = linkValue;
//     popupImage.alt = altValue;
//     imageCaption.textContent = titleValue;
// }
const cardTemplate = document.querySelector('#card-template');
// const cardElement = cardTemplate.querySelector('.card');
const cardImage = cardTemplate.querySelector('.card__image');
const cardTitle = cardTemplate.querySelector('.card__title');
const likeButton = cardTemplate.querySelector('.card__like-button');
const deleteButton = cardTemplate.querySelector('.card__delete-button');
const initializeCard = function (titleValue, linkValue, altValue) {
  const cardElement = cardTemplate.content.cloneNode(true);
  // const cardImage = cardElement.querySelector('.card__image');
  // const cardTitle = cardElement.querySelector('.card__title');
  // const likeButton = cardElement.querySelector('.card__like-button');
  // const deleteButton = cardElement.querySelector('.card__delete-button');
  const popupImage = document.querySelector('.popup_image')
  const imageCaption = document.querySelector('.popup_image-caption')
  cardImage.src = linkValue;
  cardImage.alt = altValue;
  cardTitle.textContent = titleValue;
  likeButton.addEventListener('click', cardLike);
  deleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', function () {

    popupImage.src = linkValue;
    popupImage.alt = altValue;
    imageCaption.textContent = titleValue;
    openPopup(fullScreenPopup);
  })
  return cardElement;
};

function renderCards(titleValue, linkValue, altValue) {
  const cardElement = initializeCard(titleValue, linkValue, altValue);
  cardsContainer.append(cardElement);
};

initialCards.forEach(function(item) {
  renderCards(item.name, item.link, item.alt);
});


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




