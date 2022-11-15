import React, { FC, useEffect } from 'react';
import { updateUser } from 'store/userSlice';
import ControlledFormInput from 'components/ControlledFormInput';
import { useForm } from 'react-hook-form';
import { SignUpFormFields } from 'types/auth';
import { loginInput, nameInput, passwordInput } from 'constants/inputs';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useTranslation } from 'react-i18next';
import ModalWithForm from 'components/ModalWithForm';
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { FormControl } from 'types/formInput';

type Props = {
  login: string;
  name: string;
};

const EditProfileForm: FC<Props> = ({ login, name }) => {
  const { isOpen } = useAppSelector(modalSelector);
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
    dispatch(closeModalForm());
  };

  useEffect(() => {
    dispatch(setIsSubmitDisabled(!isValid));
  }, [isValid, dispatch]);

  useEffect(() => {
    if (isOpen) {
      reset({ login, name, password: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <ModalWithForm modalTitle={t('modalTitle')} onSubmit={handleSubmit(onSubmit)}>
      <ControlledFormInput control={formControl} inputOptions={nameInput} />
      <ControlledFormInput control={formControl} inputOptions={loginInput} />
      <ControlledFormInput control={formControl} inputOptions={passwordInput} />
    </ModalWithForm>
  );
};

export default EditProfileForm;
