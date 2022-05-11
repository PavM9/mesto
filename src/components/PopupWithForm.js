import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit } ) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form-container');
    this._inputList = this._popup.querySelectorAll('.popup__form-item');
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
    this._formValues = {}
    this._inputList.forEach(input =>
      this._formValues[input.name] = input.value);
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}


// import { Popup } from "./Popup.js";

// export class PopupWithForm extends Popup {
//   constructor(popupSelector, { handleSubmitForm }) {
//     super(popupSelector);
//     this._handleSubmitForm = handleSubmitForm;
//     this._popupForm = this._popup.querySelector(".popup__form");
//     this._inputList = this._popup.querySelectorAll(".popup__input");
//   }

//   _getInputValues() {
//     this._formValues = {};
//     this._inputList.forEach(
//       (input) => (this._formValues[input.name] = input.value)
//     );

//     return this._formValues;
//   }
//   close() {
//     super.close();
//     this._popupForm.reset();
//   }

//   setEventListeners() {
//     super.setEventListeners();
//     this._popupForm.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//       this._handleSubmitForm(this._getInputValues());
//       this.close();
//     });
//   }
// }
