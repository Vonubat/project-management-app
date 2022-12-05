import React, { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, SxProps, Theme } from '@mui/material';
import { pink, teal } from '@mui/material/colors';

type BtnProps = {
  children?: React.ReactNode;
  cb: () => void;
  sx?: SxProps<Theme>;
  variant?: 'text' | 'outlined' | 'contained';
};

const ColumnsAddBtn: FC<BtnProps> = ({ cb, children, sx, variant = 'text' }) => (
  <Button
    size="small"
    variant={variant}
    startIcon={<AddIcon />}
    onClick={cb}
    sx={{
      color: teal[900],
      ...sx,
      minWidth: 280,
      maxWidth: 280,
      maxHeight: 40,
      minHeight: 40,
      mx: 1,
      '&:hover': {
        color: pink[600],
        boxShadow: 3,
        backgroundColor: 'rgba(255, 255, 255, 1)',
      },
    }}
  >
    {children}
  </Button>
);

export default ColumnsAddBtn;
