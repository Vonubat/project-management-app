import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const Loader = () => (
  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
    <CircularProgress color="inherit" size={100} />
  </Backdrop>
);

export default Loader;
