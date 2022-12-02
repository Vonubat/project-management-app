import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Button, styled, Typography } from '@mui/material';
import { DefaultColors } from 'constants/constants';
import { Path } from 'constants/routing';

import Page from 'components/Page';

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '3rem',
  gap: '1rem',
});

const PageNotFound: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'pageNotFound' });

  return (
    <Page
      sx={{
        p: 0,
      }}
    >
      <StyledBox>
        <ErrorIcon color={DefaultColors.error} sx={{ fontSize: 250 }} />
        <StyledBox
          sx={{
            borderRadius: 5,
            backgroundColor: 'rgba(255,255,255, 0.7)',
          }}
        >
          <Typography variant="h1">404</Typography>
          <Typography variant="h3">{t('title')}</Typography>
          <Typography variant="h5">{t('description')}</Typography>
        </StyledBox>

        <Button
          variant="contained"
          sx={{ width: 'fit-content', whiteSpace: 'nowrap' }}
          component={RouterLink}
          to={Path.home}
        >
          {t('btn')}
        </Button>
      </StyledBox>
    </Page>
  );
};

export default PageNotFound;
