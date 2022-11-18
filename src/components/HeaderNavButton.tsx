import React, { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, useMediaQuery } from '@mui/material';
import { MediaQuery } from 'constants/constants';

type Props = {
  to: string;
  startIcon: ReactNode;
  buttonText: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const HeaderNavButton: FC<Props> = ({ to, startIcon, buttonText, onClick }) => {
  const isLargeScreen = useMediaQuery(MediaQuery.minWidth715);

  return (
    <Button
      color="inherit"
      startIcon={isLargeScreen ? startIcon : null}
      sx={{ minWidth: 'min-content' }}
      component={RouterLink}
      to={to}
      onClick={onClick ? onClick : undefined}
    >
      {isLargeScreen ? buttonText : startIcon}
    </Button>
  );
};

export default HeaderNavButton;
