import React, { FC, useEffect, useState } from 'react';
import { ConnectableElement, useDrag, useDrop } from 'react-dnd';
import { Box, LinearProgress } from '@mui/material';
import { DndType } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { changeColumnOrder, changeLocalColumnOrder } from 'store/columnsSlice';
import { tasksSelector } from 'store/tasksSlice';
import { DropColumnItem } from 'types/columns';

import ColumnTextarea from './UI/ColumnTitle';
import TasksPreview from './TasksPreview';

type ColumnPreviewProps = {
  columnTitle: string;
  columnId: string;
  order: number;
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

const ColumnPreview: FC<ColumnPreviewProps> = ({ columnTitle, columnId, order }) => {
  const { tasksLoadingArr } = useAppSelector(tasksSelector);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: DndType.column,
    item: {
      order,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: DndType.column,
    drop(item: DropColumnItem) {
      if (item.order !== order) {
        dispatch(changeLocalColumnOrder({ dragOrder: item.order, dropOrder: order }));
        dispatch(changeColumnOrder());
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  useEffect(() => {
    setIsLoading(tasksLoadingArr.some((id) => id === columnId));
  }, [tasksLoadingArr, columnId]);

  return (
    <Box
      sx={{
        ...style,
        opacity: isLoading ? 0.5 : isDragging ? 0 : 1,
        pointerEvents: isLoading ? 'none' : 'auto',
        backgroundColor: isOver ? 'green' : 'rgba(255, 255, 255, 0.7)',
      }}
      ref={(node: ConnectableElement) => drag(drop(node))}
    >
      <ColumnTextarea value={columnTitle} columnId={columnId} />
      <TasksPreview columnId={columnId} />
      {isLoading && <LinearProgress sx={{ width: 1 }} />}
    </Box>
  );
};

export default ColumnPreview;
