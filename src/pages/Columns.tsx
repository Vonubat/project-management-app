import React, { useEffect, useState } from 'react';
import Page from 'components/Page';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import AddColumnModal from 'components/AddColumnModal';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import Loader from 'components/Loader';
import { Status } from 'constants/constants';
import { columnsSelector, getColumnsInBoards } from 'store/columnsSlice';
import { useParams } from 'react-router-dom';
import { ColumnData } from 'types/columns';
import ColumnPreview from 'components/ColumnPreview';
import ColumnsAddBtn from 'components/UI/ColumnsAddBtn';
import AddColumnForm from 'components/forms/AddColumnForm';

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'start',
  overflowX: 'auto',
  padding: '1rem 0',
  gap: '1rem',
});

const Columns = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });
  const { boardId } = useParams();
  const { columns, status } = useAppSelector(columnsSelector);
  const dispatch = useAppDispatch();
  const isLoading: boolean = status === Status.pending;

  useEffect(() => {
    dispatch(getColumnsInBoards(boardId as string));
  }, [dispatch, boardId]);

  return (
    <Page>
      <StyledBox>
        {columns.map(({ _id, title, boardId }: ColumnData) => (
          <ColumnPreview key={_id} columnId={_id} boardId={boardId} columnTitle={title} />
        ))}
        <ColumnsAddBtn>
          <Typography variant="h6">{t('addColumn')}</Typography>
        </ColumnsAddBtn>
        <AddColumnForm />
      </StyledBox>
      {isLoading && <Loader />}
    </Page>
  );
};

export default Columns;
