import React, { useEffect, forwardRef } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';
import Page from 'components/Page';
import BoardPreview from 'components/BoardPreview';
import EditBoardForm from 'components/forms/EditBoardForm';
import { boardListSelector, getBoardsByUser } from 'store/boardListSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { MediaQuery } from 'constants/constants';
import { getAllUsers } from 'store/usersSlice';
import FlipMove from 'react-flip-move';
import { BoardData } from 'types/boards';

const StyledBox = styled(FlipMove)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 10,
});

const FunctionalArticle = forwardRef<HTMLDivElement, BoardData>((props, ref) => (
  <div ref={ref}>
    <BoardPreview boardData={props} />
  </div>
));

export default function Boards() {
  const isLargeScreen = useMediaQuery(MediaQuery.minWidth380);
  const { boards } = useAppSelector(boardListSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardsByUser());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Page>
      <Box sx={{ mx: isLargeScreen ? 4 : 1 }}>
        <StyledBox>
          {boards.map((board) => (
            <FunctionalArticle key={board._id} {...board} />
          ))}
        </StyledBox>
      </Box>
      <EditBoardForm />
    </Page>
  );
}
