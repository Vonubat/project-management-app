import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, ButtonGroup, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { authSelector, logOut } from 'store/authSlice';
import { openModalForm } from 'store/modalSlice';
import { deleteUser, getUser, usersSelector } from 'store/usersSlice';

import ConfirmModal from 'components/ConfirmModal';
import EditProfileForm from 'components/forms/EditProfileForm';
import Page from 'components/Page';
import UserDataBox from 'components/UserDataBox';

const boxStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const containerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: 1,
  p: 4,
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
    !(login && name) && dispatch(getUser());
  }, [dispatch, login, name]);

  return (
    <Page>
      <Container maxWidth="xs" sx={containerStyle}>
        <Box sx={boxStyles}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('pageTitle')}
          </Typography>
        </Box>
        <Box sx={{ my: 3 }}>{login && name && <UserDataBox name={name} login={login} />}</Box>
        <ButtonGroup variant="text" fullWidth>
          <Button
            variant="text"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => dispatch(openModalForm(userId as string))}
          >
            {t('editProfile')}
          </Button>
          <Button
            variant="text"
            color="secondary"
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
        title={t('confirmModalTitle')}
        onClose={closeConfirmModal}
        onSubmit={deleteAccount}
      />
    </Page>
  );
};

export default EditProfile;
