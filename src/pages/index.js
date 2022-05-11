// импорт стилей
import './index.css';

// импорт классов и переменных
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { cardsContainer, cardTemplate, profileName, profileDescription,
  buttonEditProfile, buttonAddCard, formEditProfile,
  popupProfileName, popupProfileDescription, formAddCard, initialCards, settingsObj } from '../utils/constants.js';

// запуск валидации форм
const ProfileInfo = new UserInfo({name: profileName, description: profileDescription});
const profileValidation = new FormValidator(settingsObj, formEditProfile);
const addCardValidation = new FormValidator(settingsObj, formAddCard);
profileValidation.enableValidation();
addCardValidation.enableValidation();

// создание карточек
const CardSection = new Section({items: initialCards, renderer: (data) => {
  const additionalCard = new Card({
    data,
    handleCardClick: () => {
      PopupImage.open(additionalCard._link, additionalCard._alt, additionalCard._title)
    }}, cardTemplate);
  CardSection.addItem(additionalCard.initializeCard());
}}, cardsContainer);
CardSection.addInitialItems();

// const createNewCard = (data) => {
//   const card = new Card({
//     data,
//     handleCardClick: () => {
//       PopupImage.open(data);
//     }

//   }, cardTemplate);
//   return card.initializeCard();

// }
// console.log(createNewCard())
// const cardList = new Section({
//     renderer: (data) => {
//       cardList.addInitialItems(createNewCard(data));
//     }
//   }, cardsContainer
// );

// создание попапов
const PopupImage = new PopupWithImage('.popup_type_image-fullscreen');
const PopupEditProfile = new PopupWithForm('.popup_type_edit-profile',() => {
  const data = PopupEditProfile._getInputValues();
  ProfileInfo.setUserInfo(data.name, data.description);
});

const PopupAddCard = new PopupWithForm('.popup_type_add-card',() => {
  const data = PopupAddCard._getInputValues();
  console.log (data)
  const additionalCard = new Card({
    data, handleCardClick: () => {PopupImage.open(additionalCard._link, additionalCard._alt, additionalCard._title)}}, cardTemplate);
  CardSection.addItem(additionalCard.initializeCard());
});
// const PopupAddCard = new PopupWithForm('.popup_type_add-card',() => {
//   const data = PopupAddCard._getInputValues();
//   // cardList.addInitialItems(createNewCard(data));
//   cardList.addItem(createNewCard(data));
// });

PopupImage.setEventListeners();
PopupEditProfile.setEventListeners();
PopupAddCard.setEventListeners();

// отслеживание кнопок
buttonEditProfile.addEventListener('click', function() {
  popupProfileName.value = ProfileInfo.getUserInfo().name;
  popupProfileDescription.value = ProfileInfo.getUserInfo().description;
  PopupEditProfile.open();
});

buttonAddCard.addEventListener('click', function() {
  PopupAddCard.open();
});
