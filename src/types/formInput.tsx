import { Control, RegisterOptions } from 'react-hook-form';
import { SignInFormFields, SignUpFormFields } from './auth';
import { EditBoardFormFields } from 'types/boards';

// Add here your form fields types as intersection
export type CustomFormFields = SignInFormFields & SignUpFormFields & EditBoardFormFields;

// Add here your form fields keys
export type InputName = keyof CustomFormFields;

export type InputOptions = {
  name: InputName;
  label: string;
  type: 'password' | 'text';
  validationOptions: RegisterOptions;
  rows?: number;
};

export type FormControl = Control<Partial<CustomFormFields>, unknown>;
