import React, { FC, SyntheticEvent, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DefaultColors, DndType, GRAY_700, TypeofModal } from 'constants/constants';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/hooks';
import {
  changeLocalTaskOrder,
  changeTaskOrder,
  deleteTask,
  deleteLocalTask,
  setCurrentTask,
} from 'store/tasksSlice';
import ConfirmModal from 'components/ConfirmModal';
import CustomIconBtn from './CustomIconBtn';
import { theme } from 'components/Page';
import { setCurrentColumnId } from 'store/columnsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { openModalForm } from 'store/modalSlice';
import isTouchEnabled from 'utils/isTouchEnabled';
import { ConnectableElement, useDrag, useDrop } from 'react-dnd';
import { DropTaskItem, TaskData } from 'types/tasks';

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
  my: 0.3,
  p: 0.625,
  borderRadius: '3px',
  fontSize: 20,
  color: GRAY_700,
  cursor: 'pointer',
  boxShadow: `${theme.shadows[3]}`,
};

type Props = {
  children?: React.ReactNode;
  taskData: TaskData;
};

const Task: FC<Props> = ({ taskData }) => {
  const { _id, columnId, title, order } = taskData;
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useAppDispatch();
  const isTouchScreenDevice: boolean = isTouchEnabled();
  const [{ isDragging }, drag] = useDrag({
    type: DndType.task,
    item: {
      id: _id,
      columnId,
      order,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: DndType.task,
    drop(item: DropTaskItem) {
      if (item.columnId !== columnId || item.order !== order) {
        dispatch(
          changeLocalTaskOrder({
            dragOrder: item.order,
            dragColumnId: item.columnId,
            dropOrder: order,
            dropColumnId: columnId,
          })
        );
        dispatch(changeTaskOrder());
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

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
      ref={(node: ConnectableElement) => drag(drop(node))}
      sx={{ ...taskStyles, bgcolor: isOver ? 'lightBlue' : 'white', opacity: isDragging ? 0 : 1 }}
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
