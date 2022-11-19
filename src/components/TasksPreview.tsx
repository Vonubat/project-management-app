import React, { FC, useEffect } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import ColumnsAddBtn from './UI/ColumnsAddBtn';
import { getAllTasks, tasksSelector } from 'store/tasksSlice';
import Task from './UI/Task';
import { TaskData } from 'types/tasks';
import { openModalForm } from 'store/modalSlice';
import { TypeofModal } from 'constants/constants';
import { setCurrentColumnId } from 'store/columnsSlice';

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
  const { tasks } = useAppSelector(tasksSelector);
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTasks(columnId));
  }, [dispatch, columnId]);

  const openModal = () => {
    dispatch(setCurrentColumnId(columnId));
    dispatch(openModalForm(TypeofModal.addTask));
  };

  return (
    <StyledBox>
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
      <ColumnsAddBtn sx={{ marginTop: 3 }} cb={openModal}>
        <Typography variant="h6">{t('addTask')}</Typography>
      </ColumnsAddBtn>
    </StyledBox>
  );
};

export default TasksPreview;
