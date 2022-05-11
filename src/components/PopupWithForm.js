import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form-container');
    this._handleFormSubmit = handleFormSubmit;
  }

  // _getInputValues() {
  //   const inputValues = new Object();
  //   Array.from(this._form).forEach((input) => {
  //     if (input.classList.contains('popup__form-item')) {
  //       inputValues[input.name] = input.value;
  //       console.log(inputValues);
  //   };});
  //   return inputValues;
  // }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__form-item');
    this._formValues = {}
    this._inputList.forEach(input =>
      this._formValues[input.name] = input.value);
    return this._formValues;
  }


  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close-button')){
        this.close();
      };
    });
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    // this._form.addEventListener('submit', (evt) => {
    //   evt.preventDefault();
    //   this._formSubmit();
    //   this.close();
    // });
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    this._form.reset();
  }
}
