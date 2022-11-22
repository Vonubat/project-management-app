import { Button, Typography } from '@mui/material';
import Page from 'components/Page';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Path } from 'constants/routing';
import ErrorIcon from '@mui/icons-material/Error';
import { DefaultColors } from 'constants/constants';

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
