import Page from 'components/Page';
import React from 'react';
import { Button, Box, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BoardPreview from 'components/BoardPreview';

export default function Boards() {
  const isLargeScreen = useMediaQuery('(min-width:380px)');
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const style = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
    mx: isLargeScreen ? 4 : 1,
  };

  return (
    <Page>
      <Box sx={style}>
        <BoardPreview name="name" description="caption text" />
        <Button sx={{ width: 310, height: 310 }} variant="outlined">
          <Typography variant="h4">{t('add')}</Typography>
        </Button>
      </Box>
    </Page>
  );
}
