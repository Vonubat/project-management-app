import React, { useCallback, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { TypeofModal } from 'constants/constants';
import { StatusCode } from 'constants/constants';
import { Path } from 'constants/routing';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import { useImperativeDisableScroll } from 'hooks/useImperativeDisableScroll';
import { useSocket } from 'hooks/useSocket';
import useSocketReducers from 'hooks/useSocketReducers';
import { boardListSelector, getBoardsByUser, setCurrentBoard } from 'store/boardListSlice';
import { clearLocalColumns, columnsSelector } from 'store/columnsSlice';
import { getColumnsInBoards } from 'store/columnsSlice';
import { changeColumnOrder, changeLocalColumnOrder } from 'store/columnsSlice';
import { openModalForm } from 'store/modalSlice';
import { changeLocalTaskOrder, changeTaskOrder } from 'store/tasksSlice';
import { clearAllLocalTasks } from 'store/tasksSlice';
import { getTasksByBoardId } from 'store/tasksSlice';
import { getAllUsers, usersSelector } from 'store/usersSlice';
import { ColumnData } from 'types/columns';
import { BoardsContentSocketPayload, UsersSocketPayload } from 'types/socket';

import ColumnPreview from 'components/ColumnPreview';
import AddColumnForm from 'components/forms/AddColumnForm';
import AddTaskForm from 'components/forms/AddTaskForm';
import EditTaskForm from 'components/forms/EditTaskForm';
import ColumnsAddBtn from 'components/UI/ColumnsAddBtn';
import ColumnsBackBtn from 'components/UI/ColumnsBackBtn';

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  overflowX: 'auto',
  overflowY: 'hidden',
  height: 'calc(100vh - 12rem)',
  gap: '1rem',
}));

const Columns = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });
  const { columns } = useAppSelector(columnsSelector);
  const { users } = useAppSelector(usersSelector);
  const { boards } = useAppSelector(boardListSelector);
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const socket = useSocket();
  const { boardsEventReducer, tasksEventReducer, usersEventReducer, columnsEventReducer } =
    useSocketReducers();

  const startListeners = () => {
    if (boardId) {
      socket.on('columns', ({ action, ...payload }: BoardsContentSocketPayload) => {
        columnsEventReducer({ action, payload, boardId });
      });

      socket.on('boards', ({ action, ...payload }: BoardsContentSocketPayload) => {
        boardsEventReducer({ action, payload, boardId });
      });

      socket.on('tasks', ({ action, ...payload }: BoardsContentSocketPayload) => {
        tasksEventReducer({ action, payload, boardId });
      });

      socket.on('users', ({ action, ...payload }: UsersSocketPayload) => {
        usersEventReducer({ action, payload, boardId });
      });
    }
  };

  const getColumns = useCallback(
    async (boardId: string) => {
      try {
        await dispatch(getColumnsInBoards(boardId)).unwrap();
      } catch (rejectedValue) {
        if (rejectedValue === StatusCode.badRequest || rejectedValue === StatusCode.notFound) {
          navigate(Path.boards);
        }
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useImperativeDisableScroll();

  useEffect(() => {
    if (boardId) {
      getColumns(boardId);
      dispatch(setCurrentBoard(boardId));
      dispatch(getTasksByBoardId(boardId));
      !users.length && dispatch(getAllUsers());
      !boards.length && dispatch(getBoardsByUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, boardId, getColumns]);

  useEffect(() => {
    if (!!users.length && !!boards.length) {
      socket.connect();
      startListeners();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!users.length, !!boards.length]);

  useEffect(() => {
    return () => {
      dispatch(clearAllLocalTasks());
      dispatch(clearLocalColumns());
    };
  }, [dispatch]);

  const onDragEnd = async (results: DropResult) => {
    if (!results.destination) return;
    if (
      results.destination.droppableId === results.source.droppableId &&
      results.destination.index === results.source.index
    )
      return;
    if (results.type === 'COLUMN') {
      dispatch(
        changeLocalColumnOrder({
          dragOrder: results.source.index,
          dropOrder: results.destination.index,
        })
      );
      dispatch(changeColumnOrder());
    } else if (results.type === 'TASK') {
      dispatch(
        changeLocalTaskOrder({
          dragOrder: results.source.index,
          dragColumnId: results.source.droppableId,
          dropOrder: results.destination.index,
          dropColumnId: results.destination.droppableId,
        })
      );
      dispatch(changeTaskOrder());
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flex: '1',
        backgroundImage: 'url(../background.webp)',
        backgroundSize: 'cover',
      }}
    >
      <ColumnsBackBtn />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
          {(provided) => (
            <StyledBox {...provided.droppableProps} ref={provided.innerRef}>
              {columns.map(({ _id, title, order }: ColumnData) => (
                <Draggable key={_id} draggableId={_id} index={order}>
                  {(provided) => (
                    <Box
                      sx={{ height: 'fit-content', maxHeight: 'calc(100% - 30px)', mx: 2 }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ColumnPreview columnId={_id} columnTitle={title} />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <ColumnsAddBtn
                cb={() => dispatch(openModalForm(TypeofModal.addColumn))}
                sx={{ color: 'white' }}
                variant={'contained'}
              >
                <Typography variant="h6">{t('addColumn')}</Typography>
              </ColumnsAddBtn>
            </StyledBox>
          )}
        </Droppable>
      </DragDropContext>
      <AddColumnForm />
      <AddTaskForm />
      <EditTaskForm />
    </Box>
  );
};

export default Columns;
