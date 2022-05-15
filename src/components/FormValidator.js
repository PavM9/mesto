export default class FormValidator {
  constructor(settingsObj, formElement) {
    this._formSelector = settingsObj.formSelector;
    this._inputSelector = settingsObj.inputSelector;
    this._submitButtonSelector = settingsObj.submitButtonSelector;
    this._inactiveButtonClass = settingsObj.inactiveButtonClass;
    this._inputErrorClass = settingsObj.inputErrorClass;
    this._errorClassVisible = settingsObj.errorClassVisible;
    this._formElement = formElement;
  };

  _showInputError (formInput, errorMessage) {
    this._errorElement = this._formElement.querySelector(`.${formInput.id}-error`);
    this._errorElement.classList.add(this._errorClassVisible);
    this._errorElement.textContent = errorMessage;
    formInput.classList.add(this._inputErrorClass);
  };

  _hideInputError (formInput) {
    this._errorElement = this._formElement.querySelector(`.${formInput.id}-error`);
    this._errorElement.classList.remove(this._errorClassVisible);
    this._errorElement.textContent = ' ';
    formInput.classList.remove(this._inputErrorClass);
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    };
  };

  _checkInputValidity (formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  };

  enableValidation() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this.toggleButtonState();
    // this._formElement.addEventListener('reset', () => {
    //   setTimeout(() => {
    //     this.toggleButtonState();
    //   });
    // });
    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkInputValidity(formInput);
        this.toggleButtonState();
      });
    });
  };
}
