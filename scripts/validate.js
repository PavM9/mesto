const settingsObj = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__form-item_invalid',
  errorClassVisible: 'popup__error_visible'
}

const showInputError = (formElement, formInput, errorMessage, settingsObj) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  errorElement.classList.add(settingsObj.errorClassVisible);
  errorElement.textContent = errorMessage;
  formInput.classList.add(settingsObj.inputErrorClass);
};

const hideInputError = (formElement, formInput, settingsObj) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  errorElement.classList.remove(settingsObj.errorClassVisible);
  errorElement.textContent = ' ';
  formInput.classList.remove(settingsObj.inputErrorClass);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, settingsObj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsObj.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settingsObj.inactiveButtonClass);
    buttonElement.disabled = false;
  };
};

const checkInputValidity = (formElement, inputElement, settingsObj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsObj);
  } else {
    hideInputError(formElement, inputElement, settingsObj);
  }
};

const setEventListeners = (formElement, settingsObj) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsObj.inputSelector));
  const buttonElement = formElement.querySelector(settingsObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settingsObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settingsObj);
      toggleButtonState(inputList, buttonElement, settingsObj);
    });
  });
};

const enableValidation = (settingsObj) => {
  const formList = Array.from(document.querySelectorAll(settingsObj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settingsObj);
  });
};

enableValidation(settingsObj);
