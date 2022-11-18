import { Badge, Box, TextareaAutosize } from '@mui/material';
import { DefaultColors, GRAY_700 } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { FC, useState, ChangeEvent } from 'react';
import { deleteColumn, setColumnLoading, updateColumn } from 'store/columnsSlice';
import CustomIconBtn from './CustomIconBtn';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmModal from 'components/ConfirmModal';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { tasksSelector } from 'store/tasksSlice';

type TextareaProps = {
  children?: React.ReactNode;
  boardId: string;
  columnId: string;
  order: number;
  value: string;
};

const ColumnTextarea: FC<TextareaProps> = ({ value, boardId, columnId, order }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasFocus, setFocus] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  const { tasks } = useAppSelector(tasksSelector);
  const numberOfTasks: number = tasks[columnId]?.length || 0;
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = (cancel: boolean) => {
    setFocus(false);

    if (currentValue.trim() === previousValue) {
      setCurrentValue(currentValue.trim());
      return;
    }
    if (currentValue.trim() === '' || cancel) {
      setCurrentValue(previousValue);
      return;
    }

    dispatch(setColumnLoading(columnId));
    dispatch(
      updateColumn({
        boardId,
        columnId,
        data: { title: currentValue, order },
      })
    );

    setPreviousValue(currentValue);
  };

  const submit = () => {
    dispatch(setColumnLoading(columnId));
    dispatch(deleteColumn({ boardId, columnId }));
    closeConfirmModal();
  };

  const openConfirmModal = () => {
    setIsOpen(true);
  };

  const closeConfirmModal = () => {
    setIsOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
      }}
    >
      <TextareaAutosize
        minRows={2}
        style={{
          width: 230,
          padding: '5px',
          marginBottom: '2rem',
          fontSize: '20px',
          border: '0',
          borderRadius: '5px',
          cursor: 'pointer',
          resize: 'none',
          overflow: 'hidden',
          color: hasFocus ? 'black' : GRAY_700,
          outline: hasFocus ? '1px #b1b1b1 solid' : 'none',
          backgroundColor: hasFocus ? 'white' : 'transparent',
        }}
        value={currentValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={(e) => e.preventDefault()}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {!hasFocus && (
          <CustomIconBtn size="small" color={DefaultColors.error} cb={openConfirmModal}>
            <Badge
              color={DefaultColors.secondary}
              badgeContent={numberOfTasks}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <DeleteIcon />
            </Badge>
          </CustomIconBtn>
        )}
        {hasFocus && (
          <>
            <CustomIconBtn size="small" color={DefaultColors.success} cb={() => handleBlur(false)}>
              <CheckCircleIcon />
            </CustomIconBtn>
            <CustomIconBtn size="small" color={DefaultColors.error} cb={() => handleBlur(true)}>
              <CancelIcon />
            </CustomIconBtn>
          </>
        )}
      </Box>

      <ConfirmModal
        title={t('delColumn')}
        isOpen={isOpen}
        onSubmit={submit}
        onClose={closeConfirmModal}
      />
    </Box>
  );
};

export default ColumnTextarea;
