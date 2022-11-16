import AddIcon from '@mui/icons-material/Add';
import { Button, SxProps, Theme } from '@mui/material';
import { GRAY_700 } from 'constants/constants';
import React, { FC } from 'react';

type BtnProps = {
  children?: React.ReactNode;
  cb: () => void;
  sx?: SxProps<Theme>;
};

const ColumnsAddBtn: FC<BtnProps> = ({ cb, children, sx }) => (
  <Button
    size="small"
    variant="text"
    startIcon={<AddIcon />}
    onClick={cb}
    sx={{
      ...sx,
      color: GRAY_700,
      minWidth: 280,
      maxWidth: 280,
      maxHeight: 40,
      minHeight: 40,
      mx: 1,
      '&:hover': {
        color: 'black',
        boxShadow: 3,
        backgroundColor: 'rgba(255, 255, 255, 1)',
      },
    }}
  >
    {children}
  </Button>
);

export default ColumnsAddBtn;
