import React, { forwardRef, useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Box, Collapse, Paper, Typography, useMediaQuery, Zoom } from '@mui/material';
import { MediaQuery } from 'constants/constants';
import { useAppSelector } from 'hooks/typedHooks';
import { useBoardListInitialData } from 'hooks/useBoardListInitialData';
import { useSocket } from 'hooks/useSocket';
import useSocketReducers from 'hooks/useSocketReducers';
import { boardListSelector } from 'store/boardListSlice';
import { usersSelector } from 'store/usersSlice';
import { BoardData } from 'types/boards';
import { BoardsContentSocketPayload, UsersSocketPayload } from 'types/socket';
import { CustomFlipMove } from 'types/utilTypes';

import BoardPreview from 'components/BoardPreview';
import EditBoardForm from 'components/forms/EditBoardForm';
import Page from 'components/Page';
import SearchBar from 'components/SearchBar';

const StyledBox: CustomFlipMove = styled(FlipMove)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 16,
});

const FunctionalArticle = forwardRef<HTMLDivElement, BoardData>((props, ref) => (
  <div ref={ref}>
    <BoardPreview boardData={props} />
  </div>
));

export default function Boards() {
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const isLargeScreen = useMediaQuery(MediaQuery.minWidth380);
  const isLaptop = useMediaQuery(MediaQuery.laptop);
  const { boards } = useAppSelector(boardListSelector);
  const { users } = useAppSelector(usersSelector);
  const [searchValue, setSearchValue] = useState('');
  const socket = useSocket();
  const { boardsEventReducer, usersEventReducer } = useSocketReducers();
  const [isUsersLoaded, setIsUserLoaded] = useState<boolean>(false);

  const startListeners = () => {
    socket.on('boards', ({ action, ...payload }: BoardsContentSocketPayload) => {
      boardsEventReducer({ action, payload });
    });

    socket.on('users', ({ action, ...payload }: UsersSocketPayload) => {
      usersEventReducer({ action, payload });
    });
  };

  useEffect(() => {
    if (isUsersLoaded) {
      socket.connect();
      startListeners();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUsersLoaded]);

  useBoardListInitialData();

  useEffect(() => {
    if (users.length) {
      setIsUserLoaded(true);
    }
  }, [users]);

  const filteredBoards = boards.filter(({ title }) =>
    title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Page>
      <Box sx={{ mx: isLargeScreen ? 4 : 1 }}>
        <Zoom in={boards.length > 1}>
          <Paper sx={{ maxWidth: isLaptop ? 600 : 280, mx: 'auto', mb: 2, mt: -8 }}>
            <SearchBar
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </Paper>
        </Zoom>
        <Collapse in={filteredBoards.length === 0 && boards.length > 1}>
          <Typography align="center">{t('notFound')}</Typography>
        </Collapse>
        <StyledBox>
          {filteredBoards.map((board) => (
            <FunctionalArticle key={board._id} {...board} />
          ))}
        </StyledBox>
      </Box>
      <EditBoardForm />
    </Page>
  );
}
