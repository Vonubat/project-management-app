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

type Props = {
  boardId: string;
};

const AddColumnForm: FC<Props> = ({ boardId }) => {
  const isOpenKey: `isOpen_${string}` = `isOpen_${boardId}`;
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });
  const { [isOpenKey]: isOpen } = useAppSelector(modalSelector);
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
    dispatch(closeModalForm(boardId));
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
    <ModalWithForm modalTitle={t('addColumn')} uniqueId={boardId} onSubmit={handleSubmit(onSubmit)}>
      <ControlledFormInput control={formControl} inputOptions={columnTitleInput} />
    </ModalWithForm>
  );
};

export default AddColumnForm;
