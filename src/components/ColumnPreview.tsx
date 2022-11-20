import React, { FC } from 'react';
import { Box, LinearProgress } from '@mui/material';
import ColumnTextarea from './UI/ColumnTextarea';
import TasksPreview from './TasksPreview';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { changeColumnOrder, changeLocalColumnOrder, columnsSelector } from 'store/columnsSlice';
import { tasksSelector } from 'store/tasksSlice';
import { ConnectableElement, useDrag, useDrop } from 'react-dnd';
import { DropColumnItem } from 'types/columns';
import { DndType } from 'constants/constants';

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
  //TODO remove if no need
  // opacity: isLoading ? 0.5 : 1,
  // pointerEvents: isLoading ? 'none' : 'auto',
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 5,
  },
  '&::-webkit-scrollbar-track': {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
};

const ColumnPreview: FC<ColumnPreviewProps> = ({ columnTitle, columnId, order }) => {
  const { columnLoadingArr } = useAppSelector(columnsSelector);
  const { tasksLoadingArr } = useAppSelector(tasksSelector);
  const isColumnLoading: boolean = columnLoadingArr.some((id) => id === columnId);
  const isTasksLoading: boolean = tasksLoadingArr.some((id) => id === columnId);
  const isLoading = isColumnLoading || isTasksLoading;
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

  return (
    <Box
      sx={{
        ...style,
        opacity: isLoading ? 0.5 : isDragging ? 0 : 1,
        pointerEvents: isLoading ? 'none' : 'auto',
        backgroundColor: isOver ? 'green' : 'white',
      }}
      ref={(node: ConnectableElement) => drag(drop(node))}
    >
      <ColumnTextarea value={columnTitle} columnId={columnId} order={order} />
      <TasksPreview columnId={columnId} />
      {isLoading && <LinearProgress sx={{ width: 1 }} />}
    </Box>
  );
};

export default ColumnPreview;
