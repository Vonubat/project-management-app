import { Control, RegisterOptions } from 'react-hook-form';
import { SignInFormFields, SignUpFormFields } from './auth';
import { AddColumnFields } from './columns';
import { TaskFields } from './tasks';

// Add here your form fields types as intersection
export type CustomFormFields = SignInFormFields & SignUpFormFields & AddColumnFields & TaskFields;

// Add here your form fields keys
export type InputName = keyof SignUpFormFields | keyof AddColumnFields | keyof TaskFields;

export type InputOptions = {
  name: InputName;
  label: string;
  type: 'password' | 'text';
  validationOptions: RegisterOptions;
};

export type FormControl = Control<Partial<CustomFormFields>, unknown>;
