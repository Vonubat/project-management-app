import { Path } from 'constants/routing';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { BaseSyntheticEvent } from 'react';
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
import { useTranslation } from 'react-i18next';
import { LangType } from 'constants/constants';

export default function Header() {
  const { isAuth } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [langMenuAnchor, setLangMenuAnchor] = React.useState<null | HTMLElement>(null);
  const isLargeScreen = useMediaQuery('(min-width:690px)');
  const trigger = useScrollTrigger();
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'buttonText' });

  const logOutUser = () => {
    dispatch(logOut());
    navigate(Path.home);
  };

  const langMenuBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLangMenuAnchor(event.currentTarget);
  };

  const closeLangMenu = (langType: LangType | BaseSyntheticEvent) => {
    setLangMenuAnchor(null);
    console.log(langType);
    if (typeof langType === 'string') {
      i18n.changeLanguage(langType);
    }
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
          {isLargeScreen ? t('home') : <Home />}
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
              {isLargeScreen ? t('boards') : <Dashboard />}
            </Button>
            <Button
              color="inherit"
              startIcon={isLargeScreen ? <DashboardCustomize /> : null}
              sx={{ minWidth: 'min-content' }}
              component={RouterLink}
              to={Path.boards}
            >
              {isLargeScreen ? t('newBoard') : <DashboardCustomize />}
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
            {isLargeScreen ? t('lang') : <Language />}
          </Button>
          <Menu
            anchorEl={langMenuAnchor}
            keepMounted
            open={Boolean(langMenuAnchor)}
            onClose={closeLangMenu}
          >
            <MenuItem onClick={() => closeLangMenu(LangType.en)}>{t('en')}</MenuItem>
            <MenuItem onClick={() => closeLangMenu(LangType.ru)}>{t('ru')}</MenuItem>
          </Menu>
          {isAuth ? (
            <>
              <Button
                color="inherit"
                startIcon={isLargeScreen ? <ManageAccounts /> : null}
                sx={{ minWidth: 'min-content' }}
              >
                {isLargeScreen ? t('editProfile') : <ManageAccounts />}
              </Button>
              <Button
                color="inherit"
                startIcon={isLargeScreen ? <ExitToApp /> : null}
                sx={{ minWidth: 'min-content' }}
                onClick={logOutUser}
              >
                {isLargeScreen ? t('logOut') : <ExitToApp />}
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
                {isLargeScreen ? t('signIn') : <Key />}
              </Button>
              <Button
                color="inherit"
                startIcon={isLargeScreen ? <PersonAdd /> : null}
                sx={{ minWidth: 'min-content' }}
                component={RouterLink}
                to={Path.signUp}
              >
                {isLargeScreen ? t('signUp') : <PersonAdd />}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
