// импорт стилей
import './index.css';

// импорт классов и переменных
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit';
import UserInfo from '../components/UserInfo.js';
import { cardsContainerSelector, cardTemplateSelector, profileNameSelector, profileDescriptionSelector,
  buttonEditProfile, buttonAddCard, buttonDeleteCard, formEditProfile,
  popupProfileName, popupProfileDescription, formAddCard, initialCards, settingsObj } from '../utils/constants.js';

// запуск валидации форм
const profileInfo = new UserInfo({name: profileNameSelector, description: profileDescriptionSelector});
const profileValidation = new FormValidator(settingsObj, formEditProfile);
const addCardValidation = new FormValidator(settingsObj, formAddCard);
profileValidation.enableValidation();
addCardValidation.enableValidation();

// создание карточек
const createNewCard = (item) => {
  const card = new Card({
    item,
    handleCardClick: () => {
      popupWithImage.open(item)
    },
    handleCardDelete: () => {
      popupConfirmDelete.open()
      popupConfirmDelete.changeAction(() => {
        card.deleteCard()
        popupConfirmDelete.close()
      })
    }

  }, cardTemplateSelector);
  return card.initializeCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
      cardList.addItem(createNewCard(item));
    }
  }, cardsContainerSelector
);
cardList.addInitialItems();


// создание попапов
const popupWithImage = new PopupWithImage('.popup_type_image-fullscreen');
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  handleFormSubmit: (item) => {
    profileInfo.setUserInfo(item);
     },
});

const popupAddCard = new PopupWithForm('.popup_type_add-card', {
  handleFormSubmit: (item) => {
    cardList.addItem(createNewCard(item));
     },
  });

const popupConfirmDelete = new PopupWithSubmit({popupSelector: '.popup_type_confirm',
renderer: () => {
  Card.deleteCard()
}
});

// обработчики событий
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupConfirmDelete.setEventListeners();

const handleEditProfile = () => {
  profileValidation.toggleButtonState();
  const { name, description } = profileInfo.getUserInfo();
  popupProfileName.value = name;
  popupProfileDescription.value = description;
  popupEditProfile.open();
}

// отслеживание кнопок
buttonEditProfile.addEventListener('click', handleEditProfile);

buttonAddCard.addEventListener('click', function() {
  popupAddCard.open();
  addCardValidation.toggleButtonState();
});

// buttonDeleteCard.addEventListener('click', function() {
//   popupConfirmDelete.open();
// });
