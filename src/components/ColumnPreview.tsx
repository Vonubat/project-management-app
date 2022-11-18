import React, { FC } from 'react';
import { Box, LinearProgress } from '@mui/material';
import ColumnTextarea from './UI/ColumnTextarea';
import TasksPreview from './TasksPreview';
import { useAppSelector } from 'hooks/hooks';
import { columnsSelector } from 'store/columnsSlice';
import { tasksSelector } from 'store/tasksSlice';

type ColumnProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

type ColumnPreviewProps = {
  columnTitle: string;
  columnId: string;
  boardId: string;
  order: number;
};

const Column: FC<ColumnProps> = ({ children, isLoading }) => {
  return (
    <Box
      sx={{
        height: 'fit-content',
        maxHeight: 'calc(100% - 30px)',
        py: 1,
        mx: 2,
        maxWidth: 300,
        minWidth: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 3,
        borderRadius: '5px',
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        transition: '.1s linear',
        opacity: isLoading ? 0.5 : 1,
        pointerEvents: isLoading ? 'none' : 'auto',
        '&::-webkit-scrollbar-thumb': {
          borderRadius: 5,
        },
        '&::-webkit-scrollbar-track': {
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        },
      }}
    >
      {children}
    </Box>
  );
};

const ColumnPreview: FC<ColumnPreviewProps> = ({ columnTitle, columnId, boardId, order }) => {
  const { columnLoadingArr } = useAppSelector(columnsSelector);
  const isColumnLoading: boolean = columnLoadingArr.some((id) => id === columnId);
  const { tasksLoadingArr } = useAppSelector(tasksSelector);
  const isTasksLoading: boolean = tasksLoadingArr.some((id) => id === columnId);
  const isLoading = isColumnLoading || isTasksLoading;

  return (
    <Column isLoading={isLoading}>
      <ColumnTextarea value={columnTitle} columnId={columnId} boardId={boardId} order={order} />
      <TasksPreview columnId={columnId} boardId={boardId} />
      {isLoading && <LinearProgress sx={{ width: 1 }} />}
    </Column>
  );
};

export default ColumnPreview;
