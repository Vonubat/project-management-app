import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ConfirmModal from './ConfirmModal';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { deleteColumn } from 'store/columnsSlice';
import ColumnsAddBtn from './UI/ColumnsAddBtn';
import ColumnTextarea from './UI/ColumnTextarea';
import DeleteBtn from './UI/DeleteBtn';
import { DefaultColors, Status } from 'constants/constants';
import { getAllTasks, tasksSelector } from 'store/tasksSlice';
import Loader from './Loader';
import Task from './UI/Task';
import { TaskData } from 'types/tasks';
import { openModalForm } from 'store/modalSlice';
import AddColumnForm from './forms/AddColumnForm';

type Props = {
  children?: React.ReactNode;
  columnId: string;
  boardId: string;
};

const TasksPreview: FC<Props> = ({ columnId, boardId }) => {
  const { tasks, status } = useAppSelector(tasksSelector);
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const isLoading: boolean = status === Status.pending;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTasks({ columnId, boardId }));
  }, [dispatch, boardId, columnId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {tasks[columnId]?.map(({ _id, title, boardId, columnId, order }: TaskData) => (
        <Task
          key={_id}
          taskId={_id}
          boardId={boardId}
          columnId={columnId}
          taskTitle={title}
          order={order}
        />
      ))}
      <ColumnsAddBtn cb={() => dispatch(openModalForm())}>
        <Typography variant="h6">{t('addTask')}</Typography>
      </ColumnsAddBtn>
      <AddColumnForm />
      {isLoading && <Loader />}
    </Box>
  );
};

export default TasksPreview;
