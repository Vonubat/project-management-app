import { Link, styled, useMediaQuery, Box, Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import GitHubIcon from '@mui/icons-material/GitHub';
import RSLogoIcon from '../assets/icons/logo-rs.svg';
import React from 'react';

const Footer = () => {
  const firstBreakPoint = useMediaQuery('(min-width:750px)');
  const secondBreakPoint = useMediaQuery('(min-width:500px)');

  const StyledFooter = styled('footer')({
    padding: '1rem 2rem',
    display: 'flex',
    flexDirection: secondBreakPoint ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  });

  const StyledWrapper = styled('div')({
    display: 'flex',
    flexDirection: firstBreakPoint ? 'row' : 'column',
    alignItems: 'start',
  });

  const color = grey[700];

  return (
    <StyledFooter>
      <Link href="https://rs.school/" color={color} target="_blank" rel="noopener noreferrer">
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
      <StyledWrapper>
        <Button
          component="a"
          variant="text"
          startIcon={<GitHubIcon />}
          href="https://github.com/Vonubat"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: color }}
        >
          Vonubat
        </Button>
        <Button
          component="a"
          variant="text"
          startIcon={<GitHubIcon />}
          href="https://github.com/AlexanderSUS"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: color }}
        >
          AlexanderSus
        </Button>
        <Button
          component="a"
          variant="text"
          startIcon={<GitHubIcon />}
          href="https://github.com/anton-shcherba"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: color }}
        >
          Anton-Shcherba
        </Button>
      </StyledWrapper>
      <Typography variant="button" sx={{ color: color }}>
        2022
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
