import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  margin: 'auto',
};

const Loader = () => (
  <Box sx={styles}>
    <CircularProgress size={100} />
  </Box>
);

export default Loader;
