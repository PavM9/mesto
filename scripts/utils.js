export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

export const closePopupByClick = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close-button')){
      closePopup(popup);
    };
  });
};

export const closePopupByEsc = (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);
    };
};

export const editProfileSubmitHandler = (evt) => {
  evt.preventDefault();
  preventSubmitReactivation(submitButtonEditProfile);
  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  closePopup(popupEditProfile);
}

// export const openFullScreenPopup = (_item) => {
//   this._popupImage.src = this._item._link;
//   this._popupImage.alt = this._item._alt ? this._item._alt : this._item._title;
//   this._popupImageCaption.textContent = this._item._title;
//   openPopup(popupFullScreen);
// };
