// переменные элементов страницы
export const cardsContainerSelector = '.cards__container';
export const cardTemplateSelector = '#card-template';
export const profileNameSelector = '.profile__name';
export const profileDescriptionSelector = '.profile__description';


//переменные для кнопок
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-card-button');

// переменные для popupEditProfile
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const formEditProfile = popupEditProfile.querySelector('.popup__form-container');
export const popupProfileName =  formEditProfile.querySelector('.popup__form-item_input_name');
export const popupProfileDescription = formEditProfile.querySelector('.popup__form-item_input_description');


// переменные для popupAddCard
const popupAddCard = document.querySelector('.popup_type_add-card');
export const formAddCard = popupAddCard.querySelector('.popup__form-container');

const cardImage1 = new URL('../images/teriberka.jpg', import.meta.url);
const cardImage2 = new URL('../images/kamchatka.jpg', import.meta.url);
const cardImage3 = new URL('../images/kabardino-balkaria.jpg', import.meta.url);
const cardImage4 = new URL('../images/altai.jpg', import.meta.url);
const cardImage5 = new URL('../images/ural.jpg', import.meta.url);
const cardImage6 = new URL('../images/karelia.jpg', import.meta.url);

// массив с начальными карточками
export const initialCards = [
  {
    name: 'Териберка',
    link: cardImage1,
    alt: 'Заброшенное судно на песчаном берегу'
  },
  {
    name: 'Камчатка',
    link: cardImage2,
    alt: 'Вершина горы в облаках'
  },
  {
    name: 'Кабардино-Балкария',
    link: cardImage3,
    alt: 'Река в горной долине'
  },
  {
    name: 'Алтай',
    link: cardImage4,
    alt: 'Река в горной долине'
  },
  {
    name: 'Урал',
    link: cardImage5,
    alt: 'Горный хребет на фоне заката'
  },
  {
    name: 'Карелия',
    link: cardImage6,
    alt: 'Деревянная церковь'
  }
];

// настройки валидации форм
export const settingsObj = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__form-item_invalid',
  errorClassVisible: 'popup__error_visible'
}
