import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, AvatarGroup, Box, createTheme, Tooltip, Typography } from '@mui/material';
import { DefaultColors, GRAY_700, TypeofModal } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { setCurrentColumnId } from 'store/columnsSlice';
import { openModalForm } from 'store/modalSlice';
import { changeTaskOrder, deleteLocalTask, deleteTask, setCurrentTask } from 'store/tasksSlice';
import { usersSelector } from 'store/usersSlice';
import { TaskData } from 'types/tasks';
import isTouchEnabled from 'utils/isTouchEnabled';
import { stringAvatar } from 'utils/stringAvatar';

import ConfirmModal from 'components/ConfirmModal';

import CustomIconBtn from './CustomIconBtn';

const theme = createTheme();

const taskStyles = {
  display: 'flex',
  flexDirection: 'column',
  mx: 1,
  my: 0.25,
  p: 0.625,
  borderRadius: '3px',
  cursor: 'pointer',
  boxShadow: `${theme.shadows[3]}`,
  bgcolor: 'white',
};

const avatarStyle = {
  mx: 0.2,
  fontSize: '0.8rem',
  diameter: 20,
};

const componentProps = {
  additionalAvatar: {
    sx: {
      width: 20,
      height: 20,
      fontSize: '0.8rem',
      bgcolor: 'secondary.main',
    },
  },
};

type Props = {
  children?: React.ReactNode;
  taskData: TaskData;
};

const Task: FC<Props> = ({ taskData }) => {
  const { columnId, title } = taskData;
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useAppDispatch();
  const isTouchScreenDevice = isTouchEnabled();
  const { users } = useAppSelector(usersSelector);
  const [taskUsers, setTaskUsers] = useState<string[]>([
    ...taskData.users.reduce((acc, uId) => {
      const found = users.find((u) => u._id === uId);
      found && acc.push(Object.values(found).splice(1, 2).join(' '));
      return acc;
    }, [] as string[]),
  ]);

  const [taskOwner] = useState<string>(
    Object.values(users.find((u) => u._id === taskData.userId)!)
      .splice(1, 2)
      .join(' ')
  );

  const submit = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(setCurrentTask(taskData));
    dispatch(deleteLocalTask());
    dispatch(deleteTask());
    // TODO find solution to not emit event
    dispatch(changeTaskOrder());
    //
    closeConfirmModal(e);
  };

  const openConfirmModal = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const closeConfirmModal = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const openEditTaskModal = () => {
    dispatch(setCurrentTask(taskData));
    dispatch(setCurrentColumnId(columnId));
    dispatch(openModalForm(TypeofModal.editTask));
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    if (users.length) {
      setTaskUsers(
        taskData.users.reduce((acc, uId) => {
          const found = users.find((u) => u._id === uId);
          found && acc.push(Object.values(found).splice(1, 2).join(' '));
          return acc;
        }, [] as string[])
      );
    }
  }, [users, taskData]);

  return (
    <Box
      sx={{ ...taskStyles }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={openEditTaskModal}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box',
          minWidth: 280,
          maxWidth: 280,
          borderRadius: '3px',
          fontSize: 20,
          color: GRAY_700,
        }}
      >
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
        {(isHovering || isTouchScreenDevice) && (
          <CustomIconBtn size="small" color={DefaultColors.error} cb={openConfirmModal}>
            <DeleteIcon />
          </CustomIconBtn>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tooltip title={taskOwner}>
          <Avatar {...stringAvatar({ name: taskOwner, ...avatarStyle })} />
        </Tooltip>
        <AvatarGroup max={5} spacing={1} componentsProps={componentProps}>
          {taskUsers.map((name) => (
            <Tooltip key={name} title={name}>
              <Avatar {...stringAvatar({ name, ...avatarStyle })} />
            </Tooltip>
          ))}
        </AvatarGroup>
      </Box>
      <ConfirmModal
        title={t('delTask')}
        isOpen={isOpen}
        onSubmit={submit}
        onClose={closeConfirmModal}
      />
    </Box>
  );
};

export default Task;
