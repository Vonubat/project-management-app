import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { GRAY_700 } from 'constants/constants';
import React, { FC } from 'react';

type BtnProps = {
  children?: React.ReactNode;
  cb: () => void;
};

const ColumnsAddBtn: FC<BtnProps> = ({ cb, children }) => (
  <Button
    size="small"
    variant="text"
    startIcon={<AddIcon />}
    onClick={cb}
    sx={{
      color: GRAY_700,
      minWidth: 260,
      maxHeight: 50,
      mx: 2,
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
