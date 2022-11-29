import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TypeofModal } from 'constants/constants';
import { columnTitleInput } from 'constants/inputs';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { createColumn } from 'store/columnsSlice';
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { AddColumnFields } from 'types/columns';
import { FormControl } from 'types/formInput';

import ControlledFormInput from 'components/ControlledFormInput';
import ModalWithForm from 'components/ModalWithForm';

const AddColumnForm: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });
  const isOpenKey: `isOpen_${string}` = `isOpen_${TypeofModal.addColumn}`;
  const { [isOpenKey]: isOpen = false } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<AddColumnFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const formControl = control as FormControl;

  const onSubmit = (data: AddColumnFields) => {
    dispatch(createColumn(data));
    dispatch(closeModalForm(TypeofModal.addColumn));
  };

  useEffect(() => {
    dispatch(setIsSubmitDisabled({ uniqueId: TypeofModal.addColumn, flag: !isValid }));
  }, [isValid, dispatch]);

  useEffect(() => {
    if (isOpen) {
      reset({ title: '' });
    }
  }, [isOpen, reset]);

  return (
    <ModalWithForm
      modalTitle={t('addColumn')}
      uniqueId={TypeofModal.addColumn}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledFormInput control={formControl} inputOptions={columnTitleInput} />
    </ModalWithForm>
  );
};

export default AddColumnForm;
