import { IconButton } from '@mui/material';
import React, { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { DefaultColors } from 'constants/constants';

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

const DeleteBtn: FC<BtnProps> = ({ size, color, cb }) => (
  <IconButton aria-label="delete" size={size} color={color} onClick={cb}>
    <DeleteIcon />
  </IconButton>
);

export default DeleteBtn;
