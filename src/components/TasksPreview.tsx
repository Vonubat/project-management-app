import React, { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Box, styled, Typography } from '@mui/material';
import { TypeofModal } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { setCurrentColumnId } from 'store/columnsSlice';
import { openModalForm } from 'store/modalSlice';
import { tasksSelector } from 'store/tasksSlice';

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
});

const TasksPreview: FC<Props> = ({ columnId }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'tasks' });
  const { tasks } = useAppSelector(tasksSelector);
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(setCurrentColumnId(columnId));
    dispatch(openModalForm(TypeofModal.addTask));
  };

  return (
    <Droppable droppableId={columnId} key={columnId} type="TASK">
      {(provided) => (
        <StyledBox {...provided.droppableProps} ref={provided.innerRef}>
          {tasks[columnId]?.map((task) => (
            <Draggable key={task._id} draggableId={task._id} index={task.order}>
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <Task taskData={task} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <ColumnsAddBtn sx={{ mt: 3 }} cb={openModal}>
            <Typography variant="h6">{t('addTask')}</Typography>
          </ColumnsAddBtn>
        </StyledBox>
      )}
    </Droppable>
  );
};

export default TasksPreview;
