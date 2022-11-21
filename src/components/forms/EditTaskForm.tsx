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
import { TypeofModal } from 'constants/constants';
import { Add as AddIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { TransitionGroup } from 'react-transition-group';
import { Collapse, Paper, Chip, Grow } from '@mui/material';
import UserSearchBar from 'components/UserSearchBar';
import { usersSelector } from 'store/usersSlice';

const paperStyles = {
  display: 'flex',
  justifyContent: 'left',
  flexWrap: 'wrap',
  boxSizing: 'border-box',
  height: 78,
  p: 0.25,
  mt: 2,
  listStyle: 'none',
  overflow: 'auto',
  borderColor: 'white',
  outline: '1px solid #e6e6e6',
  ':hover': { outlineColor: 'black' },
};

const EditTaskForm: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const {
    currentTask: { _id: taskId, description, title, users: assignedUsers },
  } = useAppSelector(tasksSelector);
  const isOpenKey: `isOpen_${string}` = `isOpen_${TypeofModal.editTask}`;
  const { [isOpenKey]: isOpen = false } = useAppSelector(modalSelector);
  const { users } = useAppSelector(usersSelector);
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
    const updateParams = { taskId, data: { ...data, users: checkedUsersId } };

    dispatch(updateLocalTask(updateParams));
    dispatch(updateTask(updateParams));
    dispatch(closeModalForm(TypeofModal.editTask));
  };

  const [isSearchWin, setSearchWin] = React.useState(false);
  const [checkedUsersId, setCheckedUsersId] = React.useState<string[]>([]);
  const checkedUsers = users.filter(({ _id }) => checkedUsersId.includes(_id));

  function handleToggle(value: string) {
    const curInd = checkedUsersId.indexOf(value);
    const newChecked = [...checkedUsersId];
    curInd === -1 ? newChecked.push(value) : newChecked.splice(curInd, 1);
    setCheckedUsersId(newChecked);
  }

  useEffect(() => {
    dispatch(setIsSubmitDisabled({ uniqueId: TypeofModal.editTask, flag: !isValid }));
  }, [isValid, dispatch]);

  const resetForm: () => void = useCallback((): void => {
    reset({ title, description });
  }, [reset, title, description]);

  useEffect(() => {
    setCheckedUsersId(assignedUsers || []);
    setSearchWin(false);
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm, assignedUsers]);

  return (
    <ModalWithForm
      modalTitle={t('editTask')}
      uniqueId={TypeofModal.editTask}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Collapse in={!isSearchWin}>
        <ControlledFormInput control={formControl} inputOptions={taskTitleInput} />
        <ControlledFormInput control={formControl} inputOptions={taskDescriptionInput} />
      </Collapse>
      <Collapse in={isSearchWin}>
        <UserSearchBar users={users} checkedUsersID={checkedUsersId} handleToggle={handleToggle} />
      </Collapse>
      <Paper variant="outlined" className="alternative-scroll" sx={paperStyles}>
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
      </Paper>
    </ModalWithForm>
  );
};

export default EditTaskForm;
