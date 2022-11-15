import React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { authSelector, signUp } from 'store/authSlice';
import AuthPage from 'components/AuthPage';
import { Path } from 'constants/routing';
import CreatedUserWindow from 'components/CreatedUserWindow';
import { SignUpFormFields } from 'types/auth';
import { signUpInputsList } from 'constants/inputs';
import AuthSubmitButtonAndLink from 'components/AuthSubmitButtonAndLink';
import { FormControl } from 'types/formInput';
import ControlledFormInput from 'components/ControlledFormInput';

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
