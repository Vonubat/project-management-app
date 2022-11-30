import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Divider, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { Path } from 'constants/routing';

import UserDataBox from './UserDataBox';

type Props = {
  userData: {
    name: string;
    login: string;
  };
};

const CreatedUserWindow: FC<Props> = ({ userData: { name, login } }) => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="xs">
      <Divider variant="middle" sx={{ pt: '1rem', pb: '1rem' }} />
      <Typography variant="h5" align="center" gutterBottom>
        {t('authPage.createdSuccessfully')}
      </Typography>
      <UserDataBox name={name} login={login} />
      <Grid container justifyContent="center">
        <Grid item>
          <Link component={RouterLink} to={`/${Path.signIn}`} variant="subtitle1" color="secondary">
            {t('authPage.logInToAccount')}
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreatedUserWindow;
