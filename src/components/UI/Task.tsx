import React, { FC, SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, createTheme, Typography } from '@mui/material';
import { DefaultColors, GRAY_700, TypeofModal } from 'constants/constants';
import { useAppDispatch } from 'hooks/typedHooks';
import { setCurrentColumnId } from 'store/columnsSlice';
import { openModalForm } from 'store/modalSlice';
import { changeTaskOrder, deleteLocalTask, deleteTask, setCurrentTask } from 'store/tasksSlice';
import { TaskData } from 'types/tasks';
import isTouchEnabled from 'utils/isTouchEnabled';

import ConfirmModal from 'components/ConfirmModal';

import CustomIconBtn from './CustomIconBtn';

const theme = createTheme();

const taskStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  minWidth: 280,
  maxWidth: 280,
  maxHeight: 40,
  minHeight: 40,
  mx: 1,
  my: 0.25,
  p: 0.625,
  borderRadius: '3px',
  fontSize: 20,
  color: GRAY_700,
  cursor: 'pointer',
  boxShadow: `${theme.shadows[3]}`,
  bgcolor: 'white',
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
  const isTouchScreenDevice: boolean = isTouchEnabled();

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

  return (
    <Box
      sx={{ ...taskStyles }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={openEditTaskModal}
    >
      <Typography variant="h6" noWrap>
        {title}
      </Typography>
      {(isHovering || isTouchScreenDevice) && (
        <CustomIconBtn size="small" color={DefaultColors.error} cb={openConfirmModal}>
          <DeleteIcon />
        </CustomIconBtn>
      )}
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
