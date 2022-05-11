export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_is-opened');
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close-button')){
        this.close();
      };
    });
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
}
