import React, { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const boxStyles = {
  marginTop: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

type Props = {
  message?: string | null;
};

const AuthErrorContainer: FC<Props> = ({ message }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'responseError' });
  if (!message) return null;

  return (
    <Container maxWidth="xs">
      <Box sx={boxStyles}>
        <Typography component="h5" variant="h5" color="red" align="center">
          {t(message)}
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthErrorContainer;
