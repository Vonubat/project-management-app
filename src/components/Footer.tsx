import React, { FC } from 'react';
import { styled } from '@mui/material';

import RSLogo from './UI/RSLogo';
import SpeedDialGithub from './UI/SpeedDialGithub';

const StyledFooter = styled('footer')({
  position: 'relative',
  padding: '0 2rem',
  height: '4rem',
});

const Footer: FC = () => {
  return (
    <StyledFooter>
      <RSLogo />
      <SpeedDialGithub />
    </StyledFooter>
  );
};

export default Footer;
