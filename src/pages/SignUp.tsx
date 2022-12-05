import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import { signUpInputsList } from 'constants/inputs';
import { Path } from 'constants/routing';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { authSelector, signUp } from 'store/authSlice';
import { SignUpFormFields } from 'types/auth';
import { FormControl } from 'types/formInput';

import AuthPage from 'components/AuthPage';
import AuthSubmitButtonAndLink from 'components/AuthSubmitButtonAndLink';
import ControlledFormInput from 'components/ControlledFormInput';
import CreatedUserWindow from 'components/CreatedUserWindow';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<SignUpFormFields>({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { created } = useAppSelector(authSelector);
  const { t } = useTranslation();

  const formControl = control as FormControl;

  const onSubmit = (signUpData: SignUpFormFields) => {
    dispatch(signUp(signUpData));
  };

  return (
    <AuthPage icon={<LockOutlinedIcon />} pageTitle={t('authPage.signUpTitle')}>
      {created ? (
        <CreatedUserWindow userData={created} />
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          {signUpInputsList.map((options) => (
            <ControlledFormInput key={options.name} control={formControl} inputOptions={options} />
          ))}
          <AuthSubmitButtonAndLink
            buttonText="buttonText.signUp"
            path={Path.signIn}
            linkText="authPage.alreadyHaveAccount"
          />
        </Box>
      )}
    </AuthPage>
  );
}
