const popupEditProfileButtonElement = document.querySelector('.profile__edit-button')
const popupEditProfileElement = document.querySelector('.popup_edit-profile')
const popupCloseButtonElement = popupEditProfileElement.querySelector('.popup__close-button')
const popupSubmitButtonElement = popupEditProfileElement.querySelector('popup__submit-button')
let popupProfileName =  popupEditProfileElement.querySelector('popup__form-item_input_name')
let popupProfileDescription =  popupEditProfileElement.querySelector('popup__form-item_input_description')

const togglePopupVisibility = function() {
  popupEditProfileElement.classList.toggle('popup_is-opened')
}
const closePopup = function() {
  popupEditProfileElement.classList.remove('popup_is-opened')
}
const closePopupByOverlay = function(event) {
  console.log(event.target, event.currentTarget)
  if (event.target !== event.currentTarget) {
    return
  }
  closePopup()
}

popupEditProfileButtonElement.addEventListener('click', togglePopupVisibility)
popupCloseButtonElement.addEventListener('click', closePopup)
popupEditProfileElement.addEventListener('click', closePopupByOverlay)
let ProfileName = document.querySelector('.profile__name')
console.log(ProfileName)
console.log(ProfileName.textContent)
popupProfileName.insertAdjacentText('afterbegin',ProfileName.textContent)
// // popupProfileName = document.querySelector('.profile__name')
console.log(popupProfileName.textContent)
