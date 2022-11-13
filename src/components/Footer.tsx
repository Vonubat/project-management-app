import { Link, styled, useMediaQuery, Box, Button, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import RSLogoIcon from '../assets/icons/logo-rs.svg';
import React, { FC } from 'react';
import { GRAY_700, MediaQuery } from 'constants/constants';

const styledFooter = (breakPoint: boolean) =>
  styled('footer')({
    padding: '1rem 2rem',
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

const RSLogo: FC = () => (
  <Link href="https://rs.school/" color={GRAY_700} target="_blank" rel="noopener noreferrer">
    <Box
      component="img"
      sx={{
        height: 50,
        width: 120,
        '&:hover': {
          transform: 'scale(95%)',
          transition: 'all 0.5s',
        },
      }}
      alt="RSLogoIcon"
      src={RSLogoIcon}
    />
  </Link>
);

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
  const firstBreakPoint: boolean = useMediaQuery(MediaQuery['min-width-750']);
  const secondBreakPoint: boolean = useMediaQuery(MediaQuery['min-width-500']);
  const StyledFooter = styledFooter(firstBreakPoint);
  const StyledWrapper = styledWrapper(secondBreakPoint);

  return (
    <StyledFooter>
      <RSLogo />
      <StyledWrapper>
        <GitHubUser href={'https://github.com/Vonubat'}>Vonubat</GitHubUser>
        <GitHubUser href={'https://github.com/AlexanderSUS'}>Vonubat</GitHubUser>
        <GitHubUser href={'https://github.com/anton-shcherba'}>Anton-Shcherba</GitHubUser>
      </StyledWrapper>
      <Typography variant="button" sx={{ color: GRAY_700 }}>
        2022
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
