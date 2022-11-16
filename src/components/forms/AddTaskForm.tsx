import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useTranslation } from 'react-i18next';
import { taskDescriptionInput, taskTitleInput } from 'constants/inputs';
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { useForm } from 'react-hook-form';
import ModalWithForm from 'components/ModalWithForm';
import ControlledFormInput from 'components/ControlledFormInput';
import { FormControl } from 'types/formInput';
import { createTask, tasksSelector } from 'store/tasksSlice';
import { AddTaskFields } from 'types/tasks';
import { authSelector } from 'store/authSlice';

type Props = {
  boardId: string;
  columnId: string;
};

const AddTaskForm: FC<Props> = ({ boardId, columnId }) => {
  const isOpenKey: `isOpen_${string}` = `isOpen_${columnId}`;
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const { userId } = useAppSelector(authSelector);
  const { [isOpenKey]: isOpen } = useAppSelector(modalSelector);
  const { tasks } = useAppSelector(tasksSelector);
  const currentPosition: number = (tasks[boardId]?.length || 0) + 1;
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<AddTaskFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const formControl = control as FormControl;

  const onSubmit = (data: AddTaskFields) => {
    dispatch(
      createTask({
        boardId,
        columnId,
        data: {
          title: data.title,
          description: data.description,
          order: currentPosition,
          userId: userId as string,
          users: [userId as string], // temporary plug
        },
      })
    );
    dispatch(closeModalForm(columnId));
  };

  useEffect(() => {
    dispatch(setIsSubmitDisabled(!isValid));
  }, [isValid, dispatch]);

  useEffect(() => {
    if (isOpen) {
      reset({ title: '', description: '' });
    }
  }, [isOpen, reset]);

  return (
    <ModalWithForm modalTitle={t('addTask')} uniqueId={columnId} onSubmit={handleSubmit(onSubmit)}>
      <ControlledFormInput control={formControl} inputOptions={taskTitleInput} />
      <ControlledFormInput control={formControl} inputOptions={taskDescriptionInput} />
    </ModalWithForm>
  );
};

export default AddTaskForm;
