import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

type Props = {
  login: string;
  name: string;
};

const UserDataBox: FC<Props> = ({ name, login }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'authPage' });

  return (
    <>
      <Typography variant="h5" align="center" color="primary" gutterBottom>
        {t('login')}: {login}
      </Typography>
      <Typography variant="h5" align="center" color="primary" gutterBottom>
        {t('name')}: {name}
      </Typography>
    </>
  );
};

export default UserDataBox;
