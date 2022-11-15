import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useTranslation } from 'react-i18next';
import { columnsSelector, createColumn } from 'store/columnsSlice';
import { useParams } from 'react-router-dom';
import { columnTitleInput } from 'constants/inputs';
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { Control, useForm } from 'react-hook-form';
import { AddColumnFields } from 'types/columns';
import ModalWithForm from 'components/ModalWithForm';
import ControlledFormInput from 'components/ControlledFormInput';

const AddColumnForm: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });
  const { isOpen } = useAppSelector(modalSelector);
  const { boardId } = useParams();
  const { columns } = useAppSelector(columnsSelector);
  const currentPosition: number = columns.length + 1;
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<AddColumnFields>({
    defaultValues: {
      title: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const formControl = control as Control<AddColumnFields, unknown>;

  const onSubmit = (data: AddColumnFields) => {
    dispatch(
      createColumn({
        boardId: boardId as string,
        data: { title: data.title, order: currentPosition },
      })
    );
    dispatch(closeModalForm());
  };

  useEffect(() => {
    dispatch(setIsSubmitDisabled(!isValid));
  }, [isValid, dispatch]);

  useEffect(() => {
    if (isOpen) {
      reset({ title: '' });
    }
  }, [isOpen, reset]);

  return (
    <ModalWithForm modalTitle={t('addColumn')} onSubmit={handleSubmit(onSubmit)}>
      <ControlledFormInput control={formControl} inputOptions={columnTitleInput} />
    </ModalWithForm>
  );
};

export default AddColumnForm;
