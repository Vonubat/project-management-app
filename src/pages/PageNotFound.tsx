import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import { Button, Typography } from '@mui/material';
import { DefaultColors } from 'constants/constants';
import { Path } from 'constants/routing';

import Page from 'components/Page';

const PageNotFound: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pageNotFound' });

  return (
    <Page
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: '1rem',
        marginBottom: '3rem',
        px: 2,
        gap: 2,
      }}
    >
      <ErrorIcon color={DefaultColors.error} sx={{ fontSize: 300 }} />
      <Typography variant="h1">404</Typography>
      <Typography variant="h3">{t('title')}</Typography>
      <Typography variant="h5">{t('description')}</Typography>
      <Button
        variant="contained"
        sx={{ width: 'fit-content', whiteSpace: 'nowrap' }}
        component={RouterLink}
        to={Path.home}
      >
        {t('btn')}
      </Button>
    </Page>
  );
};

export default PageNotFound;
