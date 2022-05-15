import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, { renderer }) {
    super(popupSelector);
    this._renderer = renderer;
  }

  changeAction(newAction) {
    this._renderer = newAction;
  }

  setEventListeners() {
    this._popup.addEventListener('submit',(evt) => {
      evt.preventDefault();
      this._renderer()})
  }
}
