import { AuthInputOptions } from 'types/auth';
import { ColumnInputOptions } from 'types/columns';

const VALIDATION_RULE_REQUIRED = {
  value: true,
  message: 'required',
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

export const nameInput: AuthInputOptions = {
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

export const loginInput: AuthInputOptions = {
  name: 'login',
  label: 'buttonText.signIn',
  type: 'text',
  validationOptions: {
    required: VALIDATION_RULE_REQUIRED,
    minLength: VALIDATION_RULE_MIN_LENGTH_3,
    maxLength: VALIDATION_RULE_MAX_LENGTH_16,
    pattern: VALIDATION_RULE_PASSWORD_PATTERN,
  },
};

export const passwordInput: AuthInputOptions = {
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

export const signInInputsList: AuthInputOptions[] = [loginInput, passwordInput];

export const signUpInputsList: AuthInputOptions[] = [nameInput, loginInput, passwordInput];

export const columnTitleInput: ColumnInputOptions = {
  name: 'title',
  label: 'columns.title',
  type: 'text',
  validationOptions: {
    required: VALIDATION_RULE_REQUIRED,
    minLength: VALIDATION_RULE_MIN_LENGTH_3,
  },
};
