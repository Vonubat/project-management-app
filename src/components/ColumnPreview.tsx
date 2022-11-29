import React, { FC, useEffect, useState } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { useAppSelector } from 'hooks/typedHooks';
import { tasksSelector } from 'store/tasksSlice';

import ColumnTextarea from './UI/ColumnTitle';
import TasksPreview from './TasksPreview';

type ColumnPreviewProps = {
  columnTitle: string;
  columnId: string;
};

const style = {
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
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 5,
  },
  '&::-webkit-scrollbar-track': {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
};

const ColumnPreview: FC<ColumnPreviewProps> = ({ columnTitle, columnId }) => {
  const { tasksLoadingArr } = useAppSelector(tasksSelector);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(tasksLoadingArr.some((id) => id === columnId));
  }, [tasksLoadingArr, columnId]);

  return (
    <Box sx={{ ...style }}>
      <ColumnTextarea value={columnTitle} columnId={columnId} />
      <TasksPreview columnId={columnId} />
      {isLoading && <LinearProgress sx={{ width: 1 }} />}
    </Box>
  );
};

export default ColumnPreview;
