import React, { FC, SyntheticEvent } from 'react';
import { IconButton } from '@mui/material';
import { DefaultColors } from 'constants/constants';
import { appendAnimate } from 'utils/animations';

type BtnProps = {
  children: React.ReactNode;
  size: 'small' | 'large';
  color: DefaultColors;
  cb: (e: SyntheticEvent) => void;
};

const DeleteBtn: FC<BtnProps> = ({ size, color, cb, children }) => (
  <IconButton
    aria-label="delete"
    size={size}
    color={color}
    onClick={cb}
    sx={{ animation: `${appendAnimate} .1s linear`, p: 0 }}
  >
    {children}
  </IconButton>
);

export default DeleteBtn;
