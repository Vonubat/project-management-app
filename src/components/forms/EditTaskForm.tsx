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
import { closeModalForm, modalSelector, setIsSubmitDisabled } from 'store/modalSlice';
import { tasksSelector, updateLocalTask, updateTask } from 'store/tasksSlice';
import { usersSelector } from 'store/usersSlice';
import { FormControl } from 'types/formInput';
import { TaskFields } from 'types/tasks';
import { UserWithCheck } from 'types/users';
import { trimFields } from 'utils/trimFields';

import ControlledFormInput from 'components/ControlledFormInput';
import ModalWithForm from 'components/ModalWithForm';
import CustomPaper from 'components/UI/CustomPaper';
import UserSearchBar from 'components/UserSearchBar';

const EditTaskForm: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const {
    currentTask: { _id: taskId, description, title, users: assignedUsers },
  } = useAppSelector(tasksSelector);
  const isOpenKey: `isOpen_${string}` = `isOpen_${TypeofModal.editTask}`;
  const { [isOpenKey]: isOpen = false } = useAppSelector(modalSelector);
  const { users } = useAppSelector(usersSelector);
  const { currentBoardId, boards } = useAppSelector(boardListSelector);
  const [boardUsers, setBoardUsers] = useState<UserWithCheck[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    trigger,
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
    let isFieldsValid = true;

    Object.entries(trimFields(data)).forEach(([key, value]) => {
      if (!value.length) {
        resetField(key as keyof TaskFields);
        trigger(key as keyof TaskFields);

        isFieldsValid = false;
      }
    });

    if (!isFieldsValid) return;

    const updateParams = {
      taskId,
      data: { ...data, users: boardUsers.filter((u) => u.checked).map((u) => u._id) },
    };

    dispatch(updateLocalTask(updateParams));
    dispatch(updateTask(updateParams));
    dispatch(closeModalForm(TypeofModal.editTask));
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
    dispatch(setIsSubmitDisabled({ uniqueId: TypeofModal.editTask, flag: !isValid }));
  }, [isValid, dispatch]);

  useEffect(() => {
    if (isOpen) {
      reset({ title, description });

      const currentBoard = boards.find((b) => b._id === currentBoardId);

      if (currentBoard) {
        const preBoardUsers = [...currentBoard.users, currentBoard.owner].reduce(
          (userList, boardParticipantId) => {
            const foundUser = users.find((u) => u._id === boardParticipantId);
            foundUser &&
              userList.push({ ...foundUser, checked: assignedUsers.includes(foundUser._id) });

            return userList;
          },
          [] as UserWithCheck[]
        );

        setBoardUsers(preBoardUsers);
      }
    }
    return () => setIsSearchOpen(false);
  }, [isOpen, title, description, users, boards, currentBoardId, assignedUsers, reset]);

  return (
    <ModalWithForm
      modalTitle={t('editTask')}
      uniqueId={TypeofModal.editTask}
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

export default EditTaskForm;
