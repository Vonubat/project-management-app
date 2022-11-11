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
      responseError: {
        error401: 'User does not exist or password is wrong',
        error409: 'User with such login already exist',
        error500: 'Server error',
      },
      validationError: {
        required: 'This field is required',
        maxLength16: 'Input should be no more than 16 characters',
        minLength2: 'Input should be no less than 2 characters',
        minLength3: 'Input should be no less than 3 characters',
        minLength8: 'Input should be no less than 8 characters',
        passwordPattern: 'Allowed only latin alphabetical characters, digits and signs _, ., -',
        namePattern: 'Allowed only alphabetical characters',
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
      responseError: {
        error401: 'Пользователь не существует или не верный пароль',
        error409: 'Пользователь с такм логином уже существует',
        error500: 'Ошибка сервера',
      },
      validationError: {
        required: 'Это поле обязательно для ввода',
        maxLength16: 'Поле должно содержать не более 16 символов',
        minLength2: 'Поле должно содержать не менее 2 символов',
        minLength3: 'Поле должно содержать не менее 3 символов',
        minLength8: 'Поле должно содержать не менее 8 символов',
        passwordPattern: 'Допустимы только латинские буквы, цифры и символы _, ., -',
        namePattern: 'Allowed only alphabetical characters',
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
