import React, { useEffect, useState } from 'react';
import Page from 'components/Page';
import { Button, Box, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import BoardPreview from 'components/BoardPreview';
import AddBoardModal from 'components/AddBoardModal';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { boardListSelector, getBoardsByUser } from 'store/boardListSlice';
import { authSelector } from 'store/authSlice';
import Loader from 'components/Loader';

const StyledBox = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 4,
});

export default function Boards() {
  const isLargeScreen = useMediaQuery('(min-width:380px)');
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const { userId } = useAppSelector(authSelector);
  const { boards, isLoading, error } = useAppSelector(boardListSelector);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    dispatch(getBoardsByUser(userId as string));
  }, [dispatch, userId]);

  return (
    <Page>
      <StyledBox sx={{ mx: isLargeScreen ? 4 : 1 }}>
        {error ? (
          <h1>{error}</h1>
        ) : (
          <>
            {boards.map((board) => (
              <BoardPreview key={board._id} boardData={board} />
            ))}
            <Button sx={{ width: 310, height: 310 }} variant="outlined" onClick={openModal}>
              <Typography variant="h4">{t('add')}</Typography>
            </Button>
            <AddBoardModal isOpen={isOpen} onSubmit={closeModal} onClose={closeModal} />
          </>
        )}
      </StyledBox>
      {isLoading && <Loader />}
    </Page>
  );
}
