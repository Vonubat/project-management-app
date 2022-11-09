import { styled } from '@mui/material';
import React from 'react';

const StyledFooter = styled('footer')({
  display: 'flex',
  justifyContent: 'space-evenly',
});

const Footer = () => {
  return (
    <StyledFooter>
      <a href="https://github.com/Vonubat" target="_blank" rel="noreferrer">
        Vonubat
      </a>
      <a href="https://github.com/AlexanderSUS" target="_blank" rel="noreferrer">
        AlexanderSus
      </a>
      <a href="https://github.com/anton-shcherba" target="_blank" rel="noreferrer">
        Anton-Shcherba
      </a>
    </StyledFooter>
  );
};

export default Footer;
