import React, { FC, ReactNode, useEffect } from 'react';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useAppDispatch } from 'hooks/typedHooks';
import { clearAuthPageData } from 'store/authSlice';

import Page from 'components/Page';

const boxStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const avatarStyle = {
  m: 1,
  bgcolor: 'secondary.main',
};

const containerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: 1,
  p: 4,
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
      <Container component="div" maxWidth="xs" sx={containerStyle}>
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
