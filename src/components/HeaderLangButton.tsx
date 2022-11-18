import React, { FC, ReactNode, MouseEvent } from 'react';
import { Button, useMediaQuery } from '@mui/material';
import { MediaQuery } from 'constants/constants';

type Props = {
  startIcon: ReactNode;
  buttonText: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const HeaderLangButton: FC<Props> = ({ startIcon, buttonText, onClick }) => {
  const isLargeScreen = useMediaQuery(MediaQuery.minWidth715);

  return (
    <Button
      color="inherit"
      startIcon={isLargeScreen ? startIcon : null}
      sx={{ minWidth: 'min-content' }}
      onClick={onClick}
    >
      {isLargeScreen ? buttonText : startIcon}
    </Button>
  );
};

export default HeaderLangButton;
