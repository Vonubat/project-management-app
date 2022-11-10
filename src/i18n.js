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
      authPage: {
        password: 'Password',
        name: 'Name',
        login: 'Login',
        dontHaveAccount: "Don't have an account? Sign Up",
        alreadyHaveAccount: 'Already have an account? Sign in',
        signUpTitle: 'Sign Up',
        createdSuccessfuly: 'User was created successfuly',
        logInToAccount: 'Log in to account',
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
        signUp: 'Регистрация',
        logOut: 'Выход',
        boards: 'Доски',
        newBoard: 'Создать доску',
        editProfile: 'Профиль',
        home: 'Домашняя',
      },
      validationErrors: {
        userAlreadyExist: 'Пользователь уже существует',
      },
      authPage: {
        password: 'Пароль',
        name: 'Имя',
        login: 'Логин',
        dontHaveAccount: 'Нет аккаунта? Зарегистрируйтесь',
        alreadyHaveAccount: 'Уже есть аккаунт? Войдите в него',
        signUpTitle: 'Создать аккаунт',
        createdSuccessfuly: 'Пользователь успешно зарегистрирован',
        logInToAccount: 'Войти в аккаунт',
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
