import { InputOptions } from 'types/formInput';

const VALIDATION_RULE_REQUIRED = {
  value: true,
  message: 'required',
};

const VALIDATION_RULE_MAX_LENGTH_100 = {
  value: 100,
  message: 'maxLength100',
};

const VALIDATION_RULE_MAX_LENGTH_400 = {
  value: 400,
  message: 'maxLength400',
};

const VALIDATION_RULE_MAX_LENGTH_15 = {
  value: 15,
  message: 'maxLength15',
};

const VALIDATION_RULE_MAX_LENGTH_16 = {
  value: 16,
  message: 'maxLength16',
};

const VALIDATION_RULE_MIN_LENGTH_2 = {
  value: 2,
  message: 'minLength2',
};

const VALIDATION_RULE_MIN_LENGTH_3 = {
  value: 3,
  message: 'minLength3',
};

const VALIDATION_RULE_MIN_LENGTH_8 = {
  value: 8,
  message: 'minLength8',
};

const VALIDATION_RULE_PASSWORD_PATTERN = {
  value: /^[a-zA-Z0-9_.-]*$/,
  message: 'passwordPattern',
};

const VALIDATION_RULE_NAME_PATTERN = {
  value: /^[a-zA-zа-яА-Я]*$/,
  message: 'namePattern',
};

export const nameInput: InputOptions = {
  name: 'name',
  label: 'authPage.name',
  type: 'text',
  validationOptions: {
    required: VALIDATION_RULE_REQUIRED,
    minLength: VALIDATION_RULE_MIN_LENGTH_2,
    maxLength: VALIDATION_RULE_MAX_LENGTH_16,
    pattern: VALIDATION_RULE_NAME_PATTERN,
  },
};

export const loginInput: InputOptions = {
  name: 'login',
  label: 'authPage.login',
  type: 'text',
  validationOptions: {
    required: VALIDATION_RULE_REQUIRED,
    minLength: VALIDATION_RULE_MIN_LENGTH_3,
    maxLength: VALIDATION_RULE_MAX_LENGTH_16,
    pattern: VALIDATION_RULE_PASSWORD_PATTERN,
  },
};

export const passwordInput: InputOptions = {
  name: 'password',
  label: 'authPage.password',
  type: 'password',
  validationOptions: {
    required: VALIDATION_RULE_REQUIRED,
    minLength: VALIDATION_RULE_MIN_LENGTH_8,
    maxLength: VALIDATION_RULE_MAX_LENGTH_16,
    pattern: VALIDATION_RULE_PASSWORD_PATTERN,
  },
};

export const titleInput: InputOptions = {
  name: 'title',
  label: 'boardList.title',
  type: 'text',
  validationOptions: {
    required: VALIDATION_RULE_REQUIRED,
    minLength: VALIDATION_RULE_MIN_LENGTH_3,
    maxLength: VALIDATION_RULE_MAX_LENGTH_100,
  },
};

export const descriptionInput: InputOptions = {
  name: 'description',
  label: 'boardList.description',
  type: 'text',
  rows: 4,
  validationOptions: {
    required: VALIDATION_RULE_REQUIRED,
    maxLength: VALIDATION_RULE_MAX_LENGTH_400,
  },
};

export const signInInputsList: InputOptions[] = [loginInput, passwordInput];

export const signUpInputsList: InputOptions[] = [nameInput, loginInput, passwordInput];

export const columnTitleInput: InputOptions = {
  name: 'title',
  label: 'columns.title',
  type: 'text',
  rows: 3,
  validationOptions: {
    required: VALIDATION_RULE_REQUIRED,
    maxLength: VALIDATION_RULE_MAX_LENGTH_100,
  },
};

export const taskTitleInput: InputOptions = {
  name: 'title',
  label: 'tasks.title',
  type: 'text',
  rows: 2,
  validationOptions: {
    required: VALIDATION_RULE_REQUIRED,
    maxLength: VALIDATION_RULE_MAX_LENGTH_100,
  },
};

export const taskDescriptionInput: InputOptions = {
  name: 'description',
  label: 'tasks.description',
  type: 'text',
  rows: 5,
  validationOptions: {
    required: VALIDATION_RULE_REQUIRED,
    maxLength: VALIDATION_RULE_MAX_LENGTH_400,
  },
};

export const editBoardInputsList: InputOptions[] = [titleInput, descriptionInput];
