import React, { useEffect } from 'react';
import { Button, Box, Typography, useMediaQuery, CircularProgress } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import Page from 'components/Page';
import BoardPreview from 'components/BoardPreview';
import Loader from 'components/Loader';
import EditBoardForm from 'components/forms/EditBoardForm';
import { boardListSelector, getBoardsByUser, getAllUsers } from 'store/boardListSlice';
import { clearBoardParams, openModalForm } from 'store/modalSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { MediaQuery, TypeofModal } from 'constants/constants';

const StyledBox = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 4,
});

export default function Boards() {
  const isLargeScreen = useMediaQuery(MediaQuery.minWidth380);
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const { boards, isLoading, isAddBoardLoading, usersLoading } = useAppSelector(boardListSelector);
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
      <StyledBox sx={{ mx: isLargeScreen ? 4 : 1 }}>
        {isLoading || usersLoading ? (
          <Loader />
        ) : (
          <>
            {boards.map((board) => (
              <BoardPreview key={board._id} boardData={board} />
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
          </>
        )}
      </StyledBox>
      <EditBoardForm />
    </Page>
  );
}
