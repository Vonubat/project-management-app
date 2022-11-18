import { Button } from '@mui/material';
import { GRAY_700 } from 'constants/constants';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Path } from 'constants/routing';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ColumnsBackBtn: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });

  return (
    <Button
      component={RouterLink}
      size="large"
      variant="text"
      startIcon={<ArrowBackIosIcon />}
      to={Path.boards}
      sx={{
        color: GRAY_700,
        maxHeight: 40,
        minHeight: 40,
        mx: 2,
        my: 1,
        '&:hover': {
          color: 'black',
          boxShadow: 3,
          backgroundColor: 'rgba(255, 255, 255, 1)',
        },
      }}
    >
      {`${t('back')}`}
    </Button>
  );
};

export default ColumnsBackBtn;
