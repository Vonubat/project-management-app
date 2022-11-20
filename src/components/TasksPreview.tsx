import React, { FC, useEffect } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import ColumnsAddBtn from './UI/ColumnsAddBtn';
import {
  changeLocalTaskOrder,
  changeTaskOrder,
  getAllTasks,
  tasksSelector,
} from 'store/tasksSlice';
import Task from './UI/Task';
import { DropTaskItem, TaskData } from 'types/tasks';
import { openModalForm } from 'store/modalSlice';
import { DndType, TypeofModal } from 'constants/constants';
import { setCurrentColumnId } from 'store/columnsSlice';
import { useDrop } from 'react-dnd';

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
            dropOrder: tasks[columnId].length
              ? tasks[columnId][tasks[columnId].length - 1].order + 1
              : 0,
            dropColumnId: columnId,
          })
        );
        dispatch(changeTaskOrder([item.columnId, columnId]));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  useEffect(() => {
    dispatch(getAllTasks(columnId));
  }, [dispatch, columnId]);

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
          backgroundColor: isOver ? 'blue' : 'white',
        }}
      >
        {tasks[columnId]?.map(({ _id, title, description, columnId, order }: TaskData) => (
          <Task
            key={_id}
            taskId={_id}
            columnId={columnId}
            taskTitle={title}
            taskDescription={description}
            order={order}
          />
        ))}
      </StyledBox>
      <ColumnsAddBtn sx={{ mt: 3 }} cb={openModal}>
        <Typography variant="h6">{t('addTask')}</Typography>
      </ColumnsAddBtn>
    </StyledBox>
  );
};

export default TasksPreview;
