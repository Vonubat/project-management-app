import React, { useEffect, forwardRef } from 'react';
import { Button, Box, Typography, useMediaQuery, CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import Page from 'components/Page';
import BoardPreview from 'components/BoardPreview';
import EditBoardForm from 'components/forms/EditBoardForm';
import { boardListSelector, getBoardsByUser } from 'store/boardListSlice';
import { clearBoardParams, openModalForm } from 'store/modalSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { MediaQuery, TypeofModal } from 'constants/constants';
import { getAllUsers } from 'store/usersSlice';

import FlipMove from 'react-flip-move';
import { BoardData } from 'types/boards';

const StyledBox = styled(FlipMove)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 4,
});

const FunctionalArticle = forwardRef<HTMLDivElement, BoardData>((props, ref) => (
  <div ref={ref}>
    <BoardPreview boardData={props} />
  </div>
));

export default function Boards() {
  const isLargeScreen = useMediaQuery(MediaQuery.minWidth380);
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const { boards, isAddBoardLoading } = useAppSelector(boardListSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardsByUser());
    dispatch(getAllUsers());
  }, [dispatch]);

  function openAddBoardModalForm() {
    dispatch(clearBoardParams());
    dispatch(openModalForm(TypeofModal.board));
  }

  return (
    <Page>
      <Box sx={{ mx: isLargeScreen ? 4 : 1 }}>
        <StyledBox>
          {boards.map((board) => (
            <FunctionalArticle key={board._id} {...board} />
          ))}
          <Button
            sx={{ width: 310, height: 310 }}
            variant="outlined"
            onClick={openAddBoardModalForm}
            disabled={isAddBoardLoading}
          >
            {isAddBoardLoading ? (
              <CircularProgress color="inherit" size={100} />
            ) : (
              <Typography variant="h4">{t('add')}</Typography>
            )}
          </Button>
        </StyledBox>
      </Box>
      <EditBoardForm />
    </Page>
  );
}
