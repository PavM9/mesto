import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({popupSelector, renderer}) {
    super(popupSelector);
    this._renderer = renderer;
  }

  changeAction(newAction) {
    this._renderer = newAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefult();
      this.changeAction();
      this.close();
    });
  }
}
