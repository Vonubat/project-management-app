import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { authSelector, signIn } from 'store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Path } from 'constants/routing';
import AuthPage from 'components/AuthPage';
import { SignInFormFields } from 'types/auth';
import { signInInputsList } from 'constants/inputs';
import AuthFormInput from 'components/AuthFormInput';
import AuthSubmitButtonAndLink from 'components/AuthSubmitButtonAndLink';

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
          <AuthFormInput key={options.name} control={control} inputOptions={options} />
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
