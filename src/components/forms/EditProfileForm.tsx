import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { loginInput, nameInput, passwordInput } from 'constants/inputs';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { updateUser, usersSelector } from 'store/usersSlice';
import { SignUpFormFields } from 'types/auth';
import { FormControl } from 'types/formInput';

import ControlledFormInput from 'components/ControlledFormInput';
import ModalWithForm from 'components/ModalWithForm';

type Props = {
  login: string;
  name: string;
};

const EditProfileForm: FC<Props> = ({ login, name }) => {
  const { userId } = useAppSelector(usersSelector);
  const isOpenKey: `isOpen_${string}` = `isOpen_${userId}`;
  const { [isOpenKey]: isOpen = false } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'editProfile' });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<SignUpFormFields>({
    defaultValues: {
      name: name,
      login: login,
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const formControl = control as FormControl;

  const onSubmit = (data: SignUpFormFields) => {
    dispatch(updateUser(data));
    dispatch(closeModalForm(userId as string));
  };

  useEffect(() => {
    dispatch(setIsSubmitDisabled({ uniqueId: userId as string, flag: !isValid }));
  }, [isValid, dispatch, userId]);

  useEffect(() => {
    if (isOpen) {
      reset({ login, name, password: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <ModalWithForm modalTitle={t('modalTitle')} uniqueId={userId} onSubmit={handleSubmit(onSubmit)}>
      <ControlledFormInput control={formControl} inputOptions={nameInput} />
      <ControlledFormInput control={formControl} inputOptions={loginInput} />
      <ControlledFormInput control={formControl} inputOptions={passwordInput} />
    </ModalWithForm>
  );
};

export default EditProfileForm;
