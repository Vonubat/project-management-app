import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { authSelector, clearAuthError, signIn } from 'store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Path } from 'constants/routing';
import AuthPage from 'components/AuthPage';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(authSelector);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const signInData = {
      login: data.get('login') as string,
      password: data.get('password') as string,
    };

    if ('login' in signInData && 'password' in signInData) {
      dispatch(clearAuthError());
      dispatch(signIn(signInData));

      event.currentTarget.reset();
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate(Path.boards);
    }
  }, [isAuth]);

  return (
    <AuthPage icon={<LockOutlinedIcon />} pageTitle={t('buttonText.signIn')}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label={t('buttonText.signIn')}
          name="login"
          autoComplete="off"
          autoFocus
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
