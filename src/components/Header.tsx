import { styled } from '@mui/material';
import { Path } from 'constants/routing';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authSelector, logOut } from 'store/authSlice';

const StyledHeader = styled('header')({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
});

const Header = () => {
  const { isAuth } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOutUser = () => {
    dispatch(logOut());
    navigate(Path.home);
  };

  return (
    <StyledHeader>
      <Link to={Path.home}>Home</Link>
      <p>Lang</p>
      {isAuth ? (
        <>
          <Link to={Path.boards}>Boards</Link>
          <button onClick={logOutUser}>Log out </button>
        </>
      ) : (
        <>
          <Link to={Path.signIn}>Sing In</Link>
          <Link to={Path.signUp}>Sign Up</Link>
        </>
      )}
    </StyledHeader>
  );
};

export default Header;
