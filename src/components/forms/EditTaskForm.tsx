import React, { FC, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useTranslation } from 'react-i18next';
import { taskDescriptionInput, taskTitleInput } from 'constants/inputs';
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { useForm } from 'react-hook-form';
import ModalWithForm from 'components/ModalWithForm';
import ControlledFormInput from 'components/ControlledFormInput';
import { FormControl } from 'types/formInput';
import { tasksSelector, updateLocalTask, updateTask } from 'store/tasksSlice';
import { TaskFields } from 'types/tasks';
import { authSelector } from 'store/authSlice';
import { TypeofModal } from 'constants/constants';

const EditTaskForm: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const {
    currentTask: { _id: taskId, description, title },
  } = useAppSelector(tasksSelector);
  const { userId } = useAppSelector(authSelector);
  const isOpenKey: `isOpen_${string}` = `isOpen_${TypeofModal.editTask}`;
  const { [isOpenKey]: isOpen = false } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<TaskFields>({
    defaultValues: {
      title,
      description,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const formControl = control as FormControl;

  const onSubmit = (data: TaskFields) => {
    if (data.title !== title || data.description !== description) {
      //TODO fix users // temporary plug
      const updateParams = { taskId, data: { ...data, users: [userId] } };

      dispatch(updateLocalTask(updateParams));
      dispatch(updateTask(updateParams));
    }
    dispatch(closeModalForm(TypeofModal.editTask));
  };

  useEffect(() => {
    dispatch(setIsSubmitDisabled({ uniqueId: TypeofModal.editTask, flag: !isValid }));
  }, [isValid, dispatch]);

  const resetForm: () => void = useCallback((): void => {
    reset({ title, description });
  }, [reset, title, description]);

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
