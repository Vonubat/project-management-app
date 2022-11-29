import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Divider, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { Path } from 'constants/routing';

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
      <Typography variant="subtitle1" align="center" gutterBottom>
        {t('authPage.login')}: {login}
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        {t('authPage.name')}: {name}
      </Typography>
      <Grid container justifyContent="center">
        <Grid item>
          <Link component={RouterLink} to={`/${Path.signIn}`} variant="body2">
            {t('authPage.logInToAccount')}
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreatedUserWindow;
