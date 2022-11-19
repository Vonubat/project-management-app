import React, { FC, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useTranslation } from 'react-i18next';
import { taskDescriptionInput, taskTitleInput } from 'constants/inputs';
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { useForm } from 'react-hook-form';
import ModalWithForm from 'components/ModalWithForm';
import ControlledFormInput from 'components/ControlledFormInput';
import { FormControl } from 'types/formInput';
import { setTasksLoading, tasksSelector, updateTask } from 'store/tasksSlice';
import { TaskFields } from 'types/tasks';
import { authSelector } from 'store/authSlice';
import { TypeofModal } from 'constants/constants';
import { columnsSelector } from 'store/columnsSlice';

const EditTaskForm: FC = () => {
  const { currentTaskTitle: taskTitle } = useAppSelector(tasksSelector);
  const { currentTaskDescription: taskDescription } = useAppSelector(tasksSelector);
  const { currentTaskId: taskId } = useAppSelector(tasksSelector);
  const { currentColumnId: columnId } = useAppSelector(columnsSelector);
  const isOpenKey: `isOpen_${string}` = `isOpen_${TypeofModal.editTask}`;
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const { userId } = useAppSelector(authSelector);
  const { [isOpenKey]: isOpen = false } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<TaskFields>({
    defaultValues: {
      title: taskTitle,
      description: taskDescription,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const formControl = control as FormControl;

  const onSubmit = (data: TaskFields) => {
    if (data.title !== taskTitle || data.description !== taskDescription) {
      dispatch(setTasksLoading(columnId));
      dispatch(updateTask({ taskId, data: { ...data, users: [userId] } })); //TODO fix users // temporary plug
    }
    dispatch(closeModalForm(TypeofModal.editTask));
  };

  useEffect(() => {
    dispatch(setIsSubmitDisabled({ uniqueId: TypeofModal.editTask, flag: !isValid }));
  }, [isValid, dispatch]);

  const resetForm: () => void = useCallback((): void => {
    reset({ title: taskTitle, description: taskDescription });
  }, [reset, taskTitle, taskDescription]);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      modalTitle={t('editTask')}
      uniqueId={TypeofModal.editTask}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledFormInput control={formControl} inputOptions={taskTitleInput} />
      <ControlledFormInput control={formControl} inputOptions={taskDescriptionInput} />
    </ModalWithForm>
  );
};

export default EditTaskForm;
