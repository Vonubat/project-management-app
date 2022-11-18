import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useTranslation } from 'react-i18next';
import { columnsSelector, createColumn } from 'store/columnsSlice';
import { columnTitleInput } from 'constants/inputs';
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { useForm } from 'react-hook-form';
import { AddColumnFields } from 'types/columns';
import ModalWithForm from 'components/ModalWithForm';
import ControlledFormInput from 'components/ControlledFormInput';
import { FormControl } from 'types/formInput';
import { TypeofModal } from 'constants/constants';
import { useParams } from 'react-router-dom';

const AddColumnForm: FC = () => {
  const { boardId } = useParams();
  const isOpenKey: `isOpen_${string}` = `isOpen_${TypeofModal.addColumn}`;
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });
  const { [isOpenKey]: isOpen = false } = useAppSelector(modalSelector);
  const { columns } = useAppSelector(columnsSelector);
  const currentPosition: number = columns.length + 1;
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
    dispatch(
      createColumn({
        boardId: boardId as string,
        data: { title: data.title, order: currentPosition },
      })
    );

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
