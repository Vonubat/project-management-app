import Page from 'components/Page';
import React, { useEffect } from 'react';
import { Button, Box, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BoardPreview from 'components/BoardPreview';
import AddBoardModal from 'components/AddBoardModal';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { boardListSelector, getBoardsByUser } from 'store/boardListSlice';
import { authSelector } from 'store/authSlice';
import Loader from 'components/Loader';

export default function Boards() {
  const isLargeScreen = useMediaQuery('(min-width:380px)');
  const { t } = useTranslation('translation', { keyPrefix: 'boardList' });
  const { userId } = useAppSelector(authSelector);
  const { boards, isLoading, error } = useAppSelector(boardListSelector);
  const dispatch = useAppDispatch();

  const style = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
    mx: isLargeScreen ? 4 : 1,
  };

  const [isOpenDelModal, setOpenDelModal] = React.useState(false);

  function agreeDelModal() {
    setOpenDelModal(false);
  }

  function closeDelModal() {
    setOpenDelModal(false);
  }

  useEffect(() => {
    dispatch(getBoardsByUser(userId as string));
  }, [dispatch, userId]);

  return (
    <Page>
      <Box sx={style}>
        {error ? (
          <h1>{error}</h1>
        ) : (
          <>
            {boards.map((board) => (
              <BoardPreview key={board._id} id={board._id} title={board.title} />
            ))}
            <Button
              sx={{ width: 310, height: 310 }}
              variant="outlined"
              onClick={() => setOpenDelModal(true)}
            >
              <Typography variant="h4">{t('add')}</Typography>
            </Button>
            <AddBoardModal isOpen={isOpenDelModal} agree={agreeDelModal} close={closeDelModal} />
          </>
        )}
      </Box>
      {isLoading && <Loader />}
    </Page>
  );
}
