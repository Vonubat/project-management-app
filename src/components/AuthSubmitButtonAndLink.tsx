import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

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
