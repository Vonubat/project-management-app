import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Page from 'components/Page';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { authSelector, clearAuthError, removeCreated, signUp } from 'store/authSlice';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const { error, created } = useAppSelector(authSelector);

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

  useEffect(() => {
    return () => {
      dispatch(removeCreated());
    };
  }, [dispatch]);

  return (
    <Page>
      {created ? (
        <Box sx={{ diplay: 'flex' }}>
          <p>User was created successfuly</p>
          <p>name: {created.name}</p>
          <p>login: {created.login}</p>
        </Box>
      ) : (
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="login"
                    label="Login"
                    name="login"
                    autoComplete="login"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
      {error && <h1>{error}</h1>}
    </Page>
  );
}
