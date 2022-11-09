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
import { authSelector, clearAuthError, signIn } from 'store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Path } from 'constants/routing';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { isAuth, error } = useAppSelector(authSelector);
  const navigate = useNavigate();

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
    <Page>
      <Container component="main" maxWidth="xs">
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {error && <h1>{error}</h1>}
    </Page>
  );
};

export default SignIn;
