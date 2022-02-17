const editProfileButton = document.querySelector('.profile__edit-button')
const editProfilePopup = document.querySelector('.popup_edit-profile')
const popupCloseButton = editProfilePopup.querySelector('.popup__close-button')
const popupSubmitButton = editProfilePopup.querySelector('popup__submit-button')
const popupForm = editProfilePopup.querySelector('.popup__form-container')
const popupFormSubmitButton = editProfilePopup.querySelector('.popup__submit-button')
let popupProfileName =  popupForm.querySelector('.popup__form-item_input_name')
let popupProfileDescription = popupForm.querySelector('.popup__form-item_input_description')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

const openPopup = function() {
  editProfilePopup.classList.add('popup_is-opened')
}
const closePopup = function() {
  editProfilePopup.classList.remove('popup_is-opened')
  addInputValues()
  // popupProfileName.value = profileName.textContent
  // popupProfileDescription.value = profileDescription.textContent
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
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    // let profile1 = profileName
    // let profile2 = profileDescription

    // profile1.textContent = popupProfileName.value
    // profile2.textContent = popupProfileDescription.value

    profileName.textContent = popupProfileName.value
    profileDescription.textContent = popupProfileDescription.value
    closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupFormSubmitButton.addEventListener('click', formSubmitHandler);
editProfileButton.addEventListener('click', openPopup)
editProfileButton.addEventListener('click', addInputValues)
popupCloseButton.addEventListener('click', closePopup)
editProfilePopup.addEventListener('click', closePopupByOverlay)


