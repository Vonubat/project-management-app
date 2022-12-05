import React, { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, LinearProgress, useMediaQuery } from '@mui/material';
import { MediaQuery } from 'constants/constants';

type Props = {
  to: string;
  startIcon: ReactNode;
  buttonText: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  disabled?: boolean;
};

const StyledLinearProgress = styled(LinearProgress)({
  borderRadius: '4px',
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 'tooltip',
});

const HeaderNavButton: FC<Props> = ({ to, startIcon, buttonText, onClick, disabled }) => {
  const isLargeScreen = useMediaQuery(MediaQuery.minWidth715);

  return (
    <Button
      color="inherit"
      startIcon={isLargeScreen ? startIcon : null}
      sx={{ minWidth: 'min-content' }}
      component={RouterLink}
      to={to}
      onClick={onClick ? onClick : undefined}
      disabled={disabled}
      style={{ position: 'relative' }}
    >
      {isLargeScreen ? buttonText : startIcon}
      {disabled && <StyledLinearProgress color="inherit" />}
    </Button>
  );
};

export default HeaderNavButton;
