import { Control, RegisterOptions } from 'react-hook-form';
import { SignInFormFields, SignUpFormFields } from './auth';

// Add here your form fields types as intersection
export type CustomFormFields = SignInFormFields & SignUpFormFields;

// Add here your form fields keys
export type InputName = keyof SignUpFormFields;

export type InputOptions = {
  name: InputName;
  label: string;
  type: 'password' | 'text';
  validationOptions: RegisterOptions;
};

export type FormControl = Control<Partial<CustomFormFields>, unknown>;
