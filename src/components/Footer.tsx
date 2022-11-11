import { Link, Tooltip, styled, useMediaQuery } from '@mui/material';
import { grey } from '@mui/material/colors';
import GitHubIcon from '@mui/icons-material/GitHub';
import React, { FC } from 'react';

type GitHubIconStyledProps = {
  children?: React.ReactNode;
  title: string;
};

const Footer = () => {
  const isLargeScreen = useMediaQuery('(min-width:550px)');

  const StyledFooter = styled('footer')({
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: isLargeScreen ? 'row' : 'column',
    alignItems: 'center',
    gap: '1rem',
  });

  const StyledWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  });

  const GitHubIconStyled: FC<GitHubIconStyledProps> = ({ title }) => (
    <Tooltip title={title} placement="top" followCursor>
      <GitHubIcon
        sx={{
          fontSize: 50,
          '&:hover': {
            color: 'rgba(25, 118, 210, 0.5)',
          },
        }}
      />
    </Tooltip>
  );

  const color = grey[700];
  return (
    <StyledFooter>
      <Link
        href="https://rs.school/"
        color={color}
        underline="hover"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ whiteSpace: 'nowrap' }}
      >
        © 2022 The Rolling Scopes
      </Link>
      <StyledWrapper>
        <Link
          href="https://github.com/Vonubat"
          color={color}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIconStyled title="Vonubat" />
        </Link>

        <Link
          href="https://github.com/AlexanderSUS"
          color={color}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIconStyled title="AlexanderSus" />
        </Link>

        <Link
          href="https://github.com/anton-shcherba"
          color={color}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIconStyled title="Anton-Shcherba" />
        </Link>
      </StyledWrapper>
    </StyledFooter>
  );
};

export default Footer;
