import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LangType } from './constants/constants';

const resources = {
  en: {
    translation: {
      buttonText: {
        ru: 'Russland',
        en: 'England',
        lang: 'Lang',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        logOut: 'Log out',
        boards: 'Boards',
        newBoard: 'New board',
        editProfile: 'Edit profile',
        home: 'Home',
      },
      validationErrors: {
        userAlreadyExist: 'User allready exist',
      },
      boardList: {
        edit: 'Edit',
        open: 'Open',
        remove: 'Remove',
        add: 'Add board',
        delBoard: 'Are you sure you want to delete the board?',
        title: 'Title',
        description: 'Description',
      },
      confirmModal: {
        yes: 'Agree',
        no: 'Disagree',
      },
    },
  },
  ru: {
    translation: {
      buttonText: {
        ru: 'Русский',
        en: 'Английский',
        lang: 'Язык',
        signIn: 'Логин',
        signUp: 'Создать аккаунт',
        logOut: 'Выход',
        boards: 'Доски',
        newBoard: 'Создать доску',
        editProfile: 'Профиль',
        home: 'Домашняя',
      },
      validationErrors: {
        userAlreadyExist: 'Пользователь уже существует',
      },
      boardList: {
        edit: 'Изменить',
        open: 'Открыть',
        remove: 'Удалить',
        add: 'Добавить доску',
        delBoard: 'Вы действительно хотите удалить доску?',
        title: 'Заголовок',
        description: 'Описание',
      },
      confirmModal: {
        yes: 'Подтвердить',
        no: 'Закрыть',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: LangType.en,
  fallbackLng: LangType.en,
});

export default i18n;
