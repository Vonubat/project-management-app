import { Path } from 'constants/routing';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { authSelector, logOut } from 'store/authSlice';
import { AppBar, Box, Toolbar, Button, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { Home, Key, Language, ExitToApp, Dashboard, PersonAdd } from '@mui/icons-material';

export default function Header() {
  const { isAuth } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [langMenuAnchor, setLangMenuAnchor] = React.useState<null | HTMLElement>(null);
  const isLargeScreen = useMediaQuery('(min-width:420px)');

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            startIcon={isLargeScreen ? <Home /> : null}
            component={RouterLink}
            to={Path.home}
          >
            Home
          </Button>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { md: 'flex', gap: '20px' } }}>
            <Button
              color="inherit"
              startIcon={isLargeScreen ? <Language /> : null}
              onClick={langMenuBtnClick}
            >
              Lang
            </Button>
            <Menu
              id="simple-menu"
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
                  startIcon={isLargeScreen ? <Dashboard /> : null}
                  component={RouterLink}
                  to={Path.boards}
                >
                  Boards
                </Button>
                <Button
                  color="inherit"
                  startIcon={isLargeScreen ? <ExitToApp /> : null}
                  onClick={logOutUser}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  startIcon={isLargeScreen ? <Key /> : null}
                  component={RouterLink}
                  to={Path.signIn}
                >
                  Sing In
                </Button>
                <Button
                  color="inherit"
                  startIcon={isLargeScreen ? <PersonAdd /> : null}
                  component={RouterLink}
                  to={Path.signUp}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
