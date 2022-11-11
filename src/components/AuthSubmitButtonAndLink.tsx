import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

type Props = {
  buttonText: string;
  path: string;
  linkText: string;
};

const AuthSubmitButtonAndLink: FC<Props> = ({ buttonText, path, linkText }) => {
  const { t } = useTranslation();
  return (
    <>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {t(buttonText)}
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link component={RouterLink} to={`/${path}`} variant="body2">
            {t(linkText)}
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthSubmitButtonAndLink;
