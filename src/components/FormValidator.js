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

  _showInputError = (formInput) => {
    this._errorElement = this._formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(this._inputErrorClass);
    this._errorElement.textContent = formInput.validationMessage;
    this._errorElement.classList.add(this._errorClassVisible);
  };

  _hideInputError  = (formInput) => {
    this._errorElement = this._formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = ' ';
    this._errorElement.classList.remove(this._errorClassVisible);
  };

  _checkInputValidity = (formInput) => {
    if (!formInput.validity.valid) {
      this._showInputError(formInput);
    } else {
      this._hideInputError(formInput);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((formInput) => {
      return !formInput.validity.valid;
    })
  };

  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    };
  };



  enableValidation = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this.toggleButtonState();
    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkInputValidity(formInput);
        this.toggleButtonState();
      });
    });
  };
}
