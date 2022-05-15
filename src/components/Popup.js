export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonSubmit = this._popup.querySelector('.popup__submit-button');
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_is-opened');
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  loadingMessage(loading) {
    if (loading) {
      this._buttonSubmit.textContent = 'Сохранение...'
    } else if (this._popup === '.popup_type_add-card') {
      this._buttonSubmit.textContent = 'Создать'
    } else {
      this._buttonSubmit.textContent = 'Сохранить'
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close-button')){
        this.close();
      };
    });
  }
}
