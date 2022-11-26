import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import { signInInputsList } from 'constants/inputs';
import { Path } from 'constants/routing';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { authSelector, signIn } from 'store/authSlice';
import { SignInFormFields } from 'types/auth';
import { FormControl } from 'types/formInput';

import AuthPage from 'components/AuthPage';
import AuthSubmitButtonAndLink from 'components/AuthSubmitButtonAndLink';
import ControlledFormInput from 'components/ControlledFormInput';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(authSelector);
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<SignInFormFields>({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const formControl = control as FormControl;

  const onSubmit = (signInData: SignInFormFields) => {
    dispatch(signIn(signInData));
  };

  useEffect(() => {
    if (isAuth) {
      navigate(Path.boards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <AuthPage icon={<LockOutlinedIcon />} pageTitle={t('buttonText.signIn')}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        {signInInputsList.map((options) => (
          <ControlledFormInput key={options.name} control={formControl} inputOptions={options} />
        ))}
        <AuthSubmitButtonAndLink
          buttonText="buttonText.signIn"
          path={Path.signUp}
          linkText="authPage.dontHaveAccount"
        />
      </Box>
    </AuthPage>
  );
};

export default SignIn;
