import React, { useEffect } from 'react';
import Page from 'components/Page';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector, useImperativeDisableScroll } from 'hooks/hooks';
import { MediaQuery, SocketAction, TypeofModal } from 'constants/constants';
import {
  clearLocalColumns,
  columnsSelector,
  deleteLocalColumn,
  getColumnsInBoards,
} from 'store/columnsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnData } from 'types/columns';
import ColumnPreview from 'components/ColumnPreview';
import ColumnsAddBtn from 'components/UI/ColumnsAddBtn';
import AddColumnForm from 'components/forms/AddColumnForm';
import { openModalForm } from 'store/modalSlice';
import AddTaskForm from 'components/forms/AddTaskForm';
import EditTaskForm from 'components/forms/EditTaskForm';
import ColumnsBackBtn from 'components/UI/ColumnsBackBtn';
import styled from '@emotion/styled';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { setCurrentBoard } from 'store/boardListSlice';
import { getAllUsers } from 'store/usersSlice';
import { clearAllLocalTasks, deleteLocalTaskById, getTasksByBoardId } from 'store/tasksSlice';
import { useSocket } from 'hooks/useSocket';
import { authSelector } from 'store/authSlice';
import { Path } from 'constants/routing';
import { BoardsContentSocketPayload, UsersSocketPayload } from 'types/socket';

const StyledBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'isBreakPoint' })<{
  isBreakPoint: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}>(({ theme, isBreakPoint }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'baseline',
  overflowX: 'auto',
  overflowY: 'hidden',
  height: isBreakPoint ? 'calc(100vh - 210px)' : 'calc(100vh - 370px)',
  gap: '1rem',
}));

const Columns = () => {
  const isBreakPoint = useMediaQuery(MediaQuery.minWidth750);
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });
  const { boardId } = useParams();
  const { columns } = useAppSelector(columnsSelector);
  const { userId } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const socket = useSocket();

  const startListeners = () => {
    if (boardId) {
      socket.on('columns', ({ users, initUser, ids, action }: BoardsContentSocketPayload) => {
        if (initUser === userId || !users.includes(userId)) return;

        if (action === SocketAction.delete) {
          dispatch(deleteLocalColumn(ids[0]));
          return;
        }

        dispatch(getColumnsInBoards(boardId));
      });

      socket.on('boards', ({ action, ids }: BoardsContentSocketPayload) => {
        console.log(action);
        if (action === SocketAction.delete && ids[0] === boardId) {
          navigate(Path.boards);
        }
      });

      socket.on('tasks', ({ users, initUser, ids, action }: BoardsContentSocketPayload) => {
        if (initUser === userId || !users.includes(userId)) return;

        if (action === SocketAction.delete) {
          dispatch(deleteLocalTaskById(ids[0]));
          return;
        }

        dispatch(getColumnsInBoards(boardId));
        dispatch(getTasksByBoardId(boardId));
      });

      socket.on('users', ({ ids, action }: UsersSocketPayload) => {
        if (ids[0] !== userId) {
          dispatch(getAllUsers());
        }

        if (action === SocketAction.delete) {
          dispatch(getTasksByBoardId(boardId));
        }
      });
    }
  };

  useEffect(() => {
    socket.connect();
    startListeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (boardId) {
      dispatch(setCurrentBoard(boardId));
      dispatch(getColumnsInBoards(boardId));
      dispatch(getTasksByBoardId(boardId));
      dispatch(getAllUsers());
    }
  }, [dispatch, boardId]);

  useEffect(() => {
    return () => {
      dispatch(clearAllLocalTasks());
      dispatch(clearLocalColumns());
    };
  }, [dispatch]);

  useImperativeDisableScroll();

  return (
    <Page sx={{ my: '0rem' }}>
      <ColumnsBackBtn />
      <StyledBox isBreakPoint={isBreakPoint}>
        <DndProvider backend={HTML5Backend}>
          {columns.map(({ _id, title, order }: ColumnData) => (
            <ColumnPreview key={_id} columnId={_id} columnTitle={title} order={order} />
          ))}
          <ColumnsAddBtn cb={() => dispatch(openModalForm(TypeofModal.addColumn))}>
            <Typography variant="h6">{t('addColumn')}</Typography>
          </ColumnsAddBtn>
        </DndProvider>
      </StyledBox>
      <AddColumnForm />
      <AddTaskForm />
      <EditTaskForm />
    </Page>
  );
};

export default Columns;
