import React, { useEffect, useState } from 'react';
import Page from 'components/Page';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  useAppDispatch,
  useAppSelector,
  useColumnsInitialData,
  useImperativeDisableScroll,
} from 'hooks/hooks';
import { MediaQuery, TypeofModal } from 'constants/constants';
import { clearLocalColumns, columnsSelector } from 'store/columnsSlice';
import { useParams } from 'react-router-dom';
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
import { clearAllLocalTasks } from 'store/tasksSlice';
import { useSocket } from 'hooks/useSocket';
import { BoardsContentSocketPayload, UsersSocketPayload } from 'types/socket';
import useSocketReducers from 'hooks/useSocketReducers';
import { usersSelector } from 'store/usersSlice';

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
  const { columns } = useAppSelector(columnsSelector);
  const { users } = useAppSelector(usersSelector);
  const { boardId } = useParams();
  const [isUsersLoaded, setIsUserLoaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    if (isUsersLoaded) {
      socket.connect();
      startListeners();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUsersLoaded]);

  useImperativeDisableScroll();
  useColumnsInitialData();

  useEffect(() => {
    return () => {
      dispatch(clearAllLocalTasks());
      dispatch(clearLocalColumns());
    };
  }, [dispatch]);

  useEffect(() => {
    if (users.length) {
      setIsUserLoaded(true);
    }
  }, [users]);

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
