import React, { FC } from 'react';
import { Paper } from '@mui/material';

type Props = {
  children?: React.ReactNode;
};

const paperStyles = {
  display: 'flex',
  justifyContent: 'left',
  flexWrap: 'wrap',
  boxSizing: 'border-box',
  height: 78,
  p: 0.25,
  mt: 2,
  listStyle: 'none',
  overflow: 'auto',
  borderColor: 'white',
  outline: '1px solid #e6e6e6',
  ':hover': { outlineColor: 'black' },
};

const CustomPaper: FC<Props> = ({ children }) => (
  <Paper variant="outlined" className="alternative-scroll" sx={paperStyles}>
    {children}
  </Paper>
);

export default CustomPaper;
