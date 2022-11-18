import React, { FC } from 'react';
import { Box } from '@mui/material';
import ColumnTextarea from './UI/ColumnTextarea';
import TasksPreview from './TasksPreview';

type Props = {
  children?: React.ReactNode;
  columnTitle: string;
  columnId: string;
  boardId: string;
  order: number;
};

const Column: FC<Pick<Props, 'children'>> = ({ children }) => {
  return (
    <Box
      sx={{
        height: 'fit-content',
        maxHeight: 0.9,
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
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      {children}
    </Box>
  );
};

const ColumnPreview: FC<Props> = ({ columnTitle, columnId, boardId, order }) => {
  return (
    <Column>
      <ColumnTextarea value={columnTitle} columnId={columnId} boardId={boardId} order={order} />
      <TasksPreview columnId={columnId} boardId={boardId} />
    </Column>
  );
};

export default ColumnPreview;
