import React, { forwardRef, useState } from 'react';
import { Box, Collapse, Paper, Typography, useMediaQuery, Zoom } from '@mui/material';
import styled from '@emotion/styled';
import Page from 'components/Page';
import BoardPreview from 'components/BoardPreview';
import EditBoardForm from 'components/forms/EditBoardForm';
import { boardListSelector } from 'store/boardListSlice';
import { useAppSelector, useBoardListInitialData } from 'hooks/hooks';
import { MediaQuery } from 'constants/constants';
import FlipMove from 'react-flip-move';
import { BoardData } from 'types/boards';
import SearchBar from 'components/SearchBar';
import { CustomFlipMove } from 'types/utilTypes';
import { useTranslation } from 'react-i18next';

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
  const [searchValue, setSearchValue] = useState('');

  useBoardListInitialData();

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
