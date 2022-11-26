import { Avatar, Box, Button, ButtonGroup, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Page from 'components/Page';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import React, { useEffect, useState } from 'react';
import { deleteUser, getUser, usersSelector } from 'store/usersSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';
import ConfirmModal from 'components/ConfirmModal';
import { authSelector, logOut } from 'store/authSlice';
import EditProfileForm from 'components/forms/EditProfileForm';
import { openModalForm } from 'store/modalSlice';

const boxStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const containerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: 1,
  p: 2,
};

//TODO refactor with AuthPage boxStyles
const avatarStyle = {
  m: 1,
  bgcolor: 'secondary.main',
};

const EditProfile = () => {
  const { userId } = useAppSelector(authSelector);
  const { login, name } = useAppSelector(usersSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'editProfile' });
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
  };

  const openConfirmModal = () => {
    setIsConfirmOpen(true);
  };

  const deleteAccount = async () => {
    dispatch(deleteUser()).then(() => {
      dispatch(logOut());
    });
    closeConfirmModal();
  };

  useEffect(() => {
    if (!(login && name)) {
      dispatch(getUser());
    }
  }, [dispatch, login, name]);

  return (
    <Page>
      <Container maxWidth="xs" sx={containerStyle}>
        <Box sx={boxStyles}>
          <Avatar sx={avatarStyle}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('pageTitle')}
          </Typography>
        </Box>
        <Box sx={{ my: 3 }}>
          {login && name && (
            <>
              <Typography variant="h5" gutterBottom align="center">
                {t('userName')} {name}
              </Typography>
              <Typography variant="h5" gutterBottom align="center">
                {t('login')} {login}
              </Typography>
            </>
          )}
        </Box>
        <ButtonGroup variant="text" sx={{ ml: 'auto' }}>
          <Button
            variant="text"
            color="info"
            startIcon={<EditIcon />}
            onClick={() => dispatch(openModalForm(userId as string))}
          >
            {t('editProfile')}
          </Button>
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={openConfirmModal}
          >
            {t('deleteProfile')}
          </Button>
        </ButtonGroup>
      </Container>
      <EditProfileForm login={login} name={name} />
      <ConfirmModal
        isOpen={isConfirmOpen}
        title={t('deleteProfile')}
        onClose={closeConfirmModal}
        onSubmit={deleteAccount}
      />
    </Page>
  );
};

export default EditProfile;
