// импорт стилей
import './index.css';

// импорт классов и переменных
import {api} from '../components/Api.js'
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit';
import UserInfo from '../components/UserInfo.js';
import {
  cardsContainerSelector,
  cardTemplateSelector,
  profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector,
  buttonEditProfile,
  buttonEditAvatar,
  buttonAddCard,
  formEditProfile,
  popupProfileName,
  popupProfileDescription,
  formEditAvatar,
  formAddCard,
  settingsObj
} from '../utils/constants.js';

// получение информации с сервера
let userId
const profileInfo = new UserInfo({name: profileNameSelector, description: profileDescriptionSelector, avatar: profileAvatarSelector});

api.getAppInfo()
.then(([cardData, userData]) => {
  userId = userData._id;
  profileInfo.setUserInfo( userData.name, userData.about);
  profileInfo.setUserAvatar(userData.avatar);
  cardList.addInitialItems(cardData);
})
.catch(err => console.log(`Ошибка: ${err}`))


// запуск валидации форм
const profileValidation = new FormValidator(settingsObj, formEditProfile);
const avatarValidation = new FormValidator(settingsObj, formEditAvatar);
const addCardValidation = new FormValidator(settingsObj, formAddCard);
profileValidation.enableValidation();
avatarValidation.enableValidation();
addCardValidation.enableValidation();

// создание карточек
const createNewCard = (item) => {
  const card = new Card({
    item,
    userId,
    handleCardClick: () => {
      popupWithImage.open(item)
    },
    handleLikeClick: (_id) => {
      if(card.isLiked()) {
        api.removeLike(_id)
        .then(res => {
          card.getLikes(res.likes)
        })
        .catch(err => console.log(`Ошибка: ${err}`))
      } else {
        api.addLike(_id)
        .then(res => {
          card.getLikes(res.likes)
        })
        .catch(err => console.log(`Ошибка: ${err}`))
      }
    },
    handleCardDelete: (_id) => {
      popupConfirmDelete.open()
      popupConfirmDelete.changeAction(() => {
        api.deleteCard(_id)
        .then(()=> {
          card.deleteCard();
          if(api._checkResponse) {
            popupConfirmDelete.close();
          }
        })
        .catch(err => console.log(`Ошибка: ${err}`))
      })
    }
  }, cardTemplateSelector);
  return card.initializeCard();
}

const cardList = new Section({
  renderer: (item) => {
      cardList.addItem(createNewCard(item));
    }
  }, cardsContainerSelector
);

// создание попапов
const popupWithImage = new PopupWithImage('.popup_type_image-fullscreen');
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  handleFormSubmit: (item) => {
    popupEditProfile.loadingMessage(true)
    api.editProfile(item)
    .then(() => {
      profileInfo.setUserInfo(item.name, item.description);
      if(api._checkResponse) {
        popupEditProfile.close();
      }
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupEditProfile.loadingMessage(false);
    })
  }
});

const popupEditAvatar = new PopupWithForm('.popup_type_avatar', {
  handleFormSubmit: (item) => {
    popupEditAvatar.loadingMessage(true);
    api.editAvatar(item)
    .then(() => {
      profileInfo.setUserAvatar(item.avatar);
      if(api._checkResponse) {
        popupEditAvatar.close();
      }
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupEditAvatar.loadingMessage(false);
    })
  }
});

const popupAddCard = new PopupWithForm('.popup_type_add-card', {
  handleFormSubmit: (item) => {
    popupAddCard.loadingMessage(true);
    api.addCard(item)
    .then(res => {
      cardList.addItem(createNewCard(res));
      if(api._checkResponse) {
        popupAddCard.close();
      }
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupAddCard.loadingMessage(false);
    })
  }
});

const popupConfirmDelete = new PopupWithSubmit('.popup_type_confirm', {
renderer: (id) => {
  api.deleteCard(id)
  .then(() => {
  })
  .catch(err => console.log(`Ошибка: ${err}`))
  }
});

// обработчики событий
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
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
  addCardValidation.toggleButtonState();
  popupAddCard.open();
});

buttonEditAvatar.addEventListener('click', function() {
  avatarValidation.toggleButtonState();
  popupEditAvatar.open();

});

