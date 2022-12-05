import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import { Button, Container, Typography, useMediaQuery } from '@mui/material';
import { DefaultColors, MediaQuery } from 'constants/constants';
import { Path } from 'constants/routing';

import Page from 'components/Page';

const style = {
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '1rem',
  borderRadius: 5,
  backgroundColor: 'rgba(255,255,255, 0.7)',
};

const PageNotFound: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pageNotFound' });
  const isBreak = useMediaQuery(MediaQuery.minWidth500);

  return (
    <Page sx={{ pt: isBreak ? 5 : 0 }}>
      <Container maxWidth="sm" sx={style}>
        <ErrorIcon color={DefaultColors.error} sx={{ fontSize: 100, mx: 'auto' }} />
        <Typography variant="h1" align="center">
          404
        </Typography>
        <Typography variant="h3" align="center">
          {t('title')}
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {t('description')}
        </Typography>
        <Button
          variant="contained"
          sx={{ width: 'fit-content', whiteSpace: 'nowrap' }}
          component={RouterLink}
          to={Path.home}
        >
          {t('btn')}
        </Button>
      </Container>
    </Page>
  );
};

export default PageNotFound;
