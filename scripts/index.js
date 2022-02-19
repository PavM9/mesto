const editProfileButton = document.querySelector('.profile__edit-button')
const editProfilePopup = document.querySelector('.popup')
const popupCloseButton = editProfilePopup.querySelector('.popup__close-button')
const popupForm = editProfilePopup.querySelector('.popup__form-container')
let popupProfileName =  popupForm.querySelector('.popup__form-item_input_name')
let popupProfileDescription = popupForm.querySelector('.popup__form-item_input_description')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

const openPopup = function() {
  editProfilePopup.classList.add('popup_is-opened')
}
const closePopup = function() {
  editProfilePopup.classList.remove('popup_is-opened')
}
const closePopupByOverlay = function(event) {
   if (event.target !== event.currentTarget) {
    return
  }
  closePopup()
}
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
  openPopup()
  addInputValues()
})
popupCloseButton.addEventListener('click', closePopup)
editProfilePopup.addEventListener('click', closePopupByOverlay)


