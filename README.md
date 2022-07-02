# Место

## Описание проекта
Учебный проект от [Яндекс.Практикум](https://practicum.yandex.ru/web/). Интерактивный сервис Mesto, позволяющий пользователю добавлять в свой профиль карточки с фотографиями и описанием.

## Особенности
* Редактирование аватара и профиля
* Добавление новых карточек с фотографиями и лайков
* Удаление добавленных карточек и лайков
* Открытие фотографий в полном размере
* Валидация форм (вывод сообщения об ошибке при вводе некорректных данных)

## Стек технологий
* HTML5:<br>
  -Семантические теги
* CSS3:<br>
  -Flexbox<br>
  -Grid Layout<br>
  -Позиционирование<br>
  -Псевдоклассы<br>
  -Трансформации<br>
  -Медиа-запросы<br>
* Вёрстка по макету в Figma
* БЭМ-методолгия именования классов и организации файловой структуры
* JavaScript:<br>
  -ООП (классы для создания карточек, вызова всплывающих окон и валидации форм)<br>
  -Работа с DOM-деревом (метод querySelector)<br>
  -Отслеживание событий (методы addEventListener, preventDefault)<br>
* API (сервер https://mesto.nomoreparties.co):<br>
  -метод fetch и Promise для загрузки данных с сервера<br>
* WebPack:<br>
  -транспиляция через Babel<br>
  -плагины HTMLWebPackPlugin, CssLoader, PostCSS, CssNano, AutoPrefixer<br>

## Требования к проектной работе
* [Макет](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
* [Чеклист](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-9.pdf)

## Установка и запуск проекта:
Установить [Node.js](https://nodejs.org/en/download/)

Установить [Git Bash для Windows](https://gitforwindows.org/)

Клонировать репозиторий:

    git clone https://github.com/PavM9/mesto.git

Установить необходимые зависимости:

    npm install...

Собрать проект:

    npm run build

Запустить проект локально:

    npm run dev

Для работы с gh-pages установить пакет gh-pages:

    npm install gh-pages --save-dev

Для деплоя проекта ввести команду:

    npm run deploy


## Ссылка на страницу
[Место](https://pavm9.github.io/mesto//index.html)

