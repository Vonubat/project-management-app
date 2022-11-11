import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { authSelector, clearAuthError, signUp } from 'store/authSlice';
import AuthPage from 'components/AuthPage';
import { Path } from 'constants/routing';
import CreatedUserWindow from 'components/CreatedUserWindow';
import { SingUpFormFields } from 'types/auth';
import { loginInput, nameInput, passwordInput } from 'constants/inputs';
import { Typography } from '@mui/material';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<SingUpFormFields>({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });
  const { created } = useAppSelector(authSelector);
  const { t } = useTranslation();

  const onSubmit = (signUpData: SingUpFormFields) => {
    dispatch(clearAuthError());
    dispatch(signUp(signUpData));
    reset();
  };

  return (
    <AuthPage icon={<LockOutlinedIcon />} pageTitle={t('authPage.signUpTitle')}>
      {created ? (
        <CreatedUserWindow userData={created} />
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField
                  margin="normal"
                  autoComplete="off"
                  fullWidth
                  label={t('authPage.name')}
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
            rules={nameInput.validationOptions}
          />
          <Controller
            name="login"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField
                  margin="normal"
                  autoComplete="off"
                  fullWidth
                  label={t('buttonText.signIn')}
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
                  autoComplete="off"
                  fullWidth
                  label={t('buttonText.signIn')}
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
            {t('buttonText.signUp')}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to={`/${Path.signIn}`} variant="body2">
                {t('authPage.alreadyHaveAccount')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      )}
    </AuthPage>
  );
}
