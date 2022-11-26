import React, { ChangeEvent, FC, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Badge, Box, TextareaAutosize } from '@mui/material';
import { DefaultColors, GRAY_700 } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks/typedHooks';
import {
  changeColumnOrder,
  closeColumnTitle,
  columnsSelector,
  deleteColumn,
  deleteLocalColumn,
  openColumnTitle,
  resetColumnTitles,
  setCurrentColumnId,
  updateColumn,
  updateLocalColumn,
} from 'store/columnsSlice';
import { clearLocalTaskByColumnId, tasksSelector } from 'store/tasksSlice';
import { ColumnData } from 'types/columns';

import ConfirmModal from 'components/ConfirmModal';

import CustomIconBtn from './CustomIconBtn';

type TextareaProps = {
  children?: React.ReactNode;
  columnId: ColumnData['_id'];
  value: string;
};

const ColumnTitle: FC<TextareaProps> = ({ value, columnId }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'columns' });
  const [isOpen, setIsOpen] = useState(false);
  const { [columnId]: hasFocus = false } = useAppSelector(columnsSelector).columnsTitleActive;
  const [currentValue, setCurrentValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);
  const { tasks } = useAppSelector(tasksSelector);
  const numberOfTasks: number = tasks[columnId]?.length || 0;
  const textArea: RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value);
  };

  const handleFocus = () => {
    textArea.current?.focus();
    dispatch(openColumnTitle(columnId));
    dispatch(resetColumnTitles(columnId));
  };

  const handleSubmitTitle = useCallback(
    (cancel: boolean) => {
      textArea.current?.blur();
      dispatch(closeColumnTitle(columnId));

      if (currentValue.trim() === previousValue) {
        setCurrentValue(currentValue.trim());
        return;
      }
      if (currentValue.trim() === '' || cancel) {
        setCurrentValue(previousValue);
        return;
      }

      dispatch(setCurrentColumnId(columnId));
      dispatch(updateLocalColumn(currentValue));
      dispatch(updateColumn(currentValue));

      setPreviousValue(currentValue);
    },
    [columnId, currentValue, dispatch, previousValue]
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        handleSubmitTitle(true);
      }
      if (e.key === 'Enter') {
        handleSubmitTitle(false);
      }
    },
    [handleSubmitTitle]
  );

  const submit = () => {
    //TODO find out can we use currentColumnId
    dispatch(deleteLocalColumn(columnId));
    dispatch(deleteColumn(columnId));
    dispatch(changeColumnOrder());
    dispatch(clearLocalTaskByColumnId(columnId));
    closeConfirmModal();
  };

  const openConfirmModal = () => {
    setIsOpen(true);
  };

  const closeConfirmModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (hasFocus === false) {
      handleSubmitTitle(true);
    }
  }, [hasFocus, handleSubmitTitle]);

  useEffect(() => {
    window.addEventListener('keydown', (e) => handleKeydown(e), { once: true });
  }, [hasFocus, handleKeydown]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: 280,
      }}
    >
      <TextareaAutosize
        minRows={1}
        maxLength={100}
        style={{
          width: 220,
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
        ref={textArea}
        className="column-title"
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
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <CustomIconBtn
              size="small"
              color={DefaultColors.success}
              cb={() => handleSubmitTitle(false)}
            >
              <CheckCircleIcon />
            </CustomIconBtn>
            <CustomIconBtn
              size="small"
              color={DefaultColors.error}
              cb={() => handleSubmitTitle(true)}
            >
              <CancelIcon />
            </CustomIconBtn>
          </Box>
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

export default ColumnTitle;
