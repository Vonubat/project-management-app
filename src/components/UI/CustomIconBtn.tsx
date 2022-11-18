import { IconButton } from '@mui/material';
import React, { FC, SyntheticEvent } from 'react';
import { DefaultColors } from 'constants/constants';
import { keyframes } from '@mui/system';

type BtnProps = {
  children: React.ReactNode;
  size: 'small' | 'large';
  color:
    | DefaultColors.primary
    | DefaultColors.secondary
    | DefaultColors.error
    | DefaultColors.warning
    | DefaultColors.info
    | DefaultColors.success;
  cb: (e: SyntheticEvent) => void;
};

const appendAnimate = keyframes`
  from {
		transform: scale(0);
		opacity: 0;
	}
	to {
		transform: scale(1);
		opacity: 1;
	}
`;

const DeleteBtn: FC<BtnProps> = ({ size, color, cb, children }) => (
  <IconButton
    aria-label="delete"
    size={size}
    color={color}
    onClick={cb}
    sx={{ animation: `${appendAnimate} .1s linear` }}
  >
    {children}
  </IconButton>
);

export default DeleteBtn;
