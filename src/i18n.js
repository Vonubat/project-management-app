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
      homePage: {
        startButton: 'Get started',
        sectionTitle_1: 'All great actions start with a project management system',
        sectionBody_1: 'Brings all your tasks, teammates, and tools together',
        sectionTitle_2: 'Build the workflow you want',
        sectionBody_2: 'Manage your boards using Drag-n-Drop',
        sectionTitle_3: 'Tasks contain everything you need',
        sectionBody_3: 'You can specify additional info in task description and assign users',
        sectionTitle_4: 'Unlimited boards, columns and tasks',
        sectionBody_4: 'No limits for all registered users',
        team: 'Our team',
        vonubat: 'Tabunov Egor',
        AlexanderSUS: 'Alexander Suslov',
        AntonShcherba: 'Anton Shcherba',
        role: 'Front-end developer',
      },
      validationErrors: {
        userAlreadyExist: 'User allready exist',
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
      homePage: {
        startButton: 'Начать',
        sectionTitle_1: 'Все великие дела начинаются с системы управления проектами',
        sectionBody_1: 'Соберите всех сотрудников, задачи и инструменты в одном месте',
        sectionTitle_2: 'Постройте рабочий процесс',
        sectionBody_2: 'Управляйте досками с помощью Drag-n-Drop',
        sectionTitle_3: 'Задания содержат всё необходимое',
        sectionBody_3:
          'Вы можете указать дополнительную информацию в описании и назначить исполнителей',
        sectionTitle_4: 'Безлимитные доски, колонки и задачи',
        sectionBody_4: 'Без ограничений для всех зарегистрированных пользователей',
        team: 'Наша команда',
        vonubat: 'Табунов Егор',
        AlexanderSUS: 'Александр Суслов',
        AntonShcherba: 'Антон Щерба',
        role: 'Разработчик пользовательского интерфейса',
      },
      validationErrors: {
        userAlreadyExist: 'Пользователь уже существует',
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
