import React, { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';

const boxStyles = {
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

type Props = {
  message?: string | null;
};

const AuthErrorContainer: FC<Props> = ({ message }) => {
  if (!message) return null;

  return (
    <Container maxWidth="xs">
      <Box sx={boxStyles}>
        <Typography component="h1" variant="h5" color="red">
          {message}
        </Typography>
      </Box>
    </Container>
  );
  return <div>{message}</div>;
};

export default AuthErrorContainer;
