import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { authSelector, clearAuthError, signIn } from 'store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Path } from 'constants/routing';
import AuthPage from 'components/AuthPage';
import { SingInFormFields } from 'types/auth';
import { loginInput, passwordInput } from 'constants/inputs';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(authSelector);
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<SingInFormFields>({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (signInData: SingInFormFields) => {
    dispatch(clearAuthError());
    dispatch(signIn(signInData));
    reset();
  };

  useEffect(() => {
    if (isAuth) {
      navigate(Path.boards);
    }
  }, [isAuth]);

  return (
    <AuthPage icon={<LockOutlinedIcon />} pageTitle={t('buttonText.signIn')}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <Controller
          name="login"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                margin="normal"
                fullWidth
                label={t('buttonText.signIn')}
                autoComplete="off"
                autoFocus
                {...field}
              />
              {error && (
                <Typography variant="caption" color={'red'}>
                  {error.message}
                </Typography>
              )}
            </>
          )}
          rules={loginInput.validationOptions}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                type="password"
                margin="normal"
                fullWidth
                label={t('authPage.password')}
                autoComplete="off"
                {...field}
              />
              {error && (
                <Typography variant="caption" color={'red'}>
                  {error.message}
                </Typography>
              )}
            </>
          )}
          rules={passwordInput.validationOptions}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {t('buttonText.signIn')}
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to={`/${Path.signUp}`} variant="body2">
              {t('authPage.dontHaveAccount')}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthPage>
  );
};

export default SignIn;
