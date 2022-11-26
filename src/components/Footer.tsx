import React, { FC } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button, styled, Typography, useMediaQuery } from '@mui/material';
import { GRAY_700, MediaQuery } from 'constants/constants';

import RSLogo from './UI/RSLogo';

const styledFooter = (breakPoint: boolean) =>
  styled('footer')({
    padding: '0 2rem',
    display: 'flex',
    flexDirection: breakPoint ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  });

const styledWrapper = (breakPoint: boolean) =>
  styled('div')({
    display: 'flex',
    flexDirection: breakPoint ? 'row' : 'column',
    alignItems: 'start',
  });

type GitHubUserProps = {
  children?: React.ReactNode;
  href: string;
};

const GitHubUser: FC<GitHubUserProps> = ({ href, children }) => (
  <Button
    variant="text"
    startIcon={<GitHubIcon />}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{ color: GRAY_700 }}
  >
    {children}
  </Button>
);

const Footer: FC = () => {
  const firstBreakPoint: boolean = useMediaQuery(MediaQuery.minWidth750);
  const secondBreakPoint: boolean = useMediaQuery(MediaQuery.minWidth500);
  const StyledFooter = styledFooter(firstBreakPoint);
  const StyledWrapper = styledWrapper(secondBreakPoint);

  return (
    <StyledFooter>
      <RSLogo />
      <StyledWrapper>
        <GitHubUser href={'https://github.com/Vonubat'}>Vonubat</GitHubUser>
        <GitHubUser href={'https://github.com/AlexanderSUS'}>AlexanderSUS</GitHubUser>
        <GitHubUser href={'https://github.com/anton-shcherba'}>Anton-Shcherba</GitHubUser>
      </StyledWrapper>
      <Typography variant="button" sx={{ color: GRAY_700 }}>
        2022
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
