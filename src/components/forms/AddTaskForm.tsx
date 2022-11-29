import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import { Add as AddIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { Chip, Collapse, Grow } from '@mui/material';
import { TypeofModal } from 'constants/constants';
import { taskDescriptionInput, taskTitleInput } from 'constants/inputs';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { boardListSelector } from 'store/boardListSlice';
import { columnsSelector } from 'store/columnsSlice';
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { createTask, setTasksLoading } from 'store/tasksSlice';
import { usersSelector } from 'store/usersSlice';
import { FormControl } from 'types/formInput';
import { TaskFields } from 'types/tasks';
import { UserWithCheck } from 'types/users';

import ControlledFormInput from 'components/ControlledFormInput';
import ModalWithForm from 'components/ModalWithForm';
import CustomPaper from 'components/UI/CustomPaper';
import UserSearchBar from 'components/UserSearchBar';

const AddTaskForm: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const isOpenKey: `isOpen_${string}` = `isOpen_${TypeofModal.addTask}`;
  const { [isOpenKey]: isOpen = false } = useAppSelector(modalSelector);
  const { currentColumnId: columnId } = useAppSelector(columnsSelector);
  const { users } = useAppSelector(usersSelector);
  const { currentBoardId, boards } = useAppSelector(boardListSelector);
  const dispatch = useAppDispatch();
  const [boardUsers, setBoardUsers] = useState<UserWithCheck[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
        users: boardUsers.filter((u) => u.checked).map((u) => u._id),
      })
    );
    dispatch(closeModalForm(TypeofModal.addTask));
  };

  function handleToggle(checkedId: string) {
    setBoardUsers(
      boardUsers.map((user) => ({
        ...user,
        checked: user._id === checkedId ? !user.checked : user.checked,
      }))
    );
  }

  useEffect(() => {
    dispatch(setIsSubmitDisabled({ uniqueId: TypeofModal.addTask, flag: !isValid }));
  }, [isValid, dispatch]);

  useEffect(() => {
    if (isOpen) {
      reset({ title: '', description: '' });

      const currentBoard = boards.find((b) => b._id === currentBoardId);

      if (currentBoard) {
        const preBoardUsers = [...currentBoard.users, currentBoard.owner].reduce(
          (userList, boardParticipantId) => {
            const foundUser = users.find((u) => u._id === boardParticipantId);
            foundUser && userList.push({ ...foundUser, checked: false });

            return userList;
          },
          [] as UserWithCheck[]
        );

        setBoardUsers(preBoardUsers);
      }
    }

    return () => setIsSearchOpen(false);
  }, [isOpen, users, boards, currentBoardId, reset]);

  return (
    <ModalWithForm
      modalTitle={t('addTask')}
      uniqueId={TypeofModal.addTask}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Collapse in={!isSearchOpen}>
        <ControlledFormInput control={formControl} inputOptions={taskTitleInput} />
        <ControlledFormInput control={formControl} inputOptions={taskDescriptionInput} />
      </Collapse>
      <Collapse in={isSearchOpen}>
        <UserSearchBar
          userId={null}
          users={boardUsers}
          checkedUsersID={boardUsers.filter((u) => u.checked).map((u) => u._id)}
          handleToggle={handleToggle}
        />
      </Collapse>
      <CustomPaper>
        <Chip
          color="primary"
          sx={{ ':hover': { cursor: 'pointer' }, m: 0.25 }}
          label={isSearchOpen ? t('back') : t('addUsers')}
          icon={isSearchOpen ? <ChevronLeftIcon /> : <AddIcon />}
          onClick={() => setIsSearchOpen((prev) => !prev)}
        />
        <TransitionGroup>
          {boardUsers
            .filter((u) => u.checked)
            .map(({ login, _id }) => (
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
