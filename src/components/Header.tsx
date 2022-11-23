import { Path } from 'constants/routing';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authSelector, logOut } from 'store/authSlice';
import {
  Home,
  Key,
  ExitToApp,
  Dashboard,
  PersonAdd,
  ManageAccounts,
  DashboardCustomize,
} from '@mui/icons-material';
import { AppBar, Box, Toolbar, useScrollTrigger } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderNavButton from './HeaderNavButton';
import LanguageBox from './LanguageBox';
import { clearBoardParams, openModalForm } from 'store/modalSlice';
import { boardListSelector } from 'store/boardListSlice';
import { TypeofModal } from 'constants/constants';

const wrapperStyles = { display: { md: 'flex', gap: '20px' } };

export default function Header() {
  const { isAuth } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const trigger = useScrollTrigger({ disableHysteresis: true });
  const { t } = useTranslation('translation', { keyPrefix: 'buttonText' });
  const { isAddBoardLoading } = useAppSelector(boardListSelector);

  const logOutUser = () => {
    dispatch(logOut());
    navigate(Path.home);
  };

  function openAddBoardModalForm() {
    dispatch(clearBoardParams());
    dispatch(openModalForm(TypeofModal.board));
  }

  return (
    <AppBar color={trigger ? 'default' : 'primary'} position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <HeaderNavButton startIcon={<Home />} to={Path.home} buttonText={t('home')} />
        {isAuth ? (
          <Box sx={wrapperStyles}>
            <HeaderNavButton startIcon={<Dashboard />} to={Path.boards} buttonText={t('boards')} />
            <HeaderNavButton
              startIcon={<DashboardCustomize />}
              to={Path.boards}
              buttonText={t('newBoard')}
              onClick={openAddBoardModalForm}
              disabled={isAddBoardLoading}
            />
          </Box>
        ) : null}

        <Box sx={wrapperStyles}>
          <LanguageBox />

          {isAuth ? (
            <>
              <HeaderNavButton
                startIcon={<ManageAccounts />}
                buttonText={t('editProfile')}
                to={Path.user}
              />
              <HeaderNavButton
                startIcon={<ExitToApp />}
                buttonText={t('logOut')}
                to={Path.home}
                onClick={logOutUser}
              />
            </>
          ) : (
            <>
              <HeaderNavButton startIcon={<Key />} buttonText={t('signIn')} to={Path.signIn} />
              <HeaderNavButton
                startIcon={<PersonAdd />}
                buttonText={t('signUp')}
                to={Path.signUp}
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
