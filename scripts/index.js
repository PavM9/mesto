const editProfileButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.profile__add-card-button')
const popupElement = document.querySelectorAll('.popup')
const editProfilePopup = document.querySelector('.popup_type_edit-profile')
const addCardPopup = document.querySelector('.popup_type_add-card')
const popupCloseButton = document.querySelector('.popup__close-button')
const popupForm = document.querySelector('.popup__form-container')
let popupProfileName =  popupForm.querySelector('.popup__form-item_input_name')
let popupProfileDescription = popupForm.querySelector('.popup__form-item_input_description')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

const initialCards = [
  {
    name: 'Териберка',
    link: 'images/teriberka.jpg'
  },
  {
    name: 'Камчатка',
    link: 'images/kamchatka.jpg'
  },
  {
    name: 'Кабардино-Балкария',
    link: 'images/kabardino-balkaria.jpg'
  },
  {
    name: 'Алтай',
    link: 'images/altai.jpg'
  },
  {
    name: 'Урал',
    link: 'images/ural.jpg'
  },
  {
    name: 'Карелия',
    link: 'images/karelia.jpg'
  }
];

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




