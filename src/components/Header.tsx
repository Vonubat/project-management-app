import { Path } from 'constants/routing';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { authSelector, logOut } from 'store/authSlice';
import {
  Home,
  Key,
  Language,
  ExitToApp,
  Dashboard,
  PersonAdd,
  ManageAccounts,
  DashboardCustomize,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material';

export default function Header() {
  const { isAuth } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [langMenuAnchor, setLangMenuAnchor] = React.useState<null | HTMLElement>(null);
  const isLargeScreen = useMediaQuery('(min-width:690px)');
  const trigger = useScrollTrigger();

  const logOutUser = () => {
    dispatch(logOut());
    navigate(Path.home);
  };

  const langMenuBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLangMenuAnchor(event.currentTarget);
  };

  const closeLangMenu = () => {
    setLangMenuAnchor(null);
  };

  return (
    <AppBar color={trigger ? 'default' : 'primary'} position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button
          color="inherit"
          startIcon={isLargeScreen ? <Home /> : null}
          sx={{ minWidth: 'min-content' }}
          component={RouterLink}
          to={Path.home}
        >
          {isLargeScreen ? 'Home' : <Home />}
        </Button>
        {isAuth ? (
          <Box sx={{ display: { md: 'flex', gap: '20px' } }}>
            <Button
              color="inherit"
              startIcon={isLargeScreen ? <Dashboard /> : null}
              sx={{ minWidth: 'min-content' }}
              component={RouterLink}
              to={Path.boards}
            >
              {isLargeScreen ? 'Boards' : <Dashboard />}
            </Button>
            <Button
              color="inherit"
              startIcon={isLargeScreen ? <DashboardCustomize /> : null}
              sx={{ minWidth: 'min-content' }}
              component={RouterLink}
              to={Path.boards}
            >
              {isLargeScreen ? 'New board' : <DashboardCustomize />}
            </Button>
          </Box>
        ) : null}
        <Box sx={{ display: { md: 'flex', gap: '20px' } }}>
          <Button
            color="inherit"
            startIcon={isLargeScreen ? <Language /> : null}
            sx={{ minWidth: 'min-content' }}
            onClick={langMenuBtnClick}
          >
            {isLargeScreen ? 'Lang' : <Language />}
          </Button>
          <Menu
            anchorEl={langMenuAnchor}
            keepMounted
            open={Boolean(langMenuAnchor)}
            onClose={closeLangMenu}
          >
            <MenuItem onClick={closeLangMenu}>England</MenuItem>
            <MenuItem onClick={closeLangMenu}>Russian</MenuItem>
          </Menu>
          {isAuth ? (
            <>
              <Button
                color="inherit"
                startIcon={isLargeScreen ? <ManageAccounts /> : null}
                sx={{ minWidth: 'min-content' }}
              >
                {isLargeScreen ? 'Edit profile' : <ManageAccounts />}
              </Button>
              <Button
                color="inherit"
                startIcon={isLargeScreen ? <ExitToApp /> : null}
                sx={{ minWidth: 'min-content' }}
                onClick={logOutUser}
              >
                {isLargeScreen ? 'Log out' : <ExitToApp />}
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                startIcon={isLargeScreen ? <Key /> : null}
                sx={{ minWidth: 'min-content' }}
                component={RouterLink}
                to={Path.signIn}
              >
                {isLargeScreen ? 'Sing In' : <Key />}
              </Button>
              <Button
                color="inherit"
                startIcon={isLargeScreen ? <PersonAdd /> : null}
                sx={{ minWidth: 'min-content' }}
                component={RouterLink}
                to={Path.signUp}
              >
                {isLargeScreen ? 'Sign Up' : <PersonAdd />}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
