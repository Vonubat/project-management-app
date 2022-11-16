import { IconButton } from '@mui/material';
import React, { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { DefaultColors } from 'constants/constants';
import { keyframes } from '@mui/system';

type BtnProps = {
  size: 'small' | 'large';
  color:
    | DefaultColors.primary
    | DefaultColors.secondary
    | DefaultColors.error
    | DefaultColors.warning
    | DefaultColors.info
    | DefaultColors.success;
  cb: () => void;
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

const DeleteBtn: FC<BtnProps> = ({ size, color, cb }) => (
  <IconButton
    aria-label="delete"
    size={size}
    color={color}
    onClick={cb}
    sx={{ animation: `${appendAnimate} .1s linear` }}
  >
    <DeleteIcon />
  </IconButton>
);

export default DeleteBtn;
