// импорт стилей
import './index.css';

// импорт классов и переменных
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { cardsContainerSelector, cardTemplateSelector, profileNameSelector, profileDescriptionSelector,
  buttonEditProfile, buttonAddCard, formEditProfile,
  popupProfileName, popupProfileDescription, formAddCard, initialCards, settingsObj } from '../utils/constants.js';

// запуск валидации форм
const ProfileInfo = new UserInfo({name: profileNameSelector, description: profileDescriptionSelector});
const profileValidation = new FormValidator(settingsObj, formEditProfile);
const addCardValidation = new FormValidator(settingsObj, formAddCard);
profileValidation.enableValidation();
addCardValidation.enableValidation();

// создание карточек
const createNewCard = (item) => {
  const card = new Card({
    item,
    handleCardClick: () => {
      PopupImage.open(item)
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
const PopupImage = new PopupWithImage('.popup_type_image-fullscreen');
const PopupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  handleFormSubmit: (item) => {
    ProfileInfo.setUserInfo(item.name, item.description);
     },
});

const PopupAddCard = new PopupWithForm('.popup_type_add-card', {
  handleFormSubmit: (item) => {
    cardList.addItem(createNewCard(item));
     },
  });

// обработчики событий
PopupImage.setEventListeners();
PopupEditProfile.setEventListeners();
PopupAddCard.setEventListeners();

// отслеживание кнопок
buttonEditProfile.addEventListener('click', function() {
  profileValidation.toggleButtonState();
  popupProfileName.value = ProfileInfo.getUserInfo().name;
  popupProfileDescription.value = ProfileInfo.getUserInfo().description;
  PopupEditProfile.open();

});

buttonAddCard.addEventListener('click', function() {
  PopupAddCard.open();
  addCardValidation.toggleButtonState();
});
