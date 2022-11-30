import React, { FC, useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { useAppSelector } from 'hooks/typedHooks';
import { tasksSelector } from 'store/tasksSlice';

import ColumnHeader from './UI/ColumnHeader';
import TasksPreview from './TasksPreview';

type ColumnPreviewProps = {
  columnTitle: string;
  columnId: string;
};

const ColumnPreview: FC<ColumnPreviewProps> = ({ columnTitle, columnId }) => {
  const { tasksLoadingArr } = useAppSelector(tasksSelector);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(tasksLoadingArr.some((id) => id === columnId));
  }, [tasksLoadingArr, columnId]);

  return (
    <>
      <ColumnHeader title={columnTitle} columnId={columnId} />
      <TasksPreview columnId={columnId} />
      {isLoading && <LinearProgress sx={{ width: 1 }} />}
    </>
  );
};

export default ColumnPreview;
