import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { authSelector, clearAuthError, signUp } from 'store/authSlice';
import AuthPage from 'components/AuthPage';
import { Path } from 'constants/routing';
import CreatedUserWindow from 'components/CreatedUserWindow';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const { created } = useAppSelector(authSelector);
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const signUpData = {
      name: data.get('name') as string,
      login: data.get('login') as string,
      password: data.get('password') as string,
    };

    if ('name' in signUpData && 'login' in signUpData && 'password' in signUpData) {
      dispatch(clearAuthError());
      dispatch(signUp(signUpData));

      event.currentTarget.reset();
    }
  };

  return (
    <AuthPage icon={<LockOutlinedIcon />} pageTitle={t('authPage.signUpTitle')}>
      {created ? (
        <CreatedUserWindow userData={created} />
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            autoComplete="off"
            name="name"
            required
            fullWidth
            label={t('authPage.name')}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('buttonText.signIn')}
            name="login"
            autoComplete="off"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('authPage.password')}
            type="password"
            autoComplete="off"
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
