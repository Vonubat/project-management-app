import React, { FC, ReactNode, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Page from 'components/Page';
import { useAppDispatch } from 'hooks/hooks';
import { clearAuthPageData } from 'store/authSlice';
import { Typography } from '@mui/material';

const boxStyles = {
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const avatarStyle = {
  m: 1,
  bgcolor: 'secondary.main',
};

type Props = {
  icon: ReactNode;
  children: ReactNode;
  pageTitle: string;
};

const AuthPage: FC<Props> = ({ icon, children, pageTitle }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearAuthPageData());
    };
  }, [dispatch]);

  return (
    <Page>
      <Container component="div" maxWidth="xs">
        <Box sx={boxStyles}>
          <Avatar sx={avatarStyle}>{icon}</Avatar>
          <Typography component="h1" variant="h5">
            {pageTitle}
          </Typography>
        </Box>
        {children}
      </Container>
    </Page>
  );
};

export default AuthPage;
