import React, { FC, useEffect } from 'react';
import Page from 'components/Page';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector, useImperativeDisableScroll } from 'hooks/hooks';
import Loader from 'components/Loader';
import { MediaQuery, Status } from 'constants/constants';
import { columnsSelector, getColumnsInBoards } from 'store/columnsSlice';
import { useParams } from 'react-router-dom';
import { ColumnData } from 'types/columns';
import ColumnPreview from 'components/ColumnPreview';
import ColumnsAddBtn from 'components/UI/ColumnsAddBtn';
import AddColumnForm from 'components/forms/AddColumnForm';
import { openModalForm } from 'store/modalSlice';

type Props = {
  children?: React.ReactNode;
};

const StyledBox: FC<Props> = ({ children }) => {
  const isBreakPoint: boolean = useMediaQuery(MediaQuery.minWidth750);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'baseline',
        overflowX: 'auto',
        overflowY: 'hidden',
        height: isBreakPoint ? 'calc(100vh - 170px)' : 'calc(100vh - 330px)',
        gap: '1rem',
      }}
    >
      {children}
    </Box>
  );
};

const Columns = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });
  const { boardId } = useParams();
  const { columns, status } = useAppSelector(columnsSelector);
  const dispatch = useAppDispatch();
  const isLoading: boolean = status === Status.pending;
  const BODY: HTMLElement = document.body;

  useEffect(() => {
    dispatch(getColumnsInBoards(boardId as string));
  }, [dispatch, boardId]);

  useImperativeDisableScroll(BODY);

  return (
    <Page sx={{ marginTop: '2rem' }}>
      <StyledBox>
        {columns.map(({ _id, title, boardId, order }: ColumnData) => (
          <ColumnPreview
            key={_id}
            columnId={_id}
            boardId={boardId}
            columnTitle={title}
            order={order}
          />
        ))}
        <ColumnsAddBtn cb={() => dispatch(openModalForm())}>
          <Typography variant="h6">{t('addColumn')}</Typography>
        </ColumnsAddBtn>
        <AddColumnForm />
      </StyledBox>
      {isLoading && <Loader />}
    </Page>
  );
};

export default Columns;
