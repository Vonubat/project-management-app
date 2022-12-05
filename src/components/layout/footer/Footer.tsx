import React, { FC } from 'react';
import { styled } from '@mui/material';

import RSLogo from './RSLogo';
import SpeedDialGithub from './SpeedDialGithub';

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
