import React, { FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import { Add as AddIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { Chip, Collapse, Grow } from '@mui/material';
import { TypeofModal } from 'constants/constants';
import { taskDescriptionInput, taskTitleInput } from 'constants/inputs';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { useUsersForCurrentBoard } from 'hooks/useUsersForCurrentBoard';
import { authSelector } from 'store/authSlice';
import { columnsSelector } from 'store/columnsSlice';
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { createTask, setTasksLoading } from 'store/tasksSlice';
import { FormControl } from 'types/formInput';
import { TaskFields } from 'types/tasks';
import { UserData } from 'types/users';

import ControlledFormInput from 'components/ControlledFormInput';
import ModalWithForm from 'components/ModalWithForm';
import CustomPaper from 'components/UI/CustomPaper';
import UserSearchBar from 'components/UserSearchBar';

const AddTaskForm: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const isOpenKey: `isOpen_${string}` = `isOpen_${TypeofModal.addTask}`;
  const { [isOpenKey]: isOpen = false } = useAppSelector(modalSelector);
  const { currentColumnId: columnId } = useAppSelector(columnsSelector);
  const { userId } = useAppSelector(authSelector);
  const users: UserData[] = useUsersForCurrentBoard();
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
        users: checkedUsersId,
      })
    );
    dispatch(closeModalForm(TypeofModal.addTask));
  };

  const [isSearchWin, setSearchWin] = useState(false);
  const [checkedUsersId, setCheckedUsersId] = useState<string[]>([]);
  const checkedUsers = users.filter(({ _id }) => checkedUsersId.includes(_id));

  function handleToggle(value: string) {
    const curInd = checkedUsersId.indexOf(value);
    const newChecked = [...checkedUsersId];
    curInd === -1 ? newChecked.push(value) : newChecked.splice(curInd, 1);
    setCheckedUsersId(newChecked);
  }

  useEffect(() => {
    dispatch(setIsSubmitDisabled({ uniqueId: TypeofModal.addTask, flag: !isValid }));
  }, [isValid, dispatch]);

  const resetForm: () => void = useCallback((): void => {
    if (isOpen) {
      reset({ title: '', description: '' });
    }
  }, [isOpen, reset]);

  useEffect(() => {
    setSearchWin(false);
    resetForm();
  }, [resetForm]);

  return (
    <ModalWithForm
      modalTitle={t('addTask')}
      uniqueId={TypeofModal.addTask}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Collapse in={!isSearchWin}>
        <ControlledFormInput control={formControl} inputOptions={taskTitleInput} />
        <ControlledFormInput control={formControl} inputOptions={taskDescriptionInput} />
      </Collapse>
      <Collapse in={isSearchWin}>
        <UserSearchBar
          userId={userId}
          users={users}
          checkedUsersID={checkedUsersId}
          handleToggle={handleToggle}
        />
      </Collapse>
      <CustomPaper>
        <Chip
          color="primary"
          sx={{ ':hover': { cursor: 'pointer' }, m: 0.25 }}
          label={isSearchWin ? t('back') : t('addUsers')}
          icon={isSearchWin ? <ChevronLeftIcon /> : <AddIcon />}
          onClick={() => setSearchWin((prev) => !prev)}
        />
        <TransitionGroup>
          {checkedUsers.map(({ login, _id }) => (
            <Grow key={_id}>
              <Chip label={login} onDelete={() => handleToggle(_id)} sx={{ m: 0.25 }} />
            </Grow>
          ))}
        </TransitionGroup>
      </CustomPaper>
    </ModalWithForm>
  );
};

export default AddTaskForm;
