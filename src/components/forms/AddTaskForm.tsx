import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useTranslation } from 'react-i18next';
import { taskDescriptionInput, taskTitleInput } from 'constants/inputs';
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { useForm } from 'react-hook-form';
import ModalWithForm from 'components/ModalWithForm';
import ControlledFormInput from 'components/ControlledFormInput';
import { FormControl } from 'types/formInput';
import { createTask, setTasksLoading } from 'store/tasksSlice';
import { TaskFields } from 'types/tasks';
import { authSelector } from 'store/authSlice';
import { TypeofModal } from 'constants/constants';
import { columnsSelector } from 'store/columnsSlice';

const AddTaskForm: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const isOpenKey: `isOpen_${string}` = `isOpen_${TypeofModal.addTask}`;
  const { [isOpenKey]: isOpen = false } = useAppSelector(modalSelector);
  const { userId } = useAppSelector(authSelector);
  const { currentColumnId: columnId } = useAppSelector(columnsSelector);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<TaskFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const formControl = control as FormControl;

  const onSubmit = (data: TaskFields) => {
    dispatch(setTasksLoading(columnId));
    dispatch(
      createTask({
        ...data,
        users: [userId], //TODO fix users // temporary plug
      })
    );
    dispatch(closeModalForm(TypeofModal.addTask));
  };

  useEffect(() => {
    dispatch(setIsSubmitDisabled({ uniqueId: TypeofModal.addTask, flag: !isValid }));
  }, [isValid, dispatch]);

  useEffect(() => {
    if (isOpen) {
      reset({ title: '', description: '' });
    }
  }, [isOpen, reset]);

  return (
    <ModalWithForm
      modalTitle={t('addTask')}
      uniqueId={TypeofModal.addTask}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ControlledFormInput control={formControl} inputOptions={taskTitleInput} />
      <ControlledFormInput control={formControl} inputOptions={taskDescriptionInput} />
    </ModalWithForm>
  );
};

export default AddTaskForm;
