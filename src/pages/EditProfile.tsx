import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, ButtonGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { authSelector, logOut } from 'store/authSlice';
import { openModalForm } from 'store/modalSlice';
import { deleteUser, getUser, usersSelector } from 'store/usersSlice';

import AuthPage from 'components/AuthPage';
import ConfirmModal from 'components/ConfirmModal';
import EditProfileForm from 'components/forms/EditProfileForm';
import UserDataBox from 'components/UserDataBox';

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
    <AuthPage icon={<PersonIcon />} pageTitle={t('pageTitle')}>
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
      <EditProfileForm login={login} name={name} />
      <ConfirmModal
        isOpen={isConfirmOpen}
        title={t('confirmModalTitle')}
        onClose={closeConfirmModal}
        onSubmit={deleteAccount}
      />
    </AuthPage>
  );
};

export default EditProfile;
