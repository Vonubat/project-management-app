import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { Box, styled, Typography } from '@mui/material';
import { DndType, TypeofModal } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { setCurrentColumnId } from 'store/columnsSlice';
import { openModalForm } from 'store/modalSlice';
import { changeLocalTaskOrder, changeTaskOrder, tasksSelector } from 'store/tasksSlice';
import { DropTaskItem } from 'types/tasks';

import ColumnsAddBtn from './UI/ColumnsAddBtn';
import Task from './UI/Task';

type Props = {
  children?: React.ReactNode;
  columnId: string;
};

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1,
});

const TasksPreview: FC<Props> = ({ columnId }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const { tasks } = useAppSelector(tasksSelector);
  const dispatch = useAppDispatch();
  const [{ isOver }, drop] = useDrop({
    accept: DndType.task,
    drop(item: DropTaskItem, monitor) {
      const didDrop = monitor.didDrop();

      if (didDrop) return;

      if (columnId !== item.columnId) {
        dispatch(
          changeLocalTaskOrder({
            dragOrder: item.order,
            dragColumnId: item.columnId,
            dropOrder:
              tasks[columnId] && tasks[columnId].length
                ? tasks[columnId][tasks[columnId].length - 1].order + 1
                : 0,
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

  const openModal = () => {
    dispatch(setCurrentColumnId(columnId));
    dispatch(openModalForm(TypeofModal.addTask));
  };

  return (
    <StyledBox>
      <StyledBox
        ref={drop}
        sx={{
          width: '100%',
          minHeight: isOver ? '300px' : '50px',
          backgroundColor: isOver ? 'blue' : 'transparent',
        }}
      >
        {tasks[columnId]?.map((task) => (
          <Task key={task._id} taskData={task} />
        ))}
      </StyledBox>
      <ColumnsAddBtn sx={{ mt: 3 }} cb={openModal}>
        <Typography variant="h6">{t('addTask')}</Typography>
      </ColumnsAddBtn>
    </StyledBox>
  );
};

export default TasksPreview;
