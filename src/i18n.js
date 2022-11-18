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
      responseError: {
        error400: 'Bad request',
        error401: 'User does not exist or password is wrong',
        error403: 'Your session is expired',
        error404: 'Element does not exist',
        error409: 'User with such login already exist',
        error500: 'Server error',
        errorUnknown: 'An unknown error has occurred',
        'Network Error': 'Network error',
      },
      responseSuccess: {
        authSignIn: 'Welcome to application!',
        authSignUp: 'User was successfully created',
        usersDelete: 'User was deleted',
        usersUpdate: 'User profile updated successfully',
        boardsCreate: 'Board created successfully',
        boardsDelete: 'Board deleted successfully',
        boardsEdit: 'Board was edited successfully',
        columnsCreate: 'Column created successfully',
        columnsUpdate: 'Column was edited successfully',
        columnsDelete: 'Column deleted successfully',
        tasksCreate: 'Task created successfully',
        tasksUpdate: 'Task was edited successfully',
        tasksDelete: 'Task deleted successfully',
      },
      validationError: {
        required: 'This field is required',
        maxLength400: 'Input should be no more than 400 characters',
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
        createdSuccessfully: 'User was created successfully',
        logInToAccount: 'Log in to account',
      },
      boardList: {
        open: 'Open',
        remove: 'Remove',
        add: 'Add board',
        edit: 'Edit board',
        delBoard: 'Are you sure you want to delete the board?',
        title: 'Title',
        description: 'Description',
      },
      confirmModal: {
        yes: 'Submit',
        no: 'Cancel',
      },
      editProfile: {
        pageTitle: 'User profile',
        login: 'Login:',
        userName: 'Name:',
        editProfile: 'Edit profile',
        deleteProfile: 'Delete account',
        modalTitle: 'Change profile',
      },
      columns: {
        title: 'Title',
        addTask: 'Add task',
        addColumn: 'Add column',
        delColumn: 'Are you sure you want to delete the column?',
      },
      tasks: {
        title: 'Title',
        description: 'Description',
        addTask: 'Add task',
        editTask: 'Edit task',
        delTask: 'Are you sure you want to delete the task?',
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
      responseError: {
        error400: 'Не валидные данные в запросе',
        error401: 'Пользователь не существует или не верный пароль',
        error404: 'Элемент не существует',
        error403: 'Ваша сессия устарела',
        error409: 'Пользователь с такм логином уже существует',
        error500: 'Ошибка сервера',
        errorUnknown: 'Произошла неизвестная ошибка',
        'Network Error': 'Ошибка сети',
      },
      responseSuccess: {
        authSignIn: 'Добро пожаловать в приложение!',
        authSignUp: 'Пользователь cоздан успешно',
        usersDelete: 'Пользователь удален',
        usersUpdate: 'Профиль успешно обновлен',
        boardsCreate: 'Доска успешно создана',
        boardsDelete: 'Доска успешно удалена',
        boardsEdite: 'Доска успешно отредактирована',
        columnsCreate: 'Колонка успешно создана',
        columnsUpdate: 'Колонка успешно отредактирована',
        columnsDelete: 'Колонка успешно удалена',
        tasksCreate: 'Задача успешно создана',
        tasksUpdate: 'Задача успешно отредактирована',
        tasksDelete: 'Задача успено удалена',
      },
      validationError: {
        required: 'Это поле обязательно',
        maxLength400: 'Поле должно содержать не более 400 символов',
        maxLength16: 'Поле должно содержать не более 16 символов',
        minLength2: 'Поле должно содержать не менее 2 символов',
        minLength3: 'Поле должно содержать не менее 3 символов',
        minLength8: 'Поле должно содержать не менее 8 символов',
        passwordPattern: 'Допустимы только латинские буквы, цифры и символы _, ., -',
        namePattern: 'Поле должно содержать только буквы',
      },
      authPage: {
        password: 'Пароль',
        name: 'Имя',
        login: 'Логин',
        dontHaveAccount: 'Нет аккаунта? Зарегистрируйтесь',
        alreadyHaveAccount: 'Уже есть аккаунт? Войдите в него',
        signUpTitle: 'Создать аккаунт',
        createdSuccessfully: 'Пользователь успешно зарегистрирован',
        logInToAccount: 'Войти в аккаунт',
      },
      boardList: {
        open: 'Открыть',
        remove: 'Удалить',
        add: 'Добавить доску',
        edit: 'Изменить доску',
        delBoard: 'Вы действительно хотите удалить доску?',
        title: 'Заголовок',
        description: 'Описание',
      },
      confirmModal: {
        yes: 'Подтвердить',
        no: 'Закрыть',
      },
      editProfile: {
        pageTitle: 'Профиль пользователя',
        login: 'Логин:',
        userName: 'Имя:',
        editProfile: 'Изменить профиль',
        deleteProfile: 'Удалить аккаунт',
        modalTitle: 'Изменить профиль',
      },
      columns: {
        title: 'Название',
        addTask: 'Добавить задачу',
        addColumn: 'Добавить колонку',
        delColumn: 'Вы действительно хотите удалить колонку?',
      },
      tasks: {
        title: 'Название',
        description: 'Описание',
        addTask: 'Добавить задачу',
        editTask: 'Редактировать задачу',
        delTask: 'Вы действительно хотите удалить задачу?',
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
