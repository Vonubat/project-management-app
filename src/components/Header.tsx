import { styled } from '@mui/material';
import { Path } from 'constants/routing';
import React from 'react';
import { Link } from 'react-router-dom';

const StyledHeader = styled('header')({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
});

const Header = () => {
  return (
    <StyledHeader>
      <Link to={Path.home}>Home</Link>
      <p>Lang</p>
      <Link to={Path.signIn}>Sing In</Link>
      <Link to={Path.signUp}>Sign Up</Link>
    </StyledHeader>
  );
};

export default Header;
